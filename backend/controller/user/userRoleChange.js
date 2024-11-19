const uploadProductPermisson = require("../../helpers/permission");
const userModel = require("../../models/userModel");

exports.userRoleController = async (req, res) => {
  try {
    const { rid } = req.params;
    const sessionUserId = req.user_id._id;

    if (!uploadProductPermisson(sessionUserId)) {
      throw new Error("Permission denied");
    }
    const roleUser = await userModel.findById(rid);

    res.status(200).json({
      data: roleUser,
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

exports.userRoleUpdatedController = async (req, res) => {
  try {
    const { uid } = req.params;
    const { name, email, role } = req.body;
    const sessionUserId = req.user_id._id;

    if (!uploadProductPermisson(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const userRoleUp = await userModel.findByIdAndUpdate(uid, {
      name: name,
      email: email,
      role: role
    });

    res.status(200).json({
      data: [userRoleUp],
      success: true,
      error: false,
      message: "User role updated"
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
