import mongoose from "mongoose";

import config from "./db-config";
import contributionSchema from "./schema";

const DB_URI = config.db;
const COLLECTION = config.collection;

module.exports = {
  dbConnect: () => mongoose.connect(DB_URI, { useNewUrlParser: true }),
  disconnect: () => mongoose.disconnect(),
  Contribution: mongoose.model(COLLECTION, contributionSchema),
};
