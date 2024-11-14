import React, { useEffect, useState } from "react";
import img1 from "../../../../assest/banner/img1.webp";
import img1M from "../../../../assest/banner/img1_mobile.jpg";
import img2 from "../../../../assest/banner/img2.webp";
import img2M from "../../../../assest/banner/img2_mobile.webp";
import img3 from "../../../../assest/banner/img3.jpg";
import img3M from "../../../../assest/banner/img4_mobile.jpg";
import img4 from "../../../../assest/banner/img4.jpg";
import img4M from "../../../../assest/banner/img4_mobile.jpg";
import img5 from "../../../../assest/banner/img5.webp";
import img5M from "../../../../assest/banner/img5_mobile.png";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

function SlidingBannerProduct() {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [img1, img2, img3, img4, img5];
  const mobileImages = [img1M, img2M, img3M, img4M, img5M];

  function nextImage() {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  }

  function preveImage() {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  }

  useEffect(() => {
    const intervel = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 4000);

    return () => clearInterval(intervel);
  }, [currentImage]);

  return (
    <>
      <div className="container mx-auto p-4  rounded-md overflow-x-scroll scroollbar-none">
        <div className="w-full bg-slate-200 h-auto md:h-72 relative flex items-center overflow-hidden">
          {/* desktop img */}

          <div className=" w-full h-full relative hidden md:flex">
            {desktopImages.map((img, index) => (
              <div
                className="w-full h-full min-w-full min-h-full transition-all duration-1000"
                key={index}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={img} className="w-full h-full" alt="" />
              </div>
            ))}
          </div>

          {/* desktop img */}

          {/* Mobile img */}

          <div className="flex w-full h-full relative md:hidden ">
            {mobileImages.map((img, index) => (
              <div
                className="w-full h-full min-w-full min-h-full transition-all duration-1000"
                key={index}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={img}
                  className="w-full"
                  alt=""
                  style={{ objectFit: "cover", aspectRatio: "3/2" }}
                />
              </div>
            ))}
          </div>

          {/* Mobile img */}

          <div className="absolute  justify-between w-full hidden md:flex">
            <button
              className="bg-cyan-500 text-white py-4 px-4 text-2xl"
              onClick={preveImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-cyan-500 text-white py-4 px-4 text-2xl"
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SlidingBannerProduct;
