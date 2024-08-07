const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
