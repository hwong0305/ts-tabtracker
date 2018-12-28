import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata'; // Necessary for TypeORM
import { createConnection } from 'typeorm';

import Router from './router';

const app = express();
app.use(bodyParser.json());

// Getting routes from separate file
app.use('/', Router);

createConnection()
    .then(() => {
        app.listen(8081, () => console.log('Now listening on Port 8081'));
    })
    .catch(err => console.log(err));
