const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificateScheme = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseURL: {
      type: String,
      required: true,
    },
    courseImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Certificate", certificateScheme);
