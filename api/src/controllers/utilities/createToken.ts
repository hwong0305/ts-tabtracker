import * as jwt from 'jsonwebtoken';

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export default (payload: Object) =>
    jwt.sign(payload, 'some-secret-phrase', { expiresIn: ONE_WEEK });
