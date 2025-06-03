const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP server of your choice
  auth: {
    user: "freelancersumitsingh@gmail.com", // replace with your email
    pass: "uhla ddqb tzpz iome", // use app password for Gmail
  },
});


module.exports = transporter