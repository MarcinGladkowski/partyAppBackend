import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config/config';

export default {
    async login(req, res) {

        User.findOne({ email: req.body.email }, function (err, user) {

            if (err) {
                return res.status(500).send('Error on the server.');
            }
            if (!user) {
                return res.status(404).send('No user found.');
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            } 

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 1800 // 30 min
            });
            
            return res.status(200).send({ auth: true, token: token });
        });
    },

    /** method calls to check is user has not expired token */
    async check(req, res) {

        var token = jwt.sign({ id: req.userId  }, config.secret, {
            expiresIn: 1800 // 30 min
        });

        return res.status(200).send({ auth: true, token: token });
    },

    //
    async activate(req, res) {
        return res.status(200).send({ auth: false, param: req.params.hash });
    },

    /** For login and register unathorized forms */
    async isUserExists(req, res) {

        const queryEmail = req.query.email;

        const user = await User.findOne({ email: queryEmail }, function (err, user) {
            if (err) { return res.status(500).send('Error on the server.') }
            if (!user) { return res.status(404).send({'message': 'No user found.'}) }
            if (user) { return res.status(200).send({'status': true}) }
        });
    }
};