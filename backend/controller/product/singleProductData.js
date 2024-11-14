const uploadProduct = require("../../models/uploadProduct");

exports.singleProductController = async (req, res) => {
  try {
    const { spId } = req.body;

    const singleProduct = await uploadProduct.findById(spId);

    res.status(200).json({
      singlePeoduct: singleProduct,
      success: true,
      error: false,
      message: " Single data product.."
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
