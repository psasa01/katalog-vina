const nodemailer = require('nodemailer');
const secret = require('./secret');

const transport = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: secret.mailer.MAILGUN_USER,
        pass: secret.mailer.MAILGUN_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    sendEmail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({from, subject, to, html}, (err, info) => {
                if (err) reject (err);
                resolve(info);
            });
        });
    }
}


