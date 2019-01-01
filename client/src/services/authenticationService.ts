import { userLogin, User } from '../interfaces';
import axios from '../api/api';

export default {
    async register(user: User) {
        try {
            const response = await axios.post('/register', user);
            return response.data;
        } catch (err) {
            console.log(err);
            return 'error';
        }
    },
    async login(user: userLogin) {
        try {
            const response = await axios.post('/login', user);
            return response.data;
        } catch (err) {
            console.log(err);
            return 'error';
        }
    },
};
