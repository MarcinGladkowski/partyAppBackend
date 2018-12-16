import User from '../models/user';
import Mailer from '../utils/mailer/mailer';
import { hashString } from '../utils/password';


export default {
        async create(req, res) {

            const { email, username, password } = req.body;
        
            const user = await new User({ email, username, password }).save(); 

            new Mailer(user).sendEmail();

            return res.status(201).send({'data': user, 'status': 'ok'});
        },
        
        /**
         * Active user from email hash
         */
        async activate(req, res) {
            
            User.findOneAndUpdate({hash: req.body.hash}, {$set:{active:true}}, {new: true}, function(err, user){

                if (err) { return res.status(200).send({'status': 'error'}); }

                if (user === null){ return res.status(200).send({'status': 'error'}); }
            
                return res.status(201).send({'status': 'ok'});
            });

        },

        /**  action actualy for testing code */
        async findOne(req, res) {

            const user = await User.findById(req.userId, function(err, user){});

            return res.status(200).send(user);
        },

        async update(req, res) {

            const { email, username } = req.body;

            const user = await User.findById(req.userId, function(err, user){});
            if (!user) return next();

            user.email = email;
            user.username = username;
            await user.save();

            return res.status(200).send(user);
        }

}
