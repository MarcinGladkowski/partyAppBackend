import User from '../models/user';
import Mailer from '../utils/mailer/mailer';

export default {
        async create(req, res) {
        
            const user = await new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                active: false
            }).save();

            let email = new Mailer(req.body.email).sendEmail();

            return res.status(201).send({'data': user, 'status': 'ok'});
        },
        /** action actualy for testing code */
        async get(req, res) {
            return res.status(200).send({'data': 'testowo', 'status': 'ok'});
        }
}