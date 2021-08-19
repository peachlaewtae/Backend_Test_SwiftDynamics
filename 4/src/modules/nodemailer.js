const nodemailer = require('nodemailer');

// init
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});


module.exports.sendEmail = async (to_email, subject, text, html) => {
    let info = await transporter.sendMail({
        from: process.env.GMAIL_ACCOUNT,
        to: to_email,
        subject: subject,
        text: text,
        html: html
    });
    console.log('Message sent: %s', info.messageId);
    return;
}

