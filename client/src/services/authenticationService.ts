import { userLogin, User } from '../interfaces';
import axios from '../api/api';

export default {
    async register(user: User) {
        try {
            const response = await axios.post('/register', user);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            console.log(err);
        }
    },
    async login(user: userLogin) {
        try {
            const response = await axios.post('/login', user);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    },
};
