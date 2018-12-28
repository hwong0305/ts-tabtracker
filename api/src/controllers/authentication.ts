import { Request, Response } from 'express';
import { User } from '../entity/User';
import hashPassword from './utilities/hashPassword';
import comparePassword from './utilities/comparePassword';
import { getConnection } from 'typeorm';

export default {
    async register(req: Request, res: Response) {
        try {
            const user = new User();
            user.username = req.body.username;
            user.password = await hashPassword(req.body.password);
            user.email = req.body.email;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;

            await getConnection()
                .getRepository(User)
                .save(user);
            res.json(user);
        } catch (err) {
            res.status(500).send({
                error: err,
            });
        }
    },
    async login(req: Request, res: Response) {
        try {
            const userRepository = await getConnection().getRepository(User);
            const user = await userRepository.findOne({ username: req.body.username });
            if (!user) res.status(404).send({ message: 'User Not Found' });
            else {
                const isPasswordValid: boolean = await comparePassword(
                    req.body.password,
                    user.password
                );
                if (isPasswordValid) res.json(user);
                else {
                    res.status(400).send({ message: 'Incorrect Password' });
                }
            }
        } catch (err) {
            res.status(500).send({
                error: err,
            });
        }
    },
    async getUsers(_: Request, res: Response) {
        try {
            const userRepository = await getConnection().getRepository(User);
            const users = await userRepository.find();
            res.json(users);
        } catch (err) {
            res.status(500).send({
                err: 'Internal Error',
            });
        }
    },
};