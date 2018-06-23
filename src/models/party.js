import mongoose from 'mongoose';

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
    latitude:
    longitude

});

var Party = mongoose.model('Party', PartySchema);
module.exports = Party;