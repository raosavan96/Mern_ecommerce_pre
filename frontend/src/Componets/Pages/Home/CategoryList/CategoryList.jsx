import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import summaryApi from "../../../../Common/BackendApi";

function CategoryList() {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(categoryProduct.length).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    fetch(summaryApi.getCategory.url, {
      method: summaryApi.getCategory.method,
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setLoading(false);
          setCategoryProduct(res.data);
        }
      });
  };


  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <>
      <div className="container mx-auto p-4 ">
        <div>
          <div className="flex items-center justify-between overflow-scroll gap-4 scroollbar-none">
            {loading
              ? categoryLoading.map((value, index) => (
                  <div
                    className="md:w-20 md:h-20 w-16 h-16 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                    key={index}
                  ></div>
                ))
              : categoryProduct.map((value, index) => (
                  <Link to={`/product-category/${value.category}`} key={index}>
                    <div className="md:w-20 md:h-20 w-16 h-16 rounded-full overflow-hidden p-4 bg-slate-200 shadow-lg cursor-pointer">
                      <img
                        src={value?.productImage[0]}
                        alt={value?.productName}
                        className="w-full h-full object-contain mix-blend-multiply hover:scale-110 transition-all"
                        style={{ aspectRatio: "3/2" }}
                      />
                    </div>
                    <p className="text-xs md:text-sm text-center mt-2 capitalize">
                      {value?.category}
                    </p>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryList;
