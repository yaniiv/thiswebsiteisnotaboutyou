const mongoose = require("mongoose");
const contributionSchema = require("./schema");

const getEnv = () => {
  return {
    DB_URI: process.env.DB_URI,
    COLLECTION: process.env.COLLECTION,
  };
};

const { DB_URI, COLLECTION } = getEnv();
console.warn("getEnv()", getEnv());

module.exports = {
  dbConnect: () => mongoose.connect(DB_URI, { useNewUrlParser: true }),
  disconnect: () => mongoose.disconnect(),
  Contribution: mongoose.model(COLLECTION, contributionSchema),
};
