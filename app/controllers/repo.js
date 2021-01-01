"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { Repo } = require("../models/repo");
const logger = require("../logger");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  let latest = await Repo.find().sort({ _id: -1 }).limit(1);
  if (latest.length > 0) {
    return res.status(200).send(latest[0].data);
  }
  return res.status(200).send();
  // return res.status(500).send('Server Error');
});

router.post("/", async (req, res) => {
  console.log(`Repo : ${req.body}`);

  let doc = { data: req.body };
  try {
    let inserted = await Repo.insertMany(doc);
    return res.status(200).send(inserted);
  } catch (error) {
    logger.error(`${error}`);
    // return res.status(500).send('Server Error');
  }
});

module.exports = router;
