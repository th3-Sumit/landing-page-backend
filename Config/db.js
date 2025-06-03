const mongoose = require("mongoose");
const env = require("dotenv");
const LeadsModal = require("../Model/LeadsModal");

env.config();

const db = async () => {
  try {
    const CONNECTION_URL = process.env.DATABASE_URL;
    await mongoose.connect(CONNECTION_URL).then(
      (data) => {
        console.log("DATABASE CONNECTED ...!!");
      },
      (err) => {
        console.log(err, "Connection failed ...!!");
      }
    );
    // const result = await LeadsModal.updateMany(
    //     {}, // Empty filter to match all documents
    //     { $set: { timestamps: false } }, // Set isDeleted to false
    //     { upsert: false } // Don't create new documents
    //   );

  } catch (error) {
    console.log(error);
  }
};

module.exports = db();
