"use strict";

let mongoose = require("../db");

let seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
  contents: [Object],
});

mongoose.model("Series", seriesSchema);

module.exports = {
  Series: mongoose.model("Series"),
  seriesSchema,
};
