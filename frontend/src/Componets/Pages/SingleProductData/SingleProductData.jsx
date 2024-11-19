import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import summaryApi from "../../../Common/BackendApi";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRcurrency from "./../../../Helpers/displayCurrency";
import ZoomProductImg from "./ZoomProductImg";
import VerticalCardProduct from "../Home/CardProduct/VerticalCardProduct";
import Context from "../../../Common/context";
import addCartProduct from "../../../Helpers/addToCart";
function SingleProductData() {
  const navig = useNavigate();
  const { spId } = useParams();
  const { fetchUserAddToCart } = useContext(Context);
  const [imgZoom, setImgZoom] = useState({
    x: 0,
    y: 0
  });
  const [singlePro, setSinglePro] = useState();
  const [activeImg, setActiveImg] = useState();
  const [loading, setLoading] = useState(false);
  const [zoomImgA, setZoomImgA] = useState(false);

  const singleProLoading = new Array(4).fill(null);

  const getSingleProduct = async () => {
    const spIdd = { spId };
    setLoading(true);
    fetch(summaryApi.singleProductData.url, {
      method: summaryApi.singleProductData.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spIdd)
    })
      .then((res) => res.json())
      .then((res) => {
        setSinglePro(res.singlePeoduct);
        setActiveImg(res?.singlePeoduct.productImage[0]);
        setLoading(false);
      });
  };

  const handleZoomImg = useCallback(
    (e) => {
      setZoomImgA(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setImgZoom({
        x,
        y
      });
    },
    [imgZoom]
  );

  function imgOutImg() {
    setZoomImgA(false);
  }

  // function handleOutImgSet() {
  //   setActiveImg(singlePro?.productImage[0]);
  // }

  const handleMouseImgProduct = (imgUrl) => {
    setActiveImg(imgUrl);
  };

  useEffect(() => {
    getSingleProduct();
  }, [spId]);

  return (
    <>
      <Context.Provider value={{ getSingleProduct }}>
        <div className="container mx-auto p-4">
          <div className="min-h-[200px] mt-9">
            <div className="h-96">
              <div className="w-full h-full flex gap-4 items-center justify-center">
                {loading ? (
                  <>
                    <div className="flex gap-2 lg:flex-col overflow-scroll  scroollbar-none h-full ">
                      {singleProLoading.map((value, index) => (
                        <div
                          key={index}
                          className="h-20 w-20 bg-slate-200 rounded-sm animate-pulse"
                        ></div>
                      ))}
                    </div>
                    <div className="bg-slate-200 w-96 h-96 "></div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-12 w-full h-full">
                      <div className="xl:col-span-5  md:col-span-6 col-span-12 flex md:flex-row flex-col-reverse items-center  mx-auto gap-2">
                        <div className="md:h-96 md:w-20   overflow-scroll  scroollbar-none">
                          <div className="flex gap-2  md:flex-col ">
                            {singlePro?.productImage.map((value, index) => (
                              <div
                                className="md:h-20 md:w-20 w-10 h-10 bg-slate-200 rounded-sm"
                                key={index}
                              >
                                <img
                                  src={value}
                                  className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                                  // onMouseOut={handleOutImgSet}
                                  onMouseEnter={() =>
                                    handleMouseImgProduct(value)
                                  }
                                  onClick={() => handleMouseImgProduct(value)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-slate-200 xl:w-96 xl:h-96 lg:w-72 lg:h-72  md:w-60 md:h-60 rounded-md shadow">
                          <img
                            className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                            src={activeImg}
                            onMouseMove={handleZoomImg}
                            onMouseOut={imgOutImg}
                          />
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-6 xl:col-span-7  md:mt-0 mt-5 px-4 relative w-full h-full">
                        <div>
                          <p className="bg-red-200 text-red-600 px-2 inline-block rounded-full font-medium mb-3">
                            {singlePro?.brandName}
                          </p>
                          <h1 className="lg:text-3xl md:text-2xl text-xl xl:text-4xl font-medium">
                            {singlePro?.productName}
                          </h1>
                          <p className="text-sm text-slate-600 capitalize mt-2 ">
                            {singlePro?.category}
                          </p>
                          <div className="flex mt-2 gap-1 text-[gold] items-center">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalf />
                          </div>
                          <div className="flex items-center gap-3 mt-3">
                            <p className="text-red-600 text-3xl font-bold">
                              {displayINRcurrency(singlePro?.selling)}
                            </p>
                            <p className="text-slate-600 text-2xl line-through">
                              {displayINRcurrency(singlePro?.price)}
                            </p>
                          </div>
                          <div className="mt-3">
                            <p className="text-slate-600 text-sm">
                              {singlePro?.description}
                            </p>
                          </div>

                          <div className="w-full flex gap-5 px-5 mt-10">
                            <button
                              className="bg-cyan-500 py-2 rounded-full sm:text-base text-sm  font-medium  text-white w-1/2"
                              onClick={async () => {
                                await addCartProduct(singlePro?._id);
                                fetchUserAddToCart();
                              }}
                            >
                              Add Cart
                            </button>
                            <button
                              className="bg-lime-500 text-white sm:text-base text-sm  w-1/2 font-medium py-2 rounded-full"
                              onClick={async () => {
                                await addCartProduct(singlePro?._id);
                                fetchUserAddToCart();
                                navig("/cart");
                              }}
                            >
                              Buy
                            </button>
                          </div>
                        </div>

                        {/* zoom product image */}
                        {zoomImgA && (
                          <div className="absolute bg-white w-full h-full top-0 left-0 overflow-hidden hidden md:block">
                            <ZoomProductImg
                              zoomImg={activeImg}
                              imgZoom={imgZoom}
                              className="w-full h-full"
                            />
                          </div>
                        )}

                        {/* zoom product image */}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {singlePro?.category && (
            <div className="md:mt-5 mt-[400px] sm:mt-[600px]">
              <VerticalCardProduct
                hading={"Recommended Product"}
                efffun={singlePro}
                category={singlePro?.category}
              />
            </div>
          )}
        </div>
      </Context.Provider>
    </>
  );
}

export default SingleProductData;
