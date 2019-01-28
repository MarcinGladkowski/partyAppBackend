import config from '../../config/config';

export default class InviteTemplate {

    constructor(user, party) {
        this.user = user;
        this.party = party;
    }

    makeTemplate() {
        this.subject = `Cześć ${this.user.username} Zostałeś zaproszony na wydarzenie!`;
        this.text = 'Kliknij w link aby wyświetlić szczegóły i dołączyć do wydarzenia';
        this.html = `<p>Potwierdź link aktywujący i zaloguj się do aplikacji!</p>
                     <a href="http://${config.server.ip}:4200/party/details/${this.party._id}">Zobacz wydarzenie</a>`;
        return this;
    }
}
