import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import summaryApi from "./../../../Common/BackendApi";
import { toast } from "react-toastify";
import displayINRcurrency from "../../../Helpers/displayCurrency";

function AdminProductCard({ products }) {
  const [openEditPro, setOpenEditPro] = useState(false);
  const [updateProData, setUpdateProData] = useState("");

  const updateProductData = async (id) => {
    await fetch(summaryApi.updateProductData.url + "/" + id, {
      method: summaryApi.updateProductData.method
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.dataProducts) {
          setUpdateProData(res.dataProducts);
        }
      });
  };

  const deleteProductAdmin = async (id) => {
    await fetch(summaryApi.deleteProductAdmin.url + "/" + id, {
      method: summaryApi.deleteProductAdmin.method,
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      });
  };

  return (
    <div className="pt-5">
      <div className="bg-white w-60 h-60 flex justify-center items-center flex-col shadow-lg relative">
        <img
          src={products.productImage[0]}
          alt={products.productName}
          style={{ objectFit: "contain", aspectRatio: "3/2" }}
        />
        <div className="bg-slate-200 w-full absolute bottom-0 py-2">
          <h2 className="text-cyan-500   font-bold text-center">
            {products.productImage[0] ? products.productName : ""}
          </h2>
          <p className="text-center text-xs text-slate-700 font-bold">
            {products.productImage[0] ? displayINRcurrency(products.price) : ""}
          </p>
        </div>

        <div
          onClick={() => {
            setOpenEditPro(true);
            updateProductData(products._id);
          }}
          className="top-0 absolute right-0 bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white py-2 px-2 cursor-pointer"
        >
          <FaEdit />
        </div>
        <div
          className="top-0 absolute right-10 bg-red-50 text-[red] hover:bg-[red] hover:text-white py-2 px-2 cursor-pointer"
          onClick={() => {
            deleteProductAdmin(products._id);
          }}
        >
          <MdDelete />
        </div>
      </div>

      {openEditPro && (
        <AdminEditProduct
          onClose={() => {
            setOpenEditPro(false);
          }}
          editData={updateProData}
        />
      )}
    </div>
  );
}

export default AdminProductCard;
