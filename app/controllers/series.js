"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { Series } = require("../models/series");
const logger = require("../logger");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  let all = await Series.find();
  return res.status(200).send(all);
  // return res.status(500).send('Server Error');
});

router.post("/", async (req, res) => {
  console.log(`Series : ${req.body}`);

  let docs = req.body;

  await Series.deleteMany({});

  try {
    let inserted = await Series.insertMany(docs);
    return res.status(200).send(inserted);
  } catch (error) {
    logger.error(`${error}`);
    // return res.status(500).send('Server Error');
  }
});

module.exports = router;
