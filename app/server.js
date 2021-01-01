"use strict";

const logger = require("./logger");
const server = require("./httpserver");
const { port } = require("./config");
require("./db");

server.listen(port, (err) => {
  if (err) {
    logger.error(`Error ${err} Shutting down server at ${port}`);
    process.exit(0);
  }
  logger.info(`Server started at ${port}`);
});
