const nodemailer = require("nodemailer");

module.exports = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            pool: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: subject,
            html: html,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("send email fail!");
        console.log(error);
        return error;
    }
};