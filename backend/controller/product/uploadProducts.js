const uploadProductPermisson = require("../../helpers/permission");
const uploadProduct = require("../../models/uploadProduct");

exports.uploadProductController = async (req, res) => {
  try {
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

    const uploadProducts = new uploadProduct({
      productName,
      brandName,
      productImage,
      category,
      description,
      price,
      selling
    });

    await uploadProducts.save(uploadProducts);

    res.status(200).json({
      data: [],
      success: true,
      error: false,
      message: "Product Uploaded successfully  "
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
