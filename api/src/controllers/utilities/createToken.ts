import * as jwt from 'jsonwebtoken';
import { User } from '../../entity/User';

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export default (payload: User) => jwt.sign(payload, 'some-secret-phrase', { expiresIn: ONE_WEEK });
