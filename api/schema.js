const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);

module.exports = contributionSchema;
