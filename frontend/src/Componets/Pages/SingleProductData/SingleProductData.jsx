import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../../../Common/BackendApi";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRcurrency from "./../../../Helpers/displayCurrency";
function SingleProductData() {
  const { spId } = useParams();

  const [singlePro, setSinglePro] = useState();
  const [activeImg, setActiveImg] = useState();
  const [loading, setLoading] = useState(false);
  const singleProLoading = new Array(4).fill(null);
  console.log(activeImg);
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
        setActiveImg(res?.siePengloduct.productImage[0]);
        setLoading(false);
      });
  };

  const handleMouseImgProduct = (imgUrl) => {
    setActiveImg(imgUrl);
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="min-h-[200px] mt-9">
          <div className="h-96">
            <div className="w-full h-full flex gap-4 items-center">
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
                  <div className="grid grid-cols-12">
                    <div className="md:col-span-5 col-span-12 flex md:flex-row flex-col-reverse  mx-auto gap-2">
                      <div className="md:h-96 md:w-20   overflow-scroll  scroollbar-none">
                        <div className="flex gap-2  md:flex-col ">
                          {singlePro?.productImage.map((value, index) => (
                            <div
                              className="h-20 w-20 bg-slate-200 rounded-sm"
                              key={index}
                            >
                              <img
                                src={value}
                                className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                                onMouseEnter={() =>
                                  handleMouseImgProduct(value)
                                }
                                onClick={() => handleMouseImgProduct(value)}
                                onMouseOut={()=>{setActiveImg(singlePro?.productImage?[0])}}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-200 w-96 h-96  rounded-md shadow">
                        <img
                          className="w-full h-full object-scale-down mix-blend-multiply"
                          src={activeImg}
                        />
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-7 px-4">
                      <div>
                        <p className="bg-red-200 text-red-600 px-2 inline-block rounded-full font-medium mb-3">
                          {singlePro?.brandName}
                        </p>
                        <h1 className="md:text-4xl font-medium">
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
                          <p className="text-slate-600 text-sm">{singlePro?.description}</p>
                        </div>

                        <div className="w-full flex gap-5 px-5 mt-10">
                          <button className="bg-cyan-500 py-2 rounded-full text-xl font-medium  text-white w-1/2">
                            Add Cart
                          </button>
                          <button className="bg-lime-500 text-white  w-1/2 text-xl font-medium py-2 rounded-full">
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProductData;
