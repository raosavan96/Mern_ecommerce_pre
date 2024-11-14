import React from "react";
import CategoryList from "./CategoryList/CategoryList";
import SlidingBannerProduct from "./Sliding/SlidingBannerProduct";
import HorizontalCardProduct from "./CardProduct/HorizontalCardProduct";
import VerticalCardProduct from "./CardProduct/VerticalCardProduct";

function Home() {
  return (
    <>
      <div>
        <div>
          <CategoryList />
        </div>
        <div>
          <SlidingBannerProduct />
        </div>
        <div>
          <HorizontalCardProduct
            hading={"Top's EarPhones"}
            category={"earphones"}
          />
        </div>
        <div>
          <HorizontalCardProduct
            hading={"Top's Airpodes"}
            category={"airpodes"}
          />
        </div>
        <div>
          <HorizontalCardProduct
            hading={"Top's Processor"}
            category={"processor"}
          />
        </div>

        <div>
          <VerticalCardProduct hading={"Top's Mouse"} category={"mouse"} />
        </div>

        <div>
          <VerticalCardProduct
            hading={"Top's Printers"}
            category={"printers"}
          />
        </div>
        <div>
          <VerticalCardProduct hading={"Top's Speakers"} category={"speakers"} />
        </div>

        <div>
          <VerticalCardProduct hading={"Top's Cemera"} category={"cemera"} />
        </div>
      </div>
    </>
  );
}

export default Home;
