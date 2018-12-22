import User from '../models/user';
import Mailer from '../utils/mailer/mailer';
import PartyType from "../models/partyType";

export default {
    async create(req, res) {
        const {email, username, password} = req.body;
        const user = await new User({email, username, password}).save();
        new Mailer(user).sendEmail();
        return res.status(201).send(user);
    },

    /** Active user from email hash */
    async activate(req, res) {
        User.findOneAndUpdate({hash: req.body.hash}, {$set: {active: true}}, {new: true}, (err, user) => {
            if (err) {
                return res.status(200).send({'status': 'error'});
            }
            if (!user) {
                return res.status(200).send({'status': 'error'});
            }
            return res.status(201).send(user);
        });
    },

    async findOne(req, res) {
        const user = await User.findById(req.userId, function (err, user) {
        });
        return res.status(200).send(user);
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
