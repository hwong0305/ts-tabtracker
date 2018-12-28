import * as bcrypt from 'bcrypt';

export default async (password: string, hash: string) => bcrypt.compare(password, hash);
