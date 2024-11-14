const uploadProduct = require("../../models/uploadProduct");

exports.CategoryWiseProductController = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const CategoryWiseProduct = await uploadProduct.find({
      category
    });

    res.status(200).json({
      categoryWPro: CategoryWiseProduct,
      success: true,
      error: false,
      message: "category wise products"
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
