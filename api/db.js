const mongoose = require("mongoose");
const config = require("../next.config.js");
const contributionSchema = require("./schema");

const DB_URI = config.env.DB_URI;
console.warn("DB_URI", DB_URI);
const COLLECTION = config.env.COLLECTION;
console.warn("COLLECTION", COLLECTION);

module.exports = {
  dbConnect: () => mongoose.connect(DB_URI, { useNewUrlParser: true }),
  disconnect: () => mongoose.disconnect(),
  Contribution: mongoose.model(COLLECTION, contributionSchema),
};
