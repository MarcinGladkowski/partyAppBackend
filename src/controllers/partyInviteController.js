import PartyInvite from '../models/partyInvite';

export default {
    async create(req, res) {

        const { party, userInvited } = req.body;
        const partyInvite = await PartyInvite.create({userInvited, party});

        return res.status(200).send(partyInvite);
    },
    findByParty: async function (req, res) {

        const partyInvites = await PartyInvite.find({party: req.params.partyId}).populate('userInvited');
        return res.status(200).send(partyInvites);

    },
    async sendInvite(req, res) {

        const { partyId, userInvitedId } = req.body;

        const partyInvite = await PartyInvite.findOneAndUpdate({party: partyId, userInvited: userInvitedId }, {send: true});

        return res.status(200).send(partyInvite);
    }
}