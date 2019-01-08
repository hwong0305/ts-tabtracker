import * as jwt from 'jsonwebtoken';

export default async (token: string) => {
    try {
        const response = await jwt.verify(token, 'some-secret-phrase');
        if (!response) {
            throw new Error('Invalid Token');
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
