const mongoose = require("mongoose");

const leadSchemas = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    message: {
      type: String,
      required: [true, "Message is required."],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: { type: String },
    otp: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leads", leadSchemas);
