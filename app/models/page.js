"use strict";

let mongoose = require("../db");

let pageSchema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
    unique: true,
  },
  sections: [Object],
});

mongoose.model("Page", pageSchema);

module.exports = {
  Page: mongoose.model("Page"),
  pageSchema,
};
