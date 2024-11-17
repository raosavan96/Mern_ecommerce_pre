import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import summaryApi from "../../Common/BackendApi";
import SearchCard from "./SearchCard";

function Search() {
  const query = useLocation();

  const [searchProduct, setSearchProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    fetch(summaryApi.searchProduct.url + query?.search, {
      method: summaryApi.searchProduct.method
    })
      .then((res) => res.json())
      .then((res) => {
        setSearchProduct(res.searchPoducts);
        setLoading(false);
      });
  };

  console.log(searchProduct);

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <>
      <div className="container mx-auto p-4">
        {loading && <p className="text-center">Loading...</p>}

        {searchProduct.length === 0 && !loading && (
          <p className="text-center">No data found</p>
        )}

        {searchProduct.length !== 0 && !loading && (
          <>
            <p className="text-center">Search Result: {searchProduct.length}</p>
            <div className="grid grid-cols-4 gap-4 mt-5">
              {searchProduct.map((value, index) => (
                <SearchCard value={value} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Search;
