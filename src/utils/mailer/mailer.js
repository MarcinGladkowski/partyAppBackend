import nodemailer from 'nodemailer';
import config from '../../config/config';

/**
 * Class sends emails to users
 */
export default class Mailer {

    constructor(userEmail) {
        this.nodemailer = nodemailer;
        this.userEmail = userEmail;

        this.createConfiguration();
        this.prepareEmailLayout();
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
    prepareEmailLayout() {
        this.mailOptions = {
            from: config.emailAccount.user,
            to: this.userEmail, 
            subject: 'Zarejestrowałeś się w aplikacji Imprezownia!',
            text: 'potwierdź aktywację konta', 
            html: '<b>Potwierdź link aktywujący i zaloguj się do aplikacji!</b>'
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