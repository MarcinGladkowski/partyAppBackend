import Party from '../models/party';

export default {
    async create(req, res) {

        const party = await new Party({
            name: req.body.name,
            desc: req.body.desc,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        }).save();

        return res.send({'data': party, 'status': 'ok'})
    },

    async list(req, res) {

        await Party.find({}, function(err, parties) {
            const partyList = parties;

            return res.send({'parties': partyList});
         });

        
    }
}