import React, { useEffect, useState } from "react";
import Role from "../../../Common/Role";
import { IoMdClose } from "react-icons/io";
import summaryApi from "../../../Common/BackendApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ChangeUserRole({ value, onClose, callFunc }) {
  const navig = useNavigate();
  const uid = value?.data._id;

  const [roleInput, setRoleInput] = useState({
    name: "",
    email: "",
    role: ""
  });

  async function handleRoleChange(e) {
    e.preventDefault();

    await fetch(summaryApi.roleuserupdated.url + "/" + uid, {
      method: summaryApi.roleuserupdated.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roleInput)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          onClose();
          callFunc();
        }
      
      });
  }

  const handleRoleInput = (e) => {
    const { value, name } = e.target;

    setRoleInput((preve) => {
      return {
        ...preve,
        [name]: value
      };
    });
  };

  useEffect(() => {
    if (value?.data) {
      const { name, email, role } = value?.data;
      setRoleInput({ name, email, role });
    }
  }, [value]);

  return (
    <>
      <div className="fixed w-full h-full z-10 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-800 bg-opacity-80">
        <div className=" mx-auto bg-white shadow-lg border-t-8 rounded-lg border-cyan-500 px-4 pt-2 pb-5 w-full max-w-sm">
          <button className="block ms-auto" onClick={onClose}>
            <IoMdClose />
          </button>
          <h1 className="pb-3 text-lg font-medium">
            User Update & Change Role
          </h1>

          <form onSubmit={handleRoleChange}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2 rounded-md ">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full h-full outline-none bg-transparent"
                  name="name"
                  value={roleInput.name}
                  onChange={handleRoleInput}
                />
              </div>
            </div>
            <div className="grid mt-3">
              <label>Email:</label>
              <div className="bg-slate-100 p-2 rounded-md ">
                <input
                  type="email"
                  placeholder=" Email"
                  className="w-full h-full outline-none bg-transparent"
                  name="email"
                  value={roleInput.email}
                  onChange={handleRoleInput}
                />
              </div>
            </div>

            <p className="mt-4">
              <span className="font-medium">Role:</span>
              <span className="ms-4">
                <select
                  onChange={handleRoleInput}
                  name="role"
                  value={roleInput.role}
                  className="border px-4  "
                >
                  {Object.values(Role).map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </span>
            </p>
            <button
              type="submit"
              className="mx-auto w-fit block border p-1 rounded-full mt-5 px-3 bg-cyan-500 text-white hover:bg-cyan-600"
            >
              Change Role
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangeUserRole;
