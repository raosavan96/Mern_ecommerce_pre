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

// Home page

router.get("/get-category", getCategoryController);

router.post("/category-wise-product", CategoryWiseProductController);
router.post("/sengle-product-data", singleProductController);

// Home page

module.exports = router;
