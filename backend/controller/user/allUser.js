const userModel = require("../../models/userModel");

exports.allUserController = async (req, res) => {
  try {
    const allUser = await userModel.find();

    res.status(200).json({
      allUser: allUser,
      success: true,
      error: false,
      message: "All Users"
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
