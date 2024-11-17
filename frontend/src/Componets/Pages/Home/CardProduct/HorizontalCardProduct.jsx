import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../../../../Helpers/fetchCategoryWiseProduct";
import displayINRcurrency from "../../../../Helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import addCartProduct from "../../../../Helpers/addToCart";
import Context from "../../../../Common/context";

function HorizontalCardProduct({ category, hading }) {
  const {  fetchUserAddToCart } = useContext(Context);
  const [hscrole, setHscrole] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadingList = new Array(data.length).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct.categoryWPro);
  };

  const hScroleNext = () => {
    if (data.length - 3 > hscrole) {
      setHscrole((prev) => prev + 1);
    }
  };

  const hScrolePrev = () => {
    if (hscrole !== 0) {
      setHscrole((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 relative h-[244px]">
        <h2 className="text-2xl font-semibold py-3">{hading}</h2>
        {loading ? (
          loadingList.map((value, index) => (
            <ContentLoader viewBox="0 0 380 70" key={index}>
              <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
              <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          ))
        ) : (
          <div>
            <div className="top-6 right-0 absolute md:block hidden">
              <button
                onClick={hScrolePrev}
                className="bg-cyan-500 text-white py-2 mt-5 me-3 px-2 text-sm  rounded-full"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={hScroleNext}
                className="bg-cyan-500 text-white py-2 mt-5 px-2 text-sm  rounded-full"
              >
                <FaAngleRight />
              </button>
            </div>
            <div className="overflow-x-scroll gap-6 scroollbar-none ">
              <div
                className="w-full h-full flex transition-all gap-2 duration-1000"
                style={{ transform: `translateX(-${hscrole * 25}%)` }}
              >
                {data.map((value, index) => (
                  <div
                    key={index}
                    className="w-full min-w-[280px]  md:min-w-[305px] mt-3 max-w-[280px] md:max-w-[305px] bg-white rounded-sm shadow-lg h-36 flex"
                  >
                    <Link
                      to={`/single-product/${value?._id}`}
                      className="bg-slate-200 p-4 flex justify-center items-center"
                    >
                      <img
                        className="w-24 h-24 hover:scale-110 transition-all mix-blend-multiply"
                        src={value?.productImage[0]}
                        alt={value?.productName}
                        style={{ aspectRatio: "3/2", objectFit: "contain" }}
                      />
                    </Link>

                    <div className="py-4 px-3">
                      <h2 className="text-sm font-medium text-cyan-500 text-ellipsis line-clamp-1">
                        {value?.productName}
                      </h2>
                      <p className="capitalize text-sm  text-slate-500">
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
                          onClick={async() => {
                           await addCartProduct(value?._id);
                            fetchUserAddToCart()
                          }}
                          className="bg-cyan-500 me-2 text-white py-0.5 mt-5 md:px-3 text-xs px-2 md:text-sm  rounded-full"
                        >
                          Add Cart
                        </button>
                        <Link to={`/single-product/${value?._id}`}>
                          <button className="bg-lime-500 text-white py-0.5 md:px-3 text-xs px-2 md:text-sm  rounded-full">
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

export default HorizontalCardProduct;
