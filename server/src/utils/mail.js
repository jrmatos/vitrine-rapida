const nodemailer = require('nodemailer');

const { SENDER_EMAIL, SENDER_EMAIL_PASSWORD } = require('../configs');
const logger = require('./logger');

const emailTransporter = nodemailer.createTransport({
    name: "Vitrine Rápida",
    service:'Yahoo',
    secure: true,
    auth: {
       user: SENDER_EMAIL,
       pass: SENDER_EMAIL_PASSWORD
    },
    debug: false,
    logger: true
});

function sendEmail(to, subject, text) {
    const mailOptions = {
        from: SENDER_EMAIL,
        to,
        subject,
        text
    };

    return emailTransporter.sendMail(mailOptions);
}

function sendConfirmationCode(to, code) {
    logger.info(`Sending confirmation email to ${to} using the code ${code}`);

    const subject = 'Confirmação de e-mail';
    const text = `Olá! Obrigado por utilizar a Vitrine Rápida.\n
Clique neste link para confirmar o seu e-mail: https://vitrinerapida.site/emailconfirmation/${code}\n
Fique por dentro de todas as nossas novidades seguindo nosso Instagram @vitrinerapida.\n
Obrigado!
Equipe Vitrine Rápida`;

    return sendEmail(to, subject, text);
}

module.exports = {
    sendEmail,
    sendConfirmationCode
}
