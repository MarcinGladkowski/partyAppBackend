import nodemailer from 'nodemailer';
import config from '../../config/config';

/**
 * Class sends emails to users
 */
export default class Mailer {

    constructor(user) {
        this.nodemailer = nodemailer;
        this.user = user;

        this.createConfiguration();
        this.prepareEmailLayout(this.user);
    }

    createConfiguration() {
        this.transporter = this.nodemailer.createTransport({
            host: config.emailAccount.host,
            port: 587,
            secure: false,
            auth: {
                user: config.emailAccount.user,  
                pass: config.emailAccount.password  
            }
        });
    }
    
    /** To refactor - first version sends only register email */
    prepareEmailLayout(user) {
        this.mailOptions = {
            from: config.emailAccount.user,
            to: this.user.email, 
            subject: `Cześć ${user.username} Zarejestrowałeś się w aplikacji Imprezownia!`,
            text: 'potwierdź aktywację konta', 
            html: `<p>Potwierdź link aktywujący i zaloguj się do aplikacji!</p>
                   <a href="http://localhost:4200/action/activate/${user.hash}"/>Aktywuj konto</a>`
        };
    }

    sendEmail() {
        this.transporter.sendMail(this.mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', this.nodemailer.getTestMessageUrl(info));
        });
    }


}