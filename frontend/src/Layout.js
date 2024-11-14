import React, { useEffect } from "react";
import Appbar from "./Componets/Appbar/Appbar";
import Footer from "./Componets/Footer/Footer";
import { Outlet } from "react-router-dom";
import summaryApi from "./Common/BackendApi";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./features/userSlice/userSlice";
import Context from "./Common/context";

function Layout() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    await fetch(summaryApi.currentUser.url, {
      method: summaryApi.currentUser.method,
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          dispatch(setUserInfo(res.data));
        }
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <div className="">
          <Appbar />
          <main className="min-h-[calc(100vh-100px)] pt-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </Context.Provider>
    </>
  );
}

export default Layout;
