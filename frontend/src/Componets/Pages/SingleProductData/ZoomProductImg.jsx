import React, { useState } from "react";


function ZoomProductImg({ zoomImg, imgZoom }) {
  return (
    <>
      <div
        className="w-full h-full bg-white shadow-md mix-blend-multiply scale-[100%] "
        style={{
          backgroundImage: `url(${zoomImg})`,
        
        
          backgroundRepeat: "no-repeat",
          backgroundPosition: `${imgZoom.x * -300}% ${imgZoom.y * 130}%`
        }}
      ></div>
    </>
  );
}

export default ZoomProductImg;
