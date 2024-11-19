const addCartProductModel = require("../../models/addCartProductModel");

exports.updateAddCartProduct = async (req, res) => {
  try {
    const currentUser = req.user_id._id;
    
    const addToCartProductId = req.body.id;
    const qty = req.body.quantity;
 

    const updateProductData = await addCartProductModel.findByIdAndUpdate(
      addToCartProductId,
      {
        ...(qty && { quantity: qty })
      }
    );

    res.status(200).json({
      allUser: updateProductData,
      success: true,
      error: false,
      message: "Update product details.."
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
