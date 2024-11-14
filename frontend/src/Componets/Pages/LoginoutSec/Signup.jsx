import React, { useState } from "react";
import loginIcon from "../../../assest/signin.gif";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../../../Helpers/ImageTobase64";
import summaryApi from "../../../Common/BackendApi";
import { toast } from "react-toastify";

function Signup() {
  const navig = useNavigate();
  const [showPass, setShowPass] = useState("password");
  const [cShowPass, setCshowPass] = useState("password");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: "",
    profimg: ""
  });

  const handleSignInput = (e) => {
    const { name, value } = e.target;

    setSignupData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  async function handleSignup(e) {
    e.preventDefault();

    if (signupData.password === signupData.conpassword) {
      await fetch(`${summaryApi.signUP.url}`, {
        method: summaryApi.signUP.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            toast.success(res.message);
            navig("/login");
          }
        })
        .catch((error) => {
          if (error.success) {
            toast.error(error.message);
          }
        });
    } else {
      toast.error("Please check password and confirm password ");
    }
  }

  const handleUploadPic = async (e) => {
    const upImg = e.target.files[0];

    const imagePic = await imageTobase64(upImg);

    setSignupData((prev) => {
      return {
        ...prev,
        profimg: imagePic
      };
    });
  };

  function showHidePass() {
    showPass === "password" ? setShowPass("text") : setShowPass("password");
  }

  function cShowHidePass() {
    cShowPass === "password" ? setCshowPass("text") : setCshowPass("password");
  }

  return (
    <>
      <section id="signup">
        <div className="mx-auto container p-4">
          <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto rounded-md shadow-sm">
            <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full">
              <div>
                <img src={signupData.profimg || loginIcon} alt="login_icon" />
              </div>
              <form>
                <label>
                  <div className="text-[10px] bg-opacity-90 cursor-pointer  bg-slate-200 pt-1 pb-4 text-center absolute bottom-0 w-full">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadPic}
                  />
                </label>
              </form>
            </div>

            <form className="pt-6 " onSubmit={handleSignup}>
              <div className="grid mt-3">
                <label>Name:</label>
                <div className="bg-slate-100 p-2 rounded-md ">
                  <input
                    type="text"
                    placeholder="enter your name"
                    className="w-full h-full outline-none bg-transparent"
                    onChange={handleSignInput}
                    name="name"
                    value={signupData.name}
                    required
                  />
                </div>
              </div>
              <div className="grid mt-3">
                <label>Email:</label>
                <div className="bg-slate-100 p-2 rounded-md ">
                  <input
                    type="email"
                    placeholder="enter your email"
                    className="w-full h-full outline-none bg-transparent"
                    onChange={handleSignInput}
                    name="email"
                    value={signupData.email}
                    required
                  />
                </div>
              </div>

              <div className="grid mt-3">
                <label>Password:</label>
                <div className="bg-slate-100 p-2 rounded-md flex items-center ">
                  <input
                    type={`${showPass}`}
                    placeholder="Enter password"
                    className="w-full h-full outline-none bg-transparent"
                    onChange={handleSignInput}
                    name="password"
                    value={signupData.password}
                    required
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
              </div>
              <div className="grid mt-3">
                <label>Confirm Password:</label>
                <div className="bg-slate-100 p-2 rounded-md flex items-center ">
                  <input
                    type={`${cShowPass}`}
                    placeholder="Re enter password"
                    className="w-full h-full outline-none bg-transparent"
                    onChange={handleSignInput}
                    name="conpassword"
                    value={signupData.conpassword}
                    required
                  />
                  <div className="cursor-pointer" onClick={cShowHidePass}>
                    <span>
                      {cShowPass === "password" ? (
                        <FaRegEye />
                      ) : (
                        <FaRegEyeSlash />
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all
              mx-auto block mt-6"
              >
                Signup
              </button>
            </form>
            <p className="my-5 ">
              Already have accout ?
              <Link
                className="hover:text-cyan-500 hover:underline ms-3"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
