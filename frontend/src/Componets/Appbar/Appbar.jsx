import React, { useContext, useState } from "react";
import Logo from "../Logo/Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../../Common/BackendApi";
import { toast } from "react-toastify";
import { setUserInfo } from "../../features/userSlice/userSlice";
import Role from "../../Common/Role";
import Context from "../../Common/context";

function Appbar() {
  const navig = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const userInfo = useSelector((state) => state?.userInfo?.user);
  const dispatch = useDispatch();
  const { cartProduct } = useContext(Context);

  const handleLogout = async () => {
    fetch(summaryApi.userlogout.url, {
      method: summaryApi.userlogout.method,
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          dispatch(setUserInfo(null));
          navig("/");
        }
      })
      .catch((error) => {
        if (error.error) {
          toast.success(error.message);
        }
      });
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value) {
      navig(`/search?q=${value}`);
    } else {
      navig("/search");
    }
  };

  return (
    <>
      <header className="h-16 shadow-md bg-white fixed w-full z-40">
        <div className="h-full flex items-center px-4 container mx-auto justify-between">
          <div>
            <Link to={"/"}>
              <Logo w={80} h={80} />
            </Link>
          </div>
          <div className="hidden  lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow ps-3">
            <input
              type="text"
              placeholder="Search product here..."
              className="w-full outline-none  "
              onChange={handleSearch}
            />
            <div className="text-lg  min-w-[50px] flex items-center text-white justify-center rounded-r-3xl h-8 bg-cyan-500">
              <GrSearch />
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="relative  flex justify-center">
              {userInfo?._id && (
                <div
                  className="text-xxl cursor-pointer"
                  onClick={() => {
                    setMenuDisplay((preve) => !preve);
                  }}
                >
                  {userInfo?.profimg ? (
                    <img
                      className="w-10 h-10 rounded-full overflow-hidden"
                      src={userInfo.profimg}
                      alt="Profile"
                    />
                  ) : (
                    <FaRegCircleUser aria-label="User icon" />
                  )}
                </div>
              )}

              {menuDisplay && (
                <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg  rounded-lg md:block  ">
                  <nav>
                    {userInfo?.role === Role.ADMIN && (
                      <Link
                        to="admin-panel/all-products"
                        className="whitespace-nowrap hover:bg-slate-100 p-2"
                        onClick={() => {
                          setMenuDisplay((preve) => !preve);
                        }}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>

            {userInfo?._id && (
              <Link to={"/cart"} className="text-xl cursor-pointer relative">
                <span>
                  <FaCartShopping />
                </span>
                <div className="bg-red-500 w-4 h-4 rounded-full flex justify-center items-center text-center text-white absolute -top-2 -right-3">
                  <p className="text-[10px] font-bold">{cartProduct}</p>
                </div>
              </Link>
            )}

            <div className="ms-4">
              {userInfo?._id ? (
                <button
                  onClick={handleLogout}
                  className="px-3 bg-cyan-500 py-1 rounded-full hover:bg-cyan-600 text-white"
                >
                  Logout
                </button>
              ) : (
                <Link to={"/login"}>
                  <button className="px-3 bg-cyan-500 py-1 rounded-full hover:bg-cyan-600 text-white">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Appbar;
