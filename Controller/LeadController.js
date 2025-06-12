const { front_base_url } = require("../Constant/utlils");
const transporter = require("../Middleware/mailTransporter");
const LeadsModal = require("../Model/LeadsModal");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.createLeads = async (req, res) => {
  try {
    const { name = "", email = "", message = "", stage="Lead" } = req.body;

    // const leadsList = await LeadsModal.findOne({email})
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // if(leadsList){
    //   return res.status(400).send({
    //     message: "You have already sent your message."
    //   })
    // }

    const newLead = new LeadsModal({
      name,
      email,
      message,
      isVerified: false,
      otp,
      stage
    });

    await newLead.save();

    await transporter.sendMail({
      from: "freelancersumitsingh@gmail.com",
      to: email,
      subject: "Verify your email",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting us. Please verify your email by clicking the link below: ${otp}</p>
      `,
    });

    return res.status(201).json({
      message: "Plz verify your email.",
      // data: newLead,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).send({
        message: "Validation error",
        errors,
      });
    }

    return res.status(500).send({
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

exports.verifyLeads = async (req, res) => {
  try {
    const { otp = "", email = "" } = req.body;
    if (!otp || !email) {
      return res.status(400).send({
        success: false,
        message: "OTP and email is required.",
      });
    }

    const findUser = await LeadsModal.findOne({ email });
    if (!findUser) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered.",
      });
    }

    if (findUser.otp !== otp) {
      return res.status(400).send({
        success: false,
        message: "Invalid OTP.",
      });
    }

    findUser.isVerified = true;
    findUser.otp = undefined;
    await findUser.save();

    return res.status(200).send({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).send({
        message: "Validation error",
        errors,
      });
    }

    return res.status(500).send({
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

exports.getAllLeads = async (req, res) => {
  try {
    const {email} = req.user;
    if(!email){
      return res.status(400).send({
        success: false,
        message: "User not verified. "
      })
    }

    const allLeads = await LeadsModal.find().select("-otp");

    return res.status(201).send({
      success: true,
      message: "Data received successfully.",
      data: allLeads
    })


  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong.",
      error: error.message,
    });
    
  }
}
