import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default {
    register(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            username: Joi.string()
                .alphanum()
                .required(),
            password: Joi.string()
                .regex(/^[a-zA-Z0-9]{6,24}$/)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            firstName: Joi.string()
                .regex(/^[a-zA-Z]+$/)
                .required(),
            lastName: Joi.string()
                .regex(/^[a-zA-Z]+$/)
                .required(),
        });

        const { error } = Joi.validate(req.body, schema);

        if (error) {
            console.log(error);
            res.status(400).send({
                message: 'Invalid Registration Information',
            });
        } else {
            next();
        }
    },
};
