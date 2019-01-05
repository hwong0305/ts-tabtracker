import { User } from '../entity/User';
import createToken from './utilities/createToken';
import hashPassword from './utilities/hashPassword';
import comparePassword from './utilities/comparePassword';
import { getConnection } from 'typeorm';
import { validate } from 'class-validator';

export default {
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
            const users = await userRepository.find({
                relations: ['bookmarks', 'bookmarks.songs'],
            });
            return users;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    async fetchUser(username: string) {
        try {
            const userRepository = await getConnection().getRepository(User);
            const user = await userRepository.findOne({
                where: { username },
                relations: ['bookmarks', 'bookmarks.songs'],
            });
            return user;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};
