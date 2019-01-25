import mongoose from 'mongoose';
import { UserSchema } from './user';
const Schema = mongoose.Schema;

const PartySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true, sparse: true }
    },
    desc: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    createdDate: {
        type: Date, 
        default: Date.now 
    }, 
    userCreated: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    partyType: {
        type: Schema.Types.ObjectId, 
        ref: 'PartyType'
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default mongoose.model('Party', PartySchema);
