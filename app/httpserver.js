"use strict";

const express = require("express")();
const http = require("http");
const cors = require("cors")();

const logger = require("./logger");

const userController = require("./controllers/user");
const registrationController = require("./controllers/registration");
const mediaController = require("./controllers/media");
const adminLoginController = require("./controllers/adminLogin");
const seriesController = require("./controllers/series");
const pageController = require("./controllers/page");
const repoController = require("./controllers/repo");

express.use(cors);

express.get("/", (req, res) => {
  return res.status(200).send("hello observ");
  // return res.status(500).send('Server Error');
});

express.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

express.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

express.use("/users", userController);
express.use("/registration", registrationController);
express.use("/media", mediaController);
express.use("/admin", adminLoginController);
express.use("/series", seriesController);
express.use("/page", pageController);
express.use("/repo", repoController);

const server = http.createServer(express);

module.exports = server;
