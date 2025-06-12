const nodemailer = require('nodemailer')
require('dotenv').config()

const email = process.env.email || ""
const password = process.env.email_password || ""
const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP server of your choice
  auth: {
    user: email, // replace with your email
    pass: password, // use app password for Gmail
  },
});


module.exports = transporter