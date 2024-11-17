const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Please provide email" });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide password"
      });
    }

    const userInfo = await userModel.findOne({ email: email });

    if (!userInfo) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "User not found" });
    }

    const checkPassword = await bcrypt.compareSync(password, userInfo.password);

    if (checkPassword) {
      const tokenData = {
        _id: userInfo._id,
        email: userInfo.email,
        password: userInfo.password
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 *8
      });

      const tokenOption = {
        httpOnly: true,
        secure: true
      };

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login Successfully", 
        data: token,
        success: true,
        error: false
      });
    } else {
      res.status(400).json({
        success: false,
        error: true,
        message: "Please check password"
      });
    }

    res.status(201).json({
      data: userInfo,
      success: true,
      error: false,
      message: "Successfully login..."
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        message: error.message || "Internal server error",
        error: true,
        success: false
      });
    }
  }
};
