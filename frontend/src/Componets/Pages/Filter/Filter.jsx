import React, { useEffect, useState } from "react";
import productCategory from "../../../Common/productCategrory";
import summaryApi from "../../../Common/BackendApi";
import { toast } from "react-toastify";
import SearchCard from "../../SearchProducts/SearchCard";

function Filter() {
  const [data, setData] = useState([]);
  const [selectCategoryName, setSelectCategoryName] = useState({});
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const selectCategory = (e) => {
    const { checked, name } = e.target;

    setSelectCategoryName((preve) => {
      return {
        ...preve,
        [name]: checked
      };
    });
  };

  const fecthData = async () => {
    const respons = await fetch(summaryApi.filterProducts.url, {
      method: summaryApi.filterProducts.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: filterCategoryList
      })
    });
    const dataRespons = await respons.json();
    setData(dataRespons?.filter || []);
  };

  useEffect(() => {
    fecthData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategoryName)
      .map((value) => {
        if (selectCategoryName[value]) {
          return value;
        }
        return null;
      })
      .filter((value) => value);
    setFilterCategoryList(arrayOfCategory);
  }, [selectCategoryName]);

  const handleSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.selling - b.selling));
    }
    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.selling - a.selling));
    }
  };

  useEffect(() => {}, [sortBy]);

  return (
    <>
      <div className="mx-auto">
        <div className="grid grid-cols-12 h-screen overflow-hidden">
          <div className=" col-span-3 md:col-span-2 bg-white shadow-md py-3 px-1 md:px-3 h-full">
            <div>
              <h2 className="text-slate-500 text-sm md:text-base border-b pb-2 border-slate-300 font-medium">
                SORT BY
              </h2>
              <form>
                <div className="flex items-center gap-1 md:gap-3 m-2">
                  <input
                    type="radio"
                    checked={sortBy === "asc"}
                    name="sort"
                    value={"asc"}
                    onChange={handleSortBy}
                  />
                  <label className="text-[9px] md:text-xs lg:text-sm">
                    Price Low to High
                  </label>
                </div>
                <div className="flex items-center gap-1 md:gap-3 m-2">
                  <input
                    type="radio"
                    checked={sortBy === "dsc"}
                    name="sort"
                    value={"dsc"}
                    onChange={handleSortBy}
                  />
                  <label className="text-[9px] md:text-xs lg:text-sm">
                    Price High to Low
                  </label>
                </div>
              </form>
            </div>

            <div className="mt-4 h-full">
              <h2 className="text-slate-500 text-sm md:text-base  border-b pb-2 border-slate-300 font-medium">
                Category
              </h2>

              <form className="h-[calc(100vh-165px)] overflow-y-scroll ">
                {productCategory.map((value, index) => (
                  <div className="flex items-center gap-1 md:gap-3 m-2" key={index}>
                    <input
                      type="checkbox"
                      name={value?.value}
                      id={value?.value}
                      onChange={selectCategory}
                    />
                    <label
                      htmlFor={value?.value}
                      className="text-[9px] md:text-xs lg:text-sm"
                    >
                      {value?.label}
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </div>
          <div className="col-span-9 md:col-span-10 w-full h-[calc(100vh-70px)] overflow-y-scroll ">
            <div className="pt-4 px-3">
              <p className="font-medium text-slate-600 text-lg">
                Serach Results: {data.length}
              </p>
              <div className="grid grid-cols-12 gap-3">
                {data.map((value, index) => (
                  <SearchCard value={value} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
