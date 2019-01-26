import User from '../models/user';
import Mailer from '../utils/mailer/mailer';
import RegisterTemplate from "../utils/mailer/registerTemplate";

export default {
    async create(req, res) {
        
        const {email, username, password} = req.body;
        const user = await new User({email, username, password}).save();

        const registerEmail = new RegisterTemplate(user).makeTemplate();
        new Mailer(user.email).layout(registerEmail).sendEmail();

        return res.status(201).send(user);
    },

    /** Active user from email hash */
    async activate(req, res) {
        User.findOneAndUpdate({hash: req.body.hash}, {$set: {active: true}}, {new: true}, (err, user) => {
            if (err) {
                return res.status(200).send({'status': 'error'});
            }
            if (!user) {
                return res.status(200).send({'status': 'user not found'});
            }
            return res.status(201).send(user);
        });
    },
    /**
     * get Data of logged user. userId exist if user is authorized
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async findOne(req, res) {
        const user = await User.findById(req.userId, function (err, user) {
            if(user) return res.status(200).send(user);
        });
    },

    async findAll(req, res) {
        const users = await User.find({});
        return res.status(200).send(users);
    },

    async update(req, res) {
        const {email, username} = req.body;
        await User.findByIdAndUpdate(req.userId, {
            $set: {
                username: username,
                email: email
            }
        }, {new: true}, (err, user) => {
            return res.status(200).send(user);
        });
    },

    /** Update avatar for user */
    async updateAvatar(req, res) {
        if (req.file) {
            await User.findByIdAndUpdate(req.userId, {$set: {avatar: req.file.filename}}, {new: true}, (err, user) => {
                return res.status(200).send(user);
            });
        } else {
            return res.send({'status': 'error'})
        }
    }
}
