const uploadProduct = require("../../models/uploadProduct");

exports.searchProductController = async (req, res) => {
  try {
    const query = req.query.q;

    const regex = new RegExp(query, "i", "g");

    if (query) {
      const product = await uploadProduct.find({
        $or: [
          {
            productName: regex
          },
          {
            category: regex
          }
        ]
      });
      res.status(200).json({
        searchPoducts: product,
        success: true,
        error: false,
        message: " Search product.."
      });
    }
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
