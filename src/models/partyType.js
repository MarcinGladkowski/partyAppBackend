import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PartyTypeSchema = new mongoose.Schema({
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
    path: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date, 
        default: Date.now 
    }
});

const PartyType = mongoose.model('PartyType', PartyTypeSchema);
export default PartyType;