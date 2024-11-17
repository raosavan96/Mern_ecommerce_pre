import React, { useEffect, useState } from "react";
import summaryApi from "../../../Common/BackendApi";
import AdminProductCard from "./AdminProductCard";

function AllUploadProducts() {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    fetch(summaryApi.allUploadProduct.url, {
      method: summaryApi.allUploadProduct.method
    })
      .then((res) => res.json())
      .then((res) => {
        setAllProducts(res.dataProducts);
      });
  }, [allProducts]);

  return (
    <>
      <div className="h-[calc(100vh-165px)] overflow-y-scroll  ">
        <div className="grid grid-cols-12">
          {allProducts.map((value, index) => (
            <div className="col-span-12 mx-auto sm:col-span-6 pb-6 lg:col-span-4 xl:col-span-3">
              <AdminProductCard key={index} products={value} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllUploadProducts;
