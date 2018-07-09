import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';


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

            var token = jwt.sign({ id: user._id }, 'marcinwrc123', {
                expiresIn: 1800 // 30 min
            });
            
            res.status(200).send({ auth: true, token: token });
        });
    },

    /** method calls to check is user has not expired token */
    async check(req, res) {
        console.log(`check is user has not expired token`);
        
        var token = jwt.sign({ id: req.userId  }, 'marcinwrc123', {
            expiresIn: 1800
        });

        res.status(200).send({ auth: true, token: token });
    }
};