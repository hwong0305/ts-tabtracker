import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export default async (password: string) => bcrypt.hash(password, SALT_ROUNDS);
