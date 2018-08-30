import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
    /** actualy password is the same as hash */
    hashString(user.password).then(result => {
        user.password = result;
        user.hash = result;
        next();
    });
});

const User = mongoose.model('User', UserSchema);
export default User;