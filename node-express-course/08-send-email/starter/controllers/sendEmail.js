require('dotenv').config()
const sgMail = require("@sendgrid/mail")

const nodemailer = require('nodemailer')

const sendGrid = async (req , res) => {
    const {from , message} = req.body;
    sgMail.setApiKey(process.env.API_KEY)
    const msg = {
        to: 'vinaygithub@gmail.com',
        from : from,
        text : message,
        subject : 'grid checking',

    }
    const sendEmail = await sgMail.send(msg);
    res.json(sendEmail)
}
// send mails using nodemailers

module.exports = sendGrid