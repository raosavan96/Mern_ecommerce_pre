const uploadProduct = require("../../models/uploadProduct");

exports.fillterProductController = async (req, res) => {
  try {
    const categoryList = req.body?.category;
    const product = await uploadProduct.find({
      category: {
        $in: categoryList
      }
    });

    res.status(200).json({
      filter: product,
      success: true,
      error: false,
      message: "Fellter..."
    });

    console.log(categoryList);
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
