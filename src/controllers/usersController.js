import User from '../models/user';

export default {
        async create(req, res) {
            const user = await new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.password
            }).save();

            console.log(user);

        return res.status(201).send({data: user, 'status': 'ok'});
    }
}