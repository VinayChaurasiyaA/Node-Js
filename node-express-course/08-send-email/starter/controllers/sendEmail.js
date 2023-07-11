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
const nodemailerSend = async (req ,res) => {
    let dummyAccount = await nodemailer.createTestAccount();
    console.log(dummyAccount);

    let configOptions = {    
        // in host we have to put the smpt server of whichever the type of mail service we are using
        host: "smtp.gmail.com", 
        port: 587,
        tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2"
        }
    }
    const transporter = nodemailer.createTransport(configOptions)
    let message = await transporter.sendMail({
        to: 'vinay@github/com',
        from : {from} = req.body,
        text : {message} = req.body,

    });
    res.json(message);
}
module.exports = {sendGrid , nodemailerSend}