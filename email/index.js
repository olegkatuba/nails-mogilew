import nodemailer from 'nodemailer';
import config from './config';


const transporter = nodemailer.createTransport(config);

export default class Email {

    constructor(receivers, subject, htmlTemplate, data) {
        this.receivers = receivers;
        this.subject = subject;
        this.htmlTemplate = htmlTemplate;
        this.data = data;
    }

    send() {
        console.log('send');
        let message = {
            from: `Auto Market Application <${config.auth.user}>`,
            to: this.receivers.to.reduce((receivers, receiver, i, arr) => {
                return receivers += `${receiver.name} <${receiver.email}>${i !== arr.length - 1 ? ', ' : ''}`
            }, ''),
            cc: this.receivers.cc && this.receivers.cc.reduce((receivers, receiver, i, arr) => {
                return receivers += `${receiver.name} <${receiver.email}>${i !== arr.length - 1 ? ', ' : ''}`
            }, ''),
            subject: this.subject
        };

        message.html = this.htmlTemplate;

        transporter.sendMail(message, (error, info) => {
            error && console.log(error);
        });
    }
}
