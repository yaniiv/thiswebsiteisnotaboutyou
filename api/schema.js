const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: false,
    },
    canvas: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    locationString: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true, // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);

module.exports = contributionSchema;
