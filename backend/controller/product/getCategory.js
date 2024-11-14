const uploadProduct = require("../../models/uploadProduct");

exports.getCategoryController = async (req, res) => {
  try {
    const productCategory = await uploadProduct.distinct("category");
    productCategory.shift();

    const productByCategory = [];

    for (const category of productCategory) {
      const product = await uploadProduct.findOne({ category });

      if (product) {
        productByCategory.push(product);
      }
    }

    res.status(200).json({
      data: productByCategory,
      success: true,
      error: false,
      message: "Get category.."
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
