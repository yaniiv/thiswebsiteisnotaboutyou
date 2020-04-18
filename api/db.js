const mongoose = require("mongoose");
// const getConfig = require("next/config")
// const config = require("../next.config.js");
const contributionSchema = require("./schema");
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const DB_URI = process.env.DB_URI;
console.warn("DB_URI", DB_URI);
const COLLECTION = process.env.COLLECTION;
console.warn("COLLECTION", COLLECTION);

module.exports = {
  dbConnect: () => mongoose.connect(DB_URI, { useNewUrlParser: true }),
  disconnect: () => mongoose.disconnect(),
  Contribution: mongoose.model(COLLECTION, contributionSchema),
};
