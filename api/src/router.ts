import * as express from 'express';

const Router = express.Router();

Router.get('/', (_, res) => {
    res.send({ message: 'Welcome to the beginning of nothingless' });
});

export default Router;
