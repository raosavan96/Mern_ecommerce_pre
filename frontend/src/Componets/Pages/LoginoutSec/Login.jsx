import React, { useContext, useState } from "react";
import loginIcon from "../../../assest/signin.gif";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../../../Common/BackendApi";
import { toast } from "react-toastify";
import Context from "../../../Common/context";

function Login() {
  const navig = useNavigate();
  const { fetchUserDetails } = useContext(Context);
  const [showPass, setShowPass] = useState("password");
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    setLoginData((preve) => {
      return {
        ...preve,
        [name]: value
      };
    });
  };

  async function handleLogin(e) {
    e.preventDefault();

    await fetch(`${summaryApi.logIN.url}`, {
      method: summaryApi.logIN.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          navig("/");
          fetchUserDetails();
        }
        if (res.success === false) {
          toast.error(res.message);
        }
      });
  }

  function showHidePass() {
    showPass === "password" ? setShowPass("text") : setShowPass("password");
  }

  return (
    <>
      <section id="login">
        <div className="mx-auto container p-4">
          <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto rounded-md shadow-sm">
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
              <img src={loginIcon} alt="login_icon" />
            </div>
            <form className="pt-6 " onSubmit={handleLogin}>
              <div className="grid mt-3">
                <label>Email:</label>
                <div className="bg-slate-100 p-2 rounded-md ">
                  <input
                    type="email"
                    placeholder="enter email"
                    className="w-full h-full outline-none bg-transparent"
                    name="email"
                    value={loginData.email}
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="grid mt-3">
                <label>Password:</label>
                <div className="bg-slate-100 p-2 rounded-md flex items-center ">
                  <input
                    type={`${showPass}`}
                    placeholder="enter password"
                    className="w-full h-full outline-none bg-transparent"
                    name="password"
                    value={loginData.password}
                    onChange={handleOnChange}
                  />
                  <div className="cursor-pointer" onClick={showHidePass}>
                    <span>
                      {showPass === "password" ? (
                        <FaRegEye />
                      ) : (
                        <FaRegEyeSlash />
                      )}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/forgot-password`}
                  className="block ms-auto hover:underline hover:text-cyan-500 text-sm mt-2"
                >
                  Forgot password ?
                </Link>
              </div>

              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all
              mx-auto block mt-6"
              >
                Login
              </button>
            </form>
            <p className="my-5 ">
              Don't have accout ?{" "}
              <Link
                className="hover:text-cyan-500 hover:underline ms-3"
                to="/sign-up"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
