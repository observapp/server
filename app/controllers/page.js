"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { Page } = require("../models/page");
const logger = require("../logger");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  let all = await Page.find();
  return res.status(200).send(all);
  // return res.status(500).send('Server Error');
});

router.get("/title", async (req, res) => {
  let page = await Page.find({ title: req.query.title });
  return res.status(200).send(page);
  // return res.status(500).send('Server Error');
});

router.post("/", async (req, res) => {
  console.log(`Page : ${req.body}`);

  let docs = req.body;

  try {
    await Page.deleteOne({ title: "Explorer" });
  } catch (error) {
    console.error(error);
  }

  try {
    let inserted = await Page.insertMany(docs);
    return res.status(200).send(inserted);
  } catch (error) {
    logger.error(`${error}`);
    // return res.status(500).send('Server Error');
  }
});

module.exports = router;
