const addCartProductModel = require("../../models/addCartProductModel");

exports.countAddToCartProduct = async (req, res) => {
  try {
    const currentUser = req.user_id._id;

    const count = await addCartProductModel.countDocuments({
      userId: currentUser
    });


    res.status(200).json({
      cartProCount: {
        count: count
      },
      success: true,
      error: false,
      message: "message "
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
