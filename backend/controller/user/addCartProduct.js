const addCartProductModel = require("../../models/addCartProductModel");

exports.addCartProductController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.user_id._id;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
        error: true
      });
    }

    if (!currentUser) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
        error: true
      });
    }

    const idProductAvailable = await addCartProductModel.findOne({
      productId,
      userId: currentUser
    });

    if (idProductAvailable) {
      return res.status(409).json({
        message: "Product already exists in cart",
        success: false,
        error: true
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser
    };

    const newAddtoCart = new addCartProductModel(payload);

    const addSuccessDone = await newAddtoCart.save();

    res.status(200).json({
      addCart: addSuccessDone,
      success: true,
      error: false,
      message: "Product added in cart"
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
