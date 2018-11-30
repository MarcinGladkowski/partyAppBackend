import Party from '../models/party';

export default {
    /** create new party */
    async create(req, res) {

        console.log('test');

        const party = await new Party({
            name: req.body.name,
            desc: req.body.desc,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            userCreated: req.userId,
            partyType: req.body.type
        }).save();

        const saved = await Party.findOne({_id: party._id})
            .populate('userCreated')
            .populate('partyType')
            .exec();
 
        return res.send({'data': saved});
    },
    /** get all parties */
    async list(req, res) {

        await Party.find({})
        .populate('userCreated')
        .populate('partyType')
        .exec(function(err, parties) {
            const partyList = parties;
            return res.send({'parties': partyList});
        });
        
    }
}