"use strict";

const mongoose = require("../db");

let repoSchema = new mongoose.Schema({
  data: Object,
});

mongoose.model("Repo", repoSchema);

module.exports = {
  Repo: mongoose.model("Repo"),
  repoSchema,
};
