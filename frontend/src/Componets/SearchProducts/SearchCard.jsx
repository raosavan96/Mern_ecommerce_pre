import React, { useContext } from "react";
import { Link } from "react-router-dom";
import scrollTop from "../../Helpers/scrolltop";
import displayINRcurrency from "../../Helpers/displayCurrency";
import addCartProduct from "../../Helpers/addToCart";
import Context from "../../Common/context";

function SearchCard({ value }) {

  const { fetchUserAddToCart } = useContext(Context);

  return (
    <>
      <div className="col-span-4 sm:col-span-2 w-full md:col-span-1 mb-4 bg-white rounded-sm shadow-lg h-[350px] mx-auto">
        <Link to={`/single-product/${value?._id}`} onClick={scrollTop}>
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
          <p className="capitalize text-sm text-slate-500">{value?.category}</p>
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
            <Link to={`/single-product/${value?._id}`} onClick={scrollTop}>
              <button className="bg-lime-500 text-white py-1.5 mt-5 px-5 text-sm rounded-full">
                More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchCard;
