"use strict";

const mongoose = require("../db");

let adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

mongoose.model("Admin", adminSchema);

module.exports = {
  Admin: mongoose.model("Admin"),
  adminSchema,
};
