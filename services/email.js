const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, context) => {
    const transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    return await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        text: context,
    });
}


module.exports = { sendEmail };