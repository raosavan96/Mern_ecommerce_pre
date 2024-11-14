const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

exports.userSigninController = async (req, res) => {
  try {
    const { name, email, password, profimg } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide name" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide password" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const userData = new userModel({
      name,
      email,
      password: hashPassword,
      profimg
    });

    const savedUser = await userData.save();

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User created successfully"
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: error.message || error });
  }
};
