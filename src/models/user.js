import mongoose from 'mongoose';
import crypto from 'crypto';
import { hashString } from '../utils/password';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
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
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    
    hashString(user.password).then(result => {

        user.password = result;

        let randomString = Math.random().toString(36).substring(7);
        user.hash = crypto.createHash('md5').update(randomString).digest('hex');

        next();
    });
});

const User = mongoose.model('User', UserSchema);
export default User;