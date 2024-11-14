const userModel = require("../../models/userModel");

exports.userDatialsController = async (req, res) => {
  try {
    const userId = req.user_id?._id;

    const user = await userModel.findById(userId);


    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: "User datails "
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
