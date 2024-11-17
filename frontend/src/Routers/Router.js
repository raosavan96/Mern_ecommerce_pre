import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Componets/Pages/Home/Home";
import Login from "../Componets/Pages/LoginoutSec/Login";
import ForgotPass from "../Componets/Pages/LoginoutSec/ForgotPass";
import Signup from "../Componets/Pages/LoginoutSec/Signup";
import AdminPanel from "../Componets/Pages/AdminPanel/AdminPanel";
import AllUsers from "../Componets/Pages/AdminPanel/AllUsers";
import AllProducts from "../Componets/Pages/AdminPanel/AllProducts";
import CategoryProduct from "../Componets/Pages/Home/CategoryList/CategoryProduct";
import SingleProductData from "../Componets/Pages/SingleProductData/SingleProductData";
import AddCartSec from "../Componets/Pages/AddCartSec/AddCartSec";
import Search from "../Componets/SearchProducts/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgot-password",
        element: <ForgotPass />
      },
      {
        path: "sign-up",
        element: <Signup />
      },
      {
        path: "product-category/:categoryName",
        element: <CategoryProduct />
      },
      {
        path: "single-product/:spId",
        element: <SingleProductData />
      },
      {
        path: "cart",
        element: <AddCartSec />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />
          },
          {
            path: "all-products",
            element: <AllProducts />
          }
        ]
      }
    ]
  }
]);

export default router;
