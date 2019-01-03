import { Request, Response } from 'express';
import { User } from '../entity/User';
import createToken from './utilities/createToken';
import hashPassword from './utilities/hashPassword';
import comparePassword from './utilities/comparePassword';
import { getConnection } from 'typeorm';
import { validate } from 'class-validator';

// something wong
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
            res.json({
                user: JSON.parse(JSON.stringify(user)),
                token: createToken(JSON.parse(JSON.stringify(user))),
            });
        } catch (err) {
            res.status(500).send({
                error: err,
            });
        }
    },
    async registerUser(
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string
    ) {
        try {
            const user = new User();
            user.username = username;
            user.password = await hashPassword(password);
            user.email = email;
            user.firstName = firstName;
            user.lastName = lastName;

            const error = await validate(user);
            if (error.length > 0) {
                await getConnection()
                    .getRepository(User)
                    .save(user);
            } else {
                return {
                    responseError: true,
                };
            }
            const userResponse = {
                user,
                token: createToken(JSON.parse(JSON.stringify(user))),
                responseError: false,
            };

            return userResponse;
        } catch (err) {
            console.log(err);
            return {
                responseError: true,
            };
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
                if (isPasswordValid)
                    res.json({
                        user: JSON.parse(JSON.stringify(user)),
                        token: createToken(JSON.parse(JSON.stringify(user))),
                    });
                else {
                    res.status(400).send({ message: 'Incorrect Password' });
                }
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err,
            });
        }
    },
    async loginUser(username: string, password: string) {
        try {
            const userRepository = await getConnection().getRepository(User);
            const user = await userRepository.findOne({ where: { username } });
            if (user) {
                const isPasswordValid: boolean = await comparePassword(password, user.password);
                if (isPasswordValid) {
                    return {
                        user,
                        token: createToken(JSON.parse(JSON.stringify(user))),
                        responseError: false,
                    };
                } else {
                    return {
                        responseError: true,
                    };
                }
            } else {
                return {
                    responseError: true,
                };
            }
        } catch (err) {
            console.log(err);
            return {
                responseError: true,
            };
        }
    },
    async fetchUsers() {
        try {
            const userRepository = await getConnection().getRepository(User);
            const users = await userRepository.find();
            return users;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    async fetchUser(username: string) {
        try {
            const userRepository = await getConnection().getRepository(User);
            const user = await userRepository.findOne({ username });
            return user;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};
