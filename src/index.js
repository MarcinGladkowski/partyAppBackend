import express from 'express';
import { join } from 'path';
import config from './config/config';
import { notFound, catchErrors } from './middlewares/errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import register from 'babel-core/register';
import babelPolyfill from 'babel-polyfill';
// dev logs
import morgan from 'morgan';

// model
import User from './models/user';

// Connect to database
import mongoose from 'mongoose';

// routes
import users from './routes/users';
import auth from './routes/auth';
import party from './routes/party';
import partyType from './routes/partyType';

// auth
import verifyToken from './auth/authentication';

mongoose.connect(config.database.mongoUrl);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
// routes config
app.use('/api/users',  users());
app.use('/api/auth', auth());
app.use('/api/party', party());
app.use('/api/party-type', partyType());


// errors handling
app.use(notFound);
app.use(catchErrors);

// let's play!
app.listen(config.server.port, () => {
    console.log(`Server is up! at ${config.server.port}`);
});