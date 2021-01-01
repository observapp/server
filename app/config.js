"use strict";

require("dotenv").config();

const port = process.env.PORT;
const db_user = process.env.DB_USR;
const db_pwd = process.env.DB_PWD;
const secret = process.env.SECRET;
const email = process.env.EMAIL;
const emailpwd = process.env.EMAILPWD;
const url = process.env.URL; //URL for email verification

module.exports = {
  port,
  db_user,
  db_pwd,
  secret,
  email,
  emailpwd,
  url,
};
