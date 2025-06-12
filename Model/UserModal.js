const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first_name is required."],
    },
    last_name: {
      type: String,
      required: [true, "last_name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Message is required."],
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
