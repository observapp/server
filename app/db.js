"use strict";

let mongoose = require("mongoose");
const logger = require("./logger");

const { db_user, db_pwd } = require("./config");

const uri = `mongodb+srv://${db_user}:${db_pwd}@cluster0.jqbsz.mongodb.net/app?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    logger.info(`Connected to db ${uri}`);
  })
  .catch((error) => {
    logger.error(`Server is shutting down. Could not connect to db ${error}`);
    process.exit(0);
  });

mongoose.connection.on("connected", function () {
  logger.info("DB is connected successfully");
});
mongoose.connection.on("error", function () {
  logger.error(`DB connection error`);
});
mongoose.connection.on("disconnected", function () {
  logger.info("DB is disconnected");
});

module.exports = mongoose;
