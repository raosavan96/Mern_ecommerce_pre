import summaryApi from "../Common/BackendApi";
import { toast } from "react-toastify";

const addCartProduct = async (id) => {
  const response = await fetch(summaryApi.addCartProduct.url, {
    method: summaryApi.addCartProduct.method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: id })
  });

  const responseData = await response.json();

  if (responseData.success) {
    toast.success(responseData.message);
  }
  if (responseData.error) {
    toast.error(responseData.message);
  }
};

export default addCartProduct;
