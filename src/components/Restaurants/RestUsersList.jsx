import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Pagination from '../Pagination';
import { BASE_URL } from "../../Utils/Config";



export default function RestUsersList() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);


  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const paginatedData = userList.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(userList.length / itemsPerPage);



  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  


  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/userList/`);
      const userListWithBlockedStatus = response.data.map(user => ({
        ...user,
        blocked: !user.is_active
      }));
      setUserList(response.data);
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
      
      await axios.put(`${BASE_URL}/user/block/${userId}/`);
      fetchUsers();
   
      setUserList((prevUserList) =>
       prevUserList.map((user) => {
        if (user.id === userId) {
          
          return { ...user, is_active: true };
          

        }
        return user;
      })
    );

    } catch (error) {
      console.log(error);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      
      await axios.put(`${BASE_URL}/user/unblock/${userId}/`);
      // Handle successful unblock as needed
      // Refresh user list after unblocking
     
      fetchUsers();
      setUserList((prevUserList) =>
        prevUserList.map((user) => {
        if (user.id === userId) {
          
          return { ...user, is_active: false };
         
        }
        return user;
      })
    );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
      <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
      <div className="flex justify-between items-center">
        <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
          Users List
        </div>
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
                <th className="border w-1/6 px-4 py-2">Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr key={user.id}>


               
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.mobile}</td>
                  <td className="border px-4 py-2">{user.id}</td>
                  
                  <td className="border px-4 py-2">
                    {user.is_active ? (
                     
                      <button
                        className="bg-yellow-500 cursor-pointer rounded p-1 mx-1 text-white"
                        onClick={() =>handleBlockUser (user.id)} 
                      >
                       
                        Block
                      </button>
                      
                    ) : (
                      <button
                        className="bg-blue-500 cursor-pointer rounded p-1 mx-1 text-white"
                        onClick={() => handleUnblockUser(user.id)}
                      >
                        
                        Unblock
                      </button>
                    )}

                  </td>
                  <td className="border px-4 py-2">
                    <Link to={`/editUser/${user.id}`} className="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-white">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="bg-red-500 cursor-pointer rounded p-1 mx-1 text-white"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}
