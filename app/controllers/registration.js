"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const logger = require("../logger");
const User = require("../models/user").User;
const emailService = require("../utils/emailService");

const { url } = require("../config");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("", async (req, res) => {
  if (!req.body.name) {
    return res.status(405).send();
  }
  if (!req.body.email) {
    return res.status(405).send();
  }
  try {
    let users = await User.find({ email: req.body.email }).exec();
    if (users && users.length > 0) {
      emailService(
        req.body.email,
        "Welcome to Observ",
        `Click on this link and start your journey! ${url}/verify/`
      );
      return res.status(200).send();
    }
  } catch (error) {
    logger.error(`Error while finding user ${error}`);
  }

  let user = await User.create({
    name: req.body.name,
    email: req.body.email,
  })
    .then((data) => {
      emailService(
        req.body.email,
        "Welcome to Observ",
        `Click on this link and start your journey! ${url}/verify/${data.id}`
      );
      return res.status(200).send();
    })
    .catch((error) => {
      logger.error(`Create User error ${error}`);
      return res.status(500).send();
    });
});

module.exports = router;
