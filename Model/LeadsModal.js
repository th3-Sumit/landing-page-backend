const mongoose = require("mongoose");

const leadStages = ['Lead', 'Contact', 'Negotiation', 'Deal', 'Delevered', 'Cancel', 'Deleted']

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
    stage: {
      type: String,
      default: "Leads" 
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
