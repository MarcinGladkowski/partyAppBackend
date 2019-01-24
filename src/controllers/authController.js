import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config/config';
import { hashString } from '../utils/password';

export default {
    async login(req, res) {

        User.findOne({ email: req.body.email },  (err, user) => {

            if (err) {
                return res.status(500).send('Error on the server.');
            }
            if (!user) {
                return res.status(404).send('No user found.');
            }

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null, message: 'Błędne hasło lub email' });
            }

            if (user.active === false) {
                return res.status(401).send({ auth: false, token: null, message: 'Konto jest nieaktywne' });
            }

            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 1800 // 30 min
            });
            
            return res.status(200).send({ auth: true, token: token });
        });
    },

    /** method calls to check is user has not expired token */
    async check(req, res) {

        const token = jwt.sign({ id: req.userId  }, config.secret, {
            expiresIn: 1800 // 30 min
        });
        return res.status(200).send({ auth: true, token: token });
    },

    async activate(req, res) {
        return res.status(200).send({ auth: false, param: req.params.hash });
    },

    /** For login and register unathorized forms */
    async isUserExists(req, res) {
        await User.findOne({ $or: [
                {email: req.query.email},
                {username: req.query.username}
            ]}, (err, user) => {
            if (err) { return res.status(500).send('Error on the server.') }
            if (!user) { return res.status(404).send({'message': 'No user found.'}) }
            if (user) { return res.status(200).send({'status': true}) }
        });
    },

    /** change password of user */
    async updatePassword(req, res) {
       const { oldPassword, newPassword, newPasswordRepeat } = req.body;
       const user = await User.findById(req.userId, function (err, user) {});
       const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);

       if ((newPassword === newPasswordRepeat) && passwordIsValid) {
           const password = await hashString(newPassword);

           User.findOneAndUpdate({_id: req.userId}, {$set: {password: password}}, {new: true}, (err, user) => {
               if (err) {
                   return res.status(200).send({'status': 'error'});
               }
               if (!user) {
                   return res.status(200).send({'status': 'error'});
               }
               return res.status(201).send(user);
           });
       } else {
           return res.status(201).send({'status': 'error'});
       }
    }
};
