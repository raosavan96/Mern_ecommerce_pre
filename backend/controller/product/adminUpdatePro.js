const uploadProductPermisson = require("../../helpers/permission");
const uploadProduct = require("../../models/uploadProduct");

exports.adminUpdateProductController = async (req, res) => {
  try {
    const { apid } = req.params;
    const sessionUserId = req.user_id._id;

    if (!uploadProductPermisson(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const {
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      selling
    } = req.body;

    const updateProduct = await uploadProduct.findByIdAndUpdate(apid, {
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      selling
    });

    res.status(200).json({
      data: updateProduct,
      success: true,
      error: false,
      message: "Admin updated product successfully.."
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
