const uploadProduct = require("../../models/uploadProduct");

exports.getProductController = async (req, res) => {
  try {
    const allUploadProducts = await uploadProduct
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      dataProducts: allUploadProducts,
      success: true,
      error: false,
      message: "All uploaded products.."
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

exports.updateProDataController = async (req, res) => {
  try {
    const { upid } = req.params;
    const updateProData = await uploadProduct.findById(upid);

    res.status(200).json({
      dataProducts: updateProData,
      success: true,
      error: false,
      message: "Update product.."
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
