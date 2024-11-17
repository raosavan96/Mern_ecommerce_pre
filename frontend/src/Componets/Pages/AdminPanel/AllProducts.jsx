import React, { useState } from "react";
import OpenUploadProduct from "./OpenUploadProduct";
import AllUploadProducts from "./AllUploadProducts";

function AllProducts() {
  const [openUploadBtn, setOpenUploadBtn] = useState(false);
  return (
    <>
      <div>
        <div className="bg-white py-2 items-center px-4 flex justify-between">
          <h2 className="font-bold text-sm md:text-lg">All Product</h2>
          <button
            className="border-2 py-1 border-cyan-500 text-cyan-500 md:text-sm text-xs px-3 rounded-full hover:bg-cyan-500 hover:text-white transition-all"
            onClick={() => {
              setOpenUploadBtn(true);
            }}
          >
            Upload Product
          </button>
        </div>

        <div>
          <AllUploadProducts />
        </div>

        {/* Upload product Components */}

        {openUploadBtn && (
          <OpenUploadProduct onClose={() => setOpenUploadBtn(false)} />
        )}
      </div>
    </>
  );
}

export default AllProducts;
