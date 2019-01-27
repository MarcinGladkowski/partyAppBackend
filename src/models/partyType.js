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
    filename: {
        type: String,
        required: false,
    },
    filenamePhoto: {
        type: String,
        required: false,
    },
    createdDate: {
        type: Date, 
        default: Date.now 
    }
});

export default  mongoose.model('PartyType', PartyTypeSchema);
