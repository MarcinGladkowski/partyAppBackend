import Party from '../models/party';

export default {
    /** create new party */
    async create(req, res) {

        const { name, desc, latitude, longitude, partyType  } = req.body;
        const userCreated = req.userId;

        const party = await new Party({ name, desc, latitude, longitude, userCreated, partyType}).save();
        const saved = await Party.findOne({_id: party._id})
            .populate('userCreated')
            .populate('partyType')
            .exec();

        // @TODO add location header - address to new resource    
 
        return res.status(201).send({'data': saved});
    },
    /** get all parties */
    async getAll(req, res) {

        await Party.find({})
        .populate('userCreated')
        .populate('partyType')
        .populate('participants')
        .exec(function(err, parties) {
            const partyList = parties;
            return res.send({'parties': partyList});
        });
    },

    async findById(req, res) {

        const party = await Party.findById(req.params.id)
        .populate('userCreated')
        .populate('partyType')
        .populate('participants');

        return res.status(200).send(party);
    }
}