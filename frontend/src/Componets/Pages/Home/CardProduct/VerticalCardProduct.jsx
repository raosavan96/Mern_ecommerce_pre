import React, { useContext, useEffect, useState, useCallback } from "react";
import fetchCategoryWiseProduct from "../../../../Helpers/fetchCategoryWiseProduct";
import displayINRcurrency from "../../../../Helpers/displayCurrency";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import Context from "../../../../Common/context";
import addCartProduct from "../../../../Helpers/addToCart";
import scrollTop from "../../../../Helpers/scrolltop";

function VerticalCardProduct({ category, hading }) {
  const { fetchUserAddToCart } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Display a fixed number of loading placeholders (e.g., 4)
  const loadingList = new Array(4).fill(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct.categoryWPro);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
  }, []); // Re-fetch data when the category prop changes

  return (
    <>
      <div className="container mx-auto p-4 relative h-auto">
        <h2 className="text-2xl font-semibold py-3">{hading}</h2>
        {loading ? (
          loadingList.map((_, index) => (
            <ContentLoader viewBox="0 0 380 70" key={index}>
              <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
              <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          ))
        ) : (
          <div>
            <div className="overflow-x-scroll gap-6 scroollbar-none">
              <div className="w-full h-full transition-all duration-1000 grid grid-cols-4 gap-4">
                {data.map((value, index) => (
                  <div
                    key={index}
                    className="col-span-4 sm:col-span-2 w-full md:col-span-1 mb-4 bg-white rounded-sm shadow-lg h-[350px] mx-auto"
                  >
                    <Link
                      to={`/single-product/${value?._id}`}
                      onClick={scrollTop}
                    >
                      <div className="bg-slate-200 p-4 flex justify-center items-center">
                        <img
                          className="w-36 h-36 hover:scale-110 transition-all mix-blend-multiply"
                          src={value?.productImage[0]}
                          alt={value?.productName || "Product Image"}
                          style={{ aspectRatio: "3/2", objectFit: "contain" }}
                        />
                      </div>
                    </Link>

                    <div className="py-4 px-3">
                      <h2 className="text-sm font-medium text-cyan-500 text-ellipsis line-clamp-1">
                        {value?.productName}
                      </h2>
                      <p className="capitalize text-sm text-slate-500">
                        {value?.category}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-red-600 font-medium text-[15px]">
                          {displayINRcurrency(value?.selling)}
                        </p>
                        <p className="text-slate-500 line-through text-xs">
                          {displayINRcurrency(value?.price)}
                        </p>
                      </div>
                      <div>
                        <button
                          className="bg-cyan-500 me-2 text-white py-1.5 mt-5 px-5 text-sm rounded-full"
                          onClick={async () => {
                            await addCartProduct(value?._id);
                            fetchUserAddToCart();
                          }}
                        >
                          Add Cart
                        </button>
                        <Link
                          to={`/single-product/${value?._id}`}
                          onClick={scrollTop}
                        >
                          <button className="bg-lime-500 text-white py-1.5 mt-5 px-5 text-sm rounded-full">
                            More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VerticalCardProduct;
