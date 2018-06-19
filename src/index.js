import express from 'express';
import { join } from 'path';
import config from './config/config';
import { notFound, catchErrors } from './middlewares/errors';
import bodyParser from 'body-parser';
import register from 'babel-core/register';
import babelPolyfill from 'babel-polyfill';

import User from './models/user';

// Connect to database
import dbConfig from './config/database';
import mongoose from 'mongoose';

// routes
import users from './routes/users';

mongoose.connect(dbConfig.mongoUrl);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes config
// app.use('/api/users', users());


app.post('/api/test/user', function(req, res){
    const user = new User({
        email: 'test',
        username: 'test'
    });

    try {
        
        user.save(function(err){
            if (err) return handleError(err);
        });

      }
      catch(error) {
        console.error(error);
        // expected output: SyntaxError: unterminated string literal
        // Note - error messages will vary depending on browser
      }
      
    console.log(user);

    return res.send('koniec funkcji');
});

// errors handling
// app.use(notFound);
// app.use(catchErrors);

// let's play!
app.listen(config.server.port, () => {
    console.log(`Server is up! at ${config.server.port}`);
});