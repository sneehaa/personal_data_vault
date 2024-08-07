const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: Number, required: true },
  isUsed: { type: Boolean, default: false },
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
