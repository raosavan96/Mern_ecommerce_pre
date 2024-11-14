import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../../../Common/productCategrory";
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayProduct from "./DisplayProduct";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import summaryApi from "./../../../Common/BackendApi";
import uploadImage from "../../../Helpers/uploadImage";

function AdminEditProduct({ onClose, editData }) {
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: ""
  });

  const editProId = editData._id;

  const [openProductUrl, setOpenProductUrl] = useState("");

  const [openDisplayProduct, setOpenDisplayProduct] = useState(false);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setProductData((preve) => {
      return {
        ...preve,
        [name]: value
      };
    });
  }

  async function handleUpdateProductMain(e) {
    e.preventDefault();

    fetch(summaryApi.adminUpdatedProduct.url + "/" + editProId, {
      method: summaryApi.adminUpdatedProduct.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          onClose();
        }
      });
  }

  function deleteUpdateImage(id) {
    const updateProDelete = [...productData.productImage];
    updateProDelete.splice(id, 1);

    setProductData((preve) => {
      return {
        ...preve,
        productImage: updateProDelete
      };
    });
  }

  async function handleUpdateProduct(e) {
    const imageUpdate = e.target.files[0];

    const imageUpdateUpload = await uploadImage(imageUpdate);

    setProductData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, imageUpdateUpload.url]
      };
    });
  }

  useEffect(() => {
    if (editData) {
      const {
        productName,
        brandName,
        category,
        productImage,
        description,
        price,
        selling
      } = editData;

      setProductData({
        productName,
        brandName,
        category,
        productImage,
        description,
        price,
        selling
      });
    }
  }, [editData]);

  return (
    <>
      <div className=" w-full h-full fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-slate-800 bg-opacity-80">
        <div className="bg-white  rounded-lg w-full max-w-xl h-full max-h-[80%] relative">
          <div className="w-full h-full relative z-0">
            <div className="w-full h-full overflow-auto pt-2 px-4 pb-5">
              <button
                className="block ms-auto absolute -right-4 -top-4 p-2  bg-cyan-500 rounded-full"
                onClick={onClose}
              >
                <IoMdClose className="text-2xl text-white" />
              </button>
              <h1 className="pb-3 text-lg font-medium">Update Product</h1>
              <div>
                <form className="pb-5" onSubmit={handleUpdateProductMain}>
                  <div className="grid mt-3">
                    <label>Product Name</label>
                    <div className="bg-slate-200 p-2 rounded-md ">
                      <input
                        type="text"
                        placeholder="enter product name"
                        className="w-full h-full outline-none bg-transparent"
                        name="productName"
                        value={productData.productName}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid mt-3">
                    <label>Brand Name</label>
                    <div className="bg-slate-200 p-2 rounded-md ">
                      <input
                        type="text"
                        placeholder="enter brand name"
                        className="w-full h-full outline-none bg-transparent"
                        name="brandName"
                        value={productData.brandName}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid mt-3">
                    <label>Category:</label>

                    <select
                      name="category"
                      value={productData.category}
                      className="bg-slate-200 p-2 rounded-md"
                      onChange={handleOnChange}
                      required
                    >
                      <option className="text-red-400">Select</option>
                      {productCategory.map((value, index) => (
                        <option
                          value={value.value}
                          key={value.value + index}
                          className="bg-white text-sm"
                        >
                          {value.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid mt-3">
                    <label>Price:</label>
                    <div className="bg-slate-200 p-2 rounded-md ">
                      <input
                        type="number"
                        placeholder="price"
                        className="w-full h-full outline-none bg-transparent"
                        name="price"
                        value={productData.price}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid mt-3">
                    <label>Selling price:</label>
                    <div className="bg-slate-200 p-2 rounded-md ">
                      <input
                        type="number"
                        placeholder="selling"
                        className="w-full h-full outline-none bg-transparent"
                        name="selling"
                        value={productData.selling}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid mt-3">
                    <label>Description:</label>
                    <div className="bg-slate-200 p-2 rounded-md ">
                      <textarea
                        type="textaria"
                        placeholder="description"
                        className="w-full h-full outline-none bg-transparent"
                        name="description"
                        value={productData.description}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid mt-3">
                    <label>Images:</label>
                    <div className="bg-slate-200 h-32  rounded-md">
                      <label
                        htmlFor="uploadImageInput"
                        className="w-full h-full cursor-pointer flex justify-center items-center"
                      >
                        <div className="text-slate-500">
                          <div className="text-4xl ">
                            <FaCloudUploadAlt className="mx-auto" />
                          </div>
                          <p className="text-sm text-center">
                            Upload Product Image
                          </p>
                          <input
                            type="file"
                            id="uploadImageInput"
                            className="hidden"
                            onChange={handleUpdateProduct}
                            
                          />
                        </div>
                      </label>
                    </div>
                    <div className="mt-5 flex gap-1 flex-wrap">
                      {productData?.productImage[0] ? (
                        productData.productImage.map((value, index) => (
                          <div className="w-16 h-16 cursor-pointer group  relative">
                            <img
                              src={value}
                              style={{ aspectRatio: "3/2", objectFit: "cover" }}
                              className="bg-slate-200 w-full h-full relative z-0"
                              alt=""
                              onClick={() => {
                                setOpenDisplayProduct(true);
                                setOpenProductUrl(value);
                              }}
                            />
                            <div
                              className="absolute bottom-0 right-0  cursor-pointer z-50 hidden  group-hover:block "
                              onClick={() => {
                                deleteUpdateImage(index);
                              }}
                            >
                              <MdDelete className="text-white p-1 text-xs bg-[red] h-5 w-5  " />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-red-500 text-xs">
                          *Please uploade products image
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="bg-cyan-500 text-white rounded-full w-full py-2 mt-5 mb-5 hover:bg-cyan-600"
                      >
                        Upload Product
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div>
          {openDisplayProduct && (
            <DisplayProduct
              onClose={() => {
                setOpenDisplayProduct(false);
              }}
              imgUrl={openProductUrl}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminEditProduct;
