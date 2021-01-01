"use strict";

const nodemailer = require("nodemailer");
const { email, emailpwd } = require("../config");

const emailService = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, //true
    port: 25, //465
    auth: {
      user: email,
      pass: emailpwd,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: email,
    to: to,
    subject: subject,
    html: `<html><body> ${text} <body></html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// emailService("hello@observ.in", "hello", "hello");

module.exports = emailService;
