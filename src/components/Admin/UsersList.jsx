import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Utils/Config";

export default function UsersList() {
  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/userList/`);
   
      setUserList(response.data); 
      console.log(response.data,'usersssssssssss')
       
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/user/delete/${userId}/`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      console.log("blockkk");
      await axios.put(`${BASE_URL}/user/block/${userId}/`);
      fetchUsers();
    
    } catch (error) {
      console.log(error);
    }
  };

  const  handleUnblockUser= async (userId) => {
    try {
      console.log("unblockkk");
      await axios.put(`${BASE_URL}/user/unblock/${userId}/`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
      <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
        <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
          Users List
        </div>
        <div className="p-3">
          <table className="table-responsive w-full rounded">
            <thead>
              <tr>
                <th className="border w-1/6 px-4 py-2">Username</th>
                <th className="border w-1/6 px-4 py-2">Email</th>
                <th className="border w-1/6 px-4 py-2">Mobile</th>
                <th className="border w-1/6 px-4 py-2">Address</th>
                <th className="border w-1/6 px-4 py-2">Block/Unblock</th>
                {/* <th className="border w-1/6 px-4 py-2">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.mobile}</td>
                  <td className="border px-4 py-2">{user.id}</td>

                  <td className="border px-4 py-2">
                    {user.is_active ? (
                      <button
                        className="bg-blue-500 cursor-pointer rounded p-1 mx-1 text-white"
                        onClick={() => handleBlockUser(user.id)}
                      >
                      Block
                      </button>
                    ) : (
                      <button
                        className="bg-yellow-500 cursor-pointer rounded p-1 mx-1 text-white"
                        onClick={() => handleUnblockUser(user.id)}
                      >
                          Un Block
                      </button>
                    )}
                  </td>
                  {/* <td className="border px-4 py-2">
                    <Link
                      to={`/editUser/${user.id}`}
                      className="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-white"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="bg-red-500 cursor-pointer rounded p-1 mx-1 text-white"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
