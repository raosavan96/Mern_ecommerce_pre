const addCartProductModel = require("../../models/addCartProductModel");
const { findByIdAndDelete } = require("../../models/addCartProductModel");

exports.deleteCartProduct = async (req, res) => {
  try {
    const { dcid } = req.params;
    console.log(dcid);

    const deleteCartProduct = await addCartProductModel.findByIdAndDelete(dcid);

    res.status(200).json({
      deleteCartProduct: deleteCartProduct,
      success: true,
      error: false,
      message: "Successfully deleted cart product"
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
