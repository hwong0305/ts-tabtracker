import { userLogin, User } from '../interfaces';
import axios from '../api/api';

export default {
    async register(user: User) {
        try {
            const response = await axios.post('/register', user);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    async login(user: userLogin) {
        try {
            const response = await axios.post('/login', user);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    },
};
