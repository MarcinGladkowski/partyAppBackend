import nodemailer from 'nodemailer';
import config from '../../config/config';

/**
 * Class sends emails to users
 */
export default class Mailer {

    constructor(email) {
        this.nodemailer = nodemailer;
        this.email = email;
        this.createConfiguration();
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

    layout(template) {
        this.mailOptions = {
            from: config.emailAccount.user,
            to: this.email,
            subject: template.subject,
            text: template.text,
            html: template.html
        }
        return this;
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