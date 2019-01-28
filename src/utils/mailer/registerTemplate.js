import config from '../../config/config';

export default class RegisterTemplate {

    constructor(user) {
        this.user = user;
    }

    makeTemplate() {
        this.subject = `Cześć ${this.user.username} Zarejestrowałeś się w aplikacji Imprezownia!`;
        this.text = 'potwierdź aktywację konta';
        this.html = `<p>Potwierdź link aktywujący i zaloguj się do aplikacji!</p>
                     <a href="http://${config.server.ip}:4200/action/activate/${this.user.hash}">Aktywuj konto</a>`;

        return this;
    }
}
