import { Link, useParams } from "react-router-dom";
import VerticalCardProduct from "../CardProduct/VerticalCardProduct";

function CategoryProduct() {
  const { categoryName } = useParams();

  return (
    <>
      <div className="mx-auto container relative">
        <div className="top-4  right-2 absolute z-10">
          <Link to={"/filter"}>
            <button className=" bg-cyan-500 py-2 px-4 rounded-full text-white font-medium">
              Filter
            </button>
          </Link>
        </div>
        <div className=" relative">
          {categoryName && (
            <VerticalCardProduct
              hading={categoryName}
              category={categoryName}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryProduct;
