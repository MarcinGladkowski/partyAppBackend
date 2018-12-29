import Party from '../models/party';
import User from "../models/user";

export default {
    /** create new party */
    async create(req, res) {

        const { name, desc, latitude, longitude, partyType, startDate, endDate } = req.body;
        const userCreated = req.userId;
        const party = await new Party({ name, desc, latitude, longitude, userCreated, partyType, startDate, endDate}).save();
        const saved = await Party.findOne({_id: party._id}).populate('userCreated').populate('partyType').exec();
        //  @TODO add location header - address to new resource

        return res.status(201).send({'data': saved});
    },
    /** get all parties */
    async getAll(req, res) {

        await Party.find({}).populate('userCreated').populate('partyType').populate('participants')
        .exec(function(err, parties) {
            const partyList = parties;
            return res.send({'parties': partyList});
        });
    },

    async findById(req, res) {
        const party = await Party.findById(req.params.id).populate('userCreated').populate('partyType').populate('participants');
        return res.status(200).send(party);
    },

     async addParticipant(req, res) {
         // TODO check this user in participants list
         const party = await Party.findById(req.params.id).populate('userCreated').populate('partyType').populate('participants');
         const user = await User.findById(req.body._id);

         party.participants.push(user);
         party.save();
         return res.status(200).send(party);
     },

    //@TODO remove paticipant from party
    async removeParticipant(req, res) {

        const userId = req.params.userId;
        const party = await Party.findById(req.params.id).populate('userCreated').populate('partyType').populate('participants');

        party.participants.id(userId).remove();
        party.save();

        return res.status(200).send(party);
    }
}