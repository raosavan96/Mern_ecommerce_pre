const router = require("express").Router();
const userSignInfo = require("../controller/user/userSignin");
const userLoginInfo = require("../controller/user/userLogin");
const userDetailsMain = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogoutController = require("../controller/user/userLogout");
const { allUserController } = require("../controller/user/allUser");
const {
  userRoleController,
  userRoleUpdatedController
} = require("../controller/user/userRoleChange");
const {
  uploadProductController
} = require("../controller/product/uploadProducts");
const {
  getProductController,
  updateProDataController
} = require("../controller/product/getProducts");
const {
  adminUpdateProductController
} = require("../controller/product/adminUpdatePro");
const {
  deleteProductAdminController
} = require("../controller/product/deleteProductAdmin");
const { getCategoryController } = require("../controller/product/getCategory");
const {
  CategoryWiseProductController
} = require("../controller/product/CategoryWiseProduct");
const {
  singleProductController
} = require("../controller/product/singleProductData");
const {
  addCartProductController
} = require("../controller/user/addCartProduct");
const {
  countAddToCartProduct
} = require("../controller/user/countAddToCartProduct");
const { veiwCartProduct } = require("../controller/user/viewCartProduct");
const {
  updateAddCartProduct
} = require("../controller/user/updateAddCartProduct");
const { deleteCartProduct } = require("../controller/user/deleteCartProduct");
const {
  searchProductController
} = require("../controller/product/searchProduct");
const { fillterProductController } = require("../controller/product/fillter");

// Admin panel

router.get("/all-user", authToken, allUserController);
router.get("/role-user/:rid", authToken, userRoleController);
router.get("/get-products", getProductController);
router.get("/update-pro-data/:upid", updateProDataController);

router.post("/role-user-updated/:uid", authToken, userRoleUpdatedController);
router.post("/upload-products", authToken, uploadProductController);
router.post(
  "/admin-update-product/:apid",
  authToken,
  adminUpdateProductController
);

router.delete("/delet-product-admin/:dpid", deleteProductAdminController);

// Admin panel

router.post("/signup", userSignInfo.userSigninController);
router.post("/login", userLoginInfo.userLoginController);

router.get("/user-details", authToken, userDetailsMain.userDatialsController);
router.get("/user-logout", userLogoutController.userLogoutController);

// All

router.get("/get-category", getCategoryController);

router.post("/category-wise-product", CategoryWiseProductController);
router.post("/sengle-product-data", singleProductController);

// All

// user add to cart

router.post("/add-cart-product", authToken, addCartProductController);
router.post("/update-cart-product", authToken, updateAddCartProduct);
router.get("/count-cart-product", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, veiwCartProduct);
router.delete("/delete-cart-product/:dcid", authToken, deleteCartProduct);

// user add to cart

// Search product

router.get("/search-product", searchProductController);

// Search product

// fellter

router.post("/fillter-product", fillterProductController);

// fellter

module.exports = router;
