const uploadProduct = require("../../models/uploadProduct");

exports.deleteProductAdminController = async (req, res) => {
  try {
    const { dpid } = req.params;

    await uploadProduct.findByIdAndDelete(dpid);

    res.status(200).json({
      deleteProduct: "",
      success: true,
      error: false,
      message: "Delete product successfully.."
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
