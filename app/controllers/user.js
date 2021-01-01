"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  return res.status(200).send("getting users /");
  // return res.status(500).send('Server Error');
});

router.get("/:id", (req, res) => {
  return res.status(200).send(`Got ${req.params.id}`);
  // return res.status(500).send('Server Error');
});

router.post("/", (req, res) => {
  console.log(`User Name : ${req.body.username}`);
  console.log(`Password : ${req.body.password}`);
  return res
    .status(200)
    .send({ username: req.body.username, password: req.body.password });
  // return res.status(401).send("User not found!");
  // return res.status(500).send("Server Error");
});

router.put("/:id", (req, res) => {
  res.status(200).send(`Updated ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.status(200).send(`Deleted User ${req.params.id}`);
});

module.exports = router;
