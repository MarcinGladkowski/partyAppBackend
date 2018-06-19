import User from '../models/user';

export default {
        async create(req, res) {
            const user = await new User({
                email: 'test',
                username: 'test',
                password: '123456',
                passwordConf: 'do zaszyfrowania'
            }).save();

            console.log(user);

        return res.status(201).send({data: user, 'status': 'ok'});
    }
}