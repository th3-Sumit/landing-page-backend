const UserModal = require("../Model/UserModal");
const { compareSync, hashSync } = require('bcrypt')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../Constant/utlils");

exports.createSuperAdmin = async (req, res) => {
  try {
    const {
      first_name = "",
      last_name = "",
      email = "",
      password = "",
    } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required.",
      });
    }

    const userList = await UserModal.findOne({ email });
    if (userList) {
      return res.status(400).send({
        success: false,
        message: "User already exists. plz login or forgot password.",
      });
    }

    const hashPassword = hashSync(password, 10);

    const user = new UserModal({
      email,
      password: hashPassword,
      first_name,
      last_name,
    });

    const userNewList = await user.save();
    if(userNewList){
        return res.status(200).send({
            success: true,
            message: "User created successfully."
        })
    }
    

  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).send({
        message: "Validation error",
        errors,
      });
    }
  }
};

exports.userLogin = async(req, res) => {
    try {
        const {email="", password=""} = req.body;
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: "Email and password is required."
            })
        }

        const userAvailable = await UserModal.findOne({email: email});

        if(!userAvailable){
            return res.status(400).send({
                success: false,
                message: "Invalid email."
            })
        }

        const isPasswordCorrect = compareSync(password, userAvailable.password);

        if(!isPasswordCorrect){
            return res.status(400).send({
                success: false, 
                message: "Incorrect password."
            })
        }

        const tokenPayload = {
            user: userAvailable._id,
            email: email
        }

        const token = jwt.sign(tokenPayload, SECRET_KEY, {expiresIn: '30d'})

        res.status(200).send({
            message: "login success.",
            token: token
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "Something went wrong. Plz try again."
        })
        
    }
}
