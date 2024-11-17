import React, { useEffect, useState } from "react";
import summaryApi from "../../../Common/BackendApi";
import { toast } from "react-toastify";
import movemet from "moment";
import { FaRegEdit } from "react-icons/fa";
import ChangeUserRole from "./ChangeUserRole";
import Role from "../../../Common/Role";

function AllUsers() {
  const [allUser, serAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [userRole, setUserRole] = useState();

  async function fetchUsers() {
    try {
      await fetch(summaryApi.allusers.url, {
        method: summaryApi.allusers.method,
        credentials: "include"
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            serAllUser(res.allUser);
          }
          if (res.error) {
            toast.error(res.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  async function roleChangeHandle(id) {
    setOpenUpdateRole(true);
    await fetch(summaryApi.roleuser.url + "/" + id, {
      method: summaryApi.roleuser.method,
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        setUserRole(res);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
   <div className="md:px-0 px-3 overflow-hidden md:py-0 py-5">
   <div className="w-full overflow-x-scroll">
        <div className="bg-white pb-4 w-[900px]  lg:w-full overflow-hidden ">
          <table className="w-full   user-table ">
            <thead>
              <tr className="bg-cyan-500 text-white">
                <th>Sr.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((value, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      className="w-7 h-7 rounded-full overflow-hidden mx-auto"
                      src={value?.profimg}
                      alt={value?.name}
                    />
                  </td>
                  <td>{value?.name}</td>
                  <td>{value?.email}</td>
                  <td>{value?.role}</td>
                  <td>{movemet(value?.createdAt).format("LL")}</td>
                  <td>
                    <button
                      onClick={() => {
                        roleChangeHandle(value?._id);
                      }}
                      className="text-cyan-500 hover:bg-cyan-500 hover:text-white py-2 h-7 rounded-full w-7"
                    >
                      <div className="w-full h-full flex justify-center items-center">
                        <FaRegEdit />
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {openUpdateRole && (
            <ChangeUserRole
              callFunc={fetchUsers}
              onClose={() => setOpenUpdateRole(false)}
              value={userRole}
            />
          )}
        </div>
      </div>
   </div>
    </>
  );
}

export default AllUsers;
