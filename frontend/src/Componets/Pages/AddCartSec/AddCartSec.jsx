import React, { useContext, useEffect, useState } from "react";
import summaryApi from "../../../Common/BackendApi";
import Context from "../../../Common/context";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineHorizontalRule } from "react-icons/md";
import displayINRcurrency from "./../../../Helpers/displayCurrency";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

function AddCartSec() {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartProduct, fetchUserAddToCart } = useContext(Context);
  const loadingCount = new Array(cartProduct).fill(null);

  const fetchCartData = async () => {
    setLoading(true);
    fetch(summaryApi.viewCartProduct.url, {
      method: summaryApi.viewCartProduct.method,
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        setCartData(res?.allCartProduct);
        setLoading(false);
      });
  };

  const incriQty = async (id, qty) => {
    await fetch(summaryApi.updateProductCard.url, {
      method: summaryApi.updateProductCard.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, quantity: qty + 1 })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          fetchCartData();
        }
        if (res.error) {
          toast.error(res.message);
        }
      });
  };

  const decriQty = async (id, qty) => {
    if (qty >= 2) {
      await fetch(summaryApi.updateProductCard.url, {
        method: summaryApi.updateProductCard.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, quantity: qty - 1 })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            toast.success(res.message);
            fetchCartData();
          }
          if (res.error) {
            toast.error(res.message);
          }
        });
    }
  };

  const deleteCartProduct = async (id) => {
    await fetch(summaryApi.deleteProductCart.url + "/" + id, {
      method: summaryApi.deleteProductCart.method,
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          fetchCartData();
          fetchUserAddToCart();
        }
        if (res.error) {
          toast.error(res.message);
        }
      });
  };

  const quantityTotle = cartData.reduce(
    (prev, curnt) => prev + curnt.quantity,
    0
  );

  const totlePrice = cartData.reduce(
    (prev, curnt) => prev + curnt.quantity * curnt?.productId?.selling,
    0
  );

  useEffect(() => {
    fetchCartData();
  }, []);

  console.log(cartData?.productId?.brandName);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="text-center">
          {cartData.length === 0 && !loading && <p>No data found...</p>}
        </div>
        <div className="grid grid-cols-12">
          <div className="w-full col-span-12 md:col-span-8">
            {loading ? (
              loadingCount.map((value, index) => (
                <div className="w-full bg-slate-200 h-24 mb-3  my-1 border border-slate-300 animate-pulse rounded-lg"></div>
              ))
            ) : (
              <div>
                {cartData.map((value, index) => (
                  <div
                    className="w-full flex bg-white h-28  mb-3  my-1 border shadow-  rounded-lg relative"
                    key={index}
                  >
                    <div className="md:w-28 w-24 h-28  bg-slate-200">
                      <div className="w-full h-full  flex justify-center items-center">
                        <img
                          src={value?.productId?.productImage[0]}
                          className="w-20 h-20 mix-blend-multiply"
                          style={{ aspectRatio: "3/2", objectFit: "contain" }}
                        />
                      </div>
                    </div>
                    <div className="py-2 md:px-4 px-2">
                      <h1 className="text-md md:text-md text-cyan-500 text-xs text-wrap font-bold">
                        {value?.productId?.productName}
                      </h1>
                      <p className="capitalize text-[11px] md:text-xs md:mb-2 text-slate-600">
                        {value?.productId?.category}
                      </p>

                      <p className="capitalize text-red-600 text-[11px] md:text-xs font-bold">
                        {displayINRcurrency(value?.productId?.selling)}
                      </p>

                      <div className="flex items-center gap-1 md:gap-3 mt-2">
                        <button
                          onClick={() => {
                            decriQty(value?._id, value?.quantity);
                          }}
                          className="w-4 md:w-5 h-4 md:h-5 flex justify-center text-cyan-500 font-bold items-center border border-cyan-500 p-1 active:bg-white active:text-cyan-500 rounded-full hover:bg-cyan-500 hover:text-white  "
                        >
                          <MdOutlineHorizontalRule className="text-xs " />
                        </button>
                        <p className="m-0 text-cyan-500 md:text-sm  text-[11px]">
                          {" "}
                          {value?.quantity}
                        </p>
                        <button
                          onClick={() => {
                            incriQty(value?._id, value?.quantity);
                          }}
                          className="w-4 md:w-5 h-4 md:h-5  flex justify-center items-center border border-cyan-500 p-1 active:bg-white active:text-cyan-500 rounded-full hover:bg-cyan-500 hover:text-white text-cyan-500"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                    </div>
                    <div className="h-full absolute flex justify-center items-center right-12 md:right-24">
                      <p className="capitalize text-cyan-500 text-xs sm:text-md md:text-md  font-bold">
                        {displayINRcurrency(
                          value?.productId?.selling * value?.quantity
                        )}
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        deleteCartProduct(value?._id);
                      }}
                      className="top-0 absolute right-0 w-8 md:w-16 bg-red-600 hover:bg-red-700 active:bg-red-400 cursor-pointer h-full flex justify-center items-center"
                    >
                      <button className="text-white text-md md:text-2xl">
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-12 md:col-span-4 md:ps-4 relative">
            {loading ? (
              <div className="w-full bg-slate-200 h-36 mb-3  my-1 border border-slate-300 animate-pulse rounded-lg"></div>
            ) : (
              <div className="w-full md:top-[70px] md:sticky right-0 bg-white h-48 mb-3  my-1 border shadow rounded-lg">
                <div className="px-5 py-2">
                  <h2 className="font-medium mb-3 text-slate-600">Summary</h2>

                  <div className="flex justify-between">
                    <p className="text-slate-500 text-sm">Quantity :</p>
                    <p className="text-cyan-500 text-sm">{quantityTotle}</p>
                  </div>

                  <div className="flex justify-between mt-2 ">
                    <p className="text-slate-500 text-sm  ">Totle price :</p>
                    <p className="text-red-500 text-md">
                      {displayINRcurrency(totlePrice)}
                    </p>
                  </div>

                  <div>
                    <button className="w-full bg-cyan-500 text-white rounded-xl py-2 mt-5 text-xl hover:bg-cyan-600 active:bg-cyan-400 font-bold">
                      Payment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCartSec;
