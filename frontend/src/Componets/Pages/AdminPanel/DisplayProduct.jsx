import React from "react";
import { IoMdClose } from "react-icons/io";

function DisplayProduct({ imgUrl, onClose }) {
  return (
    <>
      <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-slate-900 bg-opacity-70 z-30s" >
        <div
          className=" w-[600px]  h-[600px] bg-white rounded-lg shadow-2xl relative"
          style={{ objectFit: "contain", aspectRatio: "3/2" }}
        >
          <button
            className=" ms-auto absolute  -right-4 -top-4 p-2  bg-cyan-500 rounded-full"
            onClick={onClose}
          >
            <IoMdClose className="text-2xl text-white" />
          </button>
          <img src={imgUrl} className="w-full h-full" />
        </div>
      </div>
    </>
  );
}

export default DisplayProduct;
