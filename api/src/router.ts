import * as express from 'express';
import authentication from './controllers/authentication';
import authPolicy from './policies/authPolicy';

const Router = express.Router();

Router.get('/', (_, res) => {
    res.send({ message: 'Welcome to the beginning of nothingless' });
});

Router.get('/users', authentication.getUsers);
Router.post('/register', authPolicy.register, authentication.register);
Router.post('/login', authentication.login);

export default Router;
