import React from "react";
import myLogo from "../../assest/logo.png";

function Logo({w,h}) {
  return (
    <>
      <img width={w} height={h} src={myLogo} alt="sawan" />
    </>
  );
}

export default Logo;
