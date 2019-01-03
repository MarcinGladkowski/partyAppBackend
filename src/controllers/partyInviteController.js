import PartyInvite from '../models/partyInvite';
import Mailer from "../utils/mailer/mailer";
import InviteTemplate from "../utils/mailer/inviteTemplate";

export default {
    async create(req, res) {
        const { party, userInvited } = req.body;
        const partyInvite = await PartyInvite.create({userInvited, party});
        const partySaved = await partyInvite.populate("userInvited").execPopulate();
        return res.status(200).send(partySaved);
    },

    async findByParty(req, res) {
        const partyInvites = await PartyInvite.find({party: req.params.partyId}).populate('userInvited');
        return res.status(200).send(partyInvites);
    },

    async sendInvite(req, res) {

        const partyInviteId = req.params.Id;
        const { send } = req.body;
        const partyInvite = await PartyInvite.findByIdAndUpdate({_id: partyInviteId}, {send: send}).populate("userInvited").populate("party");

        const { userInvited, party} = partyInvite;
        const inviteEmail = new InviteTemplate(userInvited, party).makeTemplate();
        new Mailer(userInvited.email).layout(inviteEmail).sendEmail();

        return res.status(200).send(partyInvite);
    }
}