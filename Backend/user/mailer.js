const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // replace with your email
    pass: process.env.EMAIL_PASS, // replace with your email password or app password
  },
});

module.exports = transporter;
