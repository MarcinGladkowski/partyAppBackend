import PartyInvite from '../models/partyInvite';
import Mailer from "../utils/mailer/mailer";
import EmailTemplate from "../utils/mailer/emailTemplate";

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

        const partyInvite = await PartyInvite.findByIdAndUpdate({_id: partyInviteId}, {send: send}).populate("userInvited");
        // @TODO send email
        const user = partyInvite.userInvited;
        const subject = `Cześć ${user.username} Zarejestrowałeś się w aplikacji Imprezownia!`,
            text = 'potwierdź aktywację konta',
            html = `<p>Potwierdź link aktywujący i zaloguj się do aplikacji!</p>
                   <a href="http://localhost:4200/action/activate/${user.hash}"/>Aktywuj konto</a>`;

        const inviteEmail = new EmailTemplate(subject, text, html);
        new Mailer(user).layout(inviteEmail).sendEmail();

        return res.status(200).send(partyInvite);
    }
}