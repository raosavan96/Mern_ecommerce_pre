const backendDomin = "http://localhost:5000";

const summaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "POST"
  },
  logIN: {
    url: `${backendDomin}/api/login`,
    method: "POST"
  },
  currentUser: {
    url: `${backendDomin}/api/user-details`,
    method: "GET"
  },
  userlogout: {
    url: `${backendDomin}/api/user-logout`,
    method: "GET"
  },
  allusers: {
    url: `${backendDomin}/api/all-user`,
    method: "GET"
  },
  roleuser: {
    url: `${backendDomin}/api/role-user`,
    method: "GET"
  },
  roleuserupdated: {
    url: `${backendDomin}/api/role-user-updated`,
    method: "POST"
  },
  uploadProducts: {
    url: `${backendDomin}/api/upload-products`,
    method: "POST"
  },
  allUploadProduct: {
    url: `${backendDomin}/api/get-products`,
    method: "GET"
  },
  updateProductData: {
    url: `${backendDomin}/api/update-pro-data`,
    method: "GET"
  },
  adminUpdatedProduct: {
    url: `${backendDomin}/api/admin-update-product`,
    method: "POST"
  },
  deleteProductAdmin: {
    url: `${backendDomin}/api/delet-product-admin`,
    method: "DELETE"
  },
  getCategory: {
    url: `${backendDomin}/api/get-category`,
    method: "GET"
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-wise-product`,
    method: "POST"
  },
  singleProductData: {
    url: `${backendDomin}/api/sengle-product-data`,
    method: "POST"
  },
  addCartProduct: {
    url: `${backendDomin}/api/add-cart-product`,
    method: "POST"
  },
  countCartProduct: {
    url: `${backendDomin}/api/count-cart-product`,
    method: "GET"
  },
  viewCartProduct: {
    url: `${backendDomin}/api/view-cart-product`,
    method: "GET"
  },
  updateProductCard: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "POST"
  },
  deleteProductCart: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "DELETE"
  },
  searchProduct: {
    url: `${backendDomin}/api/search-product`,
    method: "GET"
  },
  filterProducts: {
    url: `${backendDomin}/api/fillter-product`,
    method: "POST"
  }
};

export default summaryApi;
