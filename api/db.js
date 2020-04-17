const mongoose = require("mongoose");

const contributionSchema = require("./schema");

const DB_URI = process.env.DB_URI;
const COLLECTION = process.env.COLLECTION;

module.exports = {
  dbConnect: () => mongoose.connect(DB_URI, { useNewUrlParser: true }),
  disconnect: () => mongoose.disconnect(),
  Contribution: mongoose.model(COLLECTION, contributionSchema),
};
