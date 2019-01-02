import mongoose from 'mongoose';
import { UserSchema } from './user';
const Schema = mongoose.Schema;

const PartyInviteSchema = new mongoose.Schema({
    send: {
      type: Boolean,
      default: false
    },
    userInvited: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    party: {
        type: Schema.Types.ObjectId,
        ref: 'Party'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('PartyInvite', PartyInviteSchema);