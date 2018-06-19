import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    username: {
        type: String,
    }
});

// export default mongoose.model('User', User);

var User = mongoose.model('User', UserSchema);
module.exports = User;