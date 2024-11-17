import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Role from "../../../Common/Role";

function AdminPanel() {
  const userInfo = useSelector((state) => state?.userInfo?.user);
  const navig = useNavigate();

  useEffect(() => {
    if (userInfo?.role !== Role.ADMIN) {
      navig("/");
    }
  }, []);
  return (
    <>
      <div className="min-h-[calc(100vh-100px)]  w-full flex flex-col md:flex-row overflow-hidden ">
        <aside className="bg-white md:pt-0 pb-5 pt-5 min-h-full w-full md:w-64 costum_shadow">
          <div className="h-40 flex justify-center border-b-2 pb-5 md:py-0 items-center flex-col">
            <div className="text-5xl cursor-pointer">
              {userInfo && userInfo.profimg ? (
                <img
                  className="w-20 h-20 rounded-full overflow-hidden border border-cyan-500 shadow-xxl"
                  src={userInfo && userInfo.profimg}
                  alt="user image"
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            <p className="capitalize text-lg font-semibold text-cyan-500 mt-2">
              {userInfo?.name}
            </p>
            <p className="text-sm">{userInfo?.role}</p>
          </div>
          <div>
            <nav className="grid pt-5 md:p-4 md:text-start text-center">
              <Link to="all-users" className="px-2 py-1  hover:bg-slate-100">
                All Users
              </Link>
              <Link to="all-products" className="px-2 py-1  hover:bg-slate-100">
                All Products
              </Link>
            </nav>
          </div>
        </aside>
        <main className="w-full h-full md:p-2 pt-5 md:px-2">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminPanel;
