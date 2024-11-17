const addCartProductModel = require("../../models/addCartProductModel");

exports.veiwCartProduct = async (req, res) => {
  try {
    const currentUser = req.user_id._id;

    const userAllProduct = await addCartProductModel
      .find({
        userId: currentUser
      })
      .populate("productId");

    res.status(200).json({
      allCartProduct: userAllProduct,
      success: true,
      error: false,
      message: "All Cart Products"
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
