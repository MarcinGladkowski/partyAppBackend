import mongoose from 'mongoose';
import crypto from 'crypto';
import { hashString } from '../utils/password';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true, sparse: true }
    },
    username: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true, sparse: true }
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    hash: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false,
        trim: true
    }
});

UserSchema.pre('save', function (next) {
    const user = this;

    hashString(user.password).then(result => {

        user.password = result;
        // hash to activate account
        let randomString = Math.random().toString(36).substring(7);
        user.hash = crypto.createHash('md5').update(randomString).digest('hex');

        next();
    });
});

export default mongoose.model('User', UserSchema);
