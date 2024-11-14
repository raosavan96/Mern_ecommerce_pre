const userModel = require("../models/userModel");

const uploadProductPermisson = async (userId) => {
  const user = await userModel.findById(userId);

  if (user.role !== "ADMIN") {
    return false;
  } else {
    return true;
  }
};

module.exports = uploadProductPermisson;
