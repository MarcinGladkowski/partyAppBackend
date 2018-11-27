import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PartySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
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
        type: Schema.Types.ObjectId, ref: 'User'
    },
    partyType: {
        type: Schema.Types.ObjectId, ref: 'PartyType'
    }
});

var Party = mongoose.model('Party', PartySchema);
module.exports = Party;

// export default Party;