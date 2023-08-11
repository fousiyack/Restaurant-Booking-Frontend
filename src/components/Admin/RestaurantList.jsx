import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RestaurantAdd from "./RestaurantAdd";
import { BASE_URL } from "../../Utils/Config";
import Swal from 'sweetalert2';
import { toast,Toaster } from 'react-hot-toast';

export default function RestaurantList() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [cityNames, setCityNames] = useState({});
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/restaurant/restListall/`
      );
      setRestaurantList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);
  const fetchCityName = async (cityId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/get_city/${cityId}`
      );
      setCityNames((prevCityNames) => ({
        ...prevCityNames,
        [cityId]: response.data.name,
      }));
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const handleApprove = async (restaurantId) => {
    try {
      await axios.put(
        `${BASE_URL}/restaurant/Approve/${restaurantId}/`
      );
      fetchRestaurants();
      setRestaurantList((prevRestList) =>
        prevRestList.map((rest) => {
          if (rest.id === restaurantId) {
            return { ...rest, is_approved: true };
          }
          return rest;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotApprove = async (restaurantId) => {
    try {
      await axios.put(
        `${BASE_URL}/restaurant/NotApprove/${restaurantId}/`
      );
      fetchRestaurants();
      setRestaurantList((prevRestList) =>
        prevRestList.map((rest) => {
          if (rest.id === restaurantId) {
            return { ...rest, is_approved: false };
          }
          return rest;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClick = () => {
    navigate("/RestaurantAdd");
  };

  const handleDeleteResturant = async (restaurantId) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "Delete the Restaurant....!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URL}/restaurant/delete/${restaurantId}/`);
          
        fetchRestaurants()
          toast.error("Deleted")
      }
  })
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
       <Toaster position="top-right" reverseOrder="false" limit={1}></Toaster>
      <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
        <div className="flex justify-between items-center">
          <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
            Restaurants List
          </div>
          {/* <div className="">
            <button
              onClick={handleButtonClick}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Add New Restaurant
            </button>
          </div> */}
        </div>
        <div className="p-3">
          <table className="table-responsive w-full rounded">
            <thead>
              <tr>
                <th className="border w-1/4 px-4 py-2">Restaurant Name</th>
                <th className="border w-1/4 px-4 py-2">Owner</th>
                <th className="border w-1/6 px-4 py-2">Email Address</th>
                <th className="border w-1/6 px-4 py-2">Executive Name</th>
                <th className="border w-1/6 px-4 py-2">Contact Number</th>
               
                {/* <th className="border w-1/6 px-4 py-2">City</th> */}
                <th className="border w-1/6 px-4 py-2">Approved or Not</th>
                {/* <th className="border w-1/5 px-4 py-2">Edit</th>
                <th className="border w-1/5 px-4 py-2">Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {restaurantList.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td className="border px-4 py-2">
                    {restaurant.restaurant_name}
                  </td>
                  <td className="border px-4 py-2">
                    {restaurant.user.name}
                  </td>
                  <td className="border px-4 py-2">
                    {restaurant.user.email}
                  </td>
                  <td className="border px-4 py-2">
                    {restaurant.executive_name}
                  </td>

                  <td className="border px-4 py-2">
                    {restaurant.contact_number}
                  </td>
                 

                  {/* <td className="border px-4 py-2">
                    {restaurant.city ? (
                      <span>{cityNames[restaurant.city]}</span>
                    ) :""}
                    
                  </td> */}
                  <td className="border px-4 py-2">
                    {restaurant.is_approved ? (
                      <>
                        <i
                          className="fas fa-check text-green-500 mx-2"
                          onClick={() => handleNotApprove(restaurant.id)}
                        ></i>

                        <button
                          style={{ display: "none" }}
                          class="bg-green-500 text-red font-bold py-2 px-4 rounded-full"
                          onClick={() => handleNotApprove(restaurant.id)}
                        >
                          Approved
                        </button>
                      </>
                    ) : (
                      <>
                        <i
                          className="fas fa-times text-red-500 mx-2"
                          onClick={() => handleApprove(restaurant.id)}
                        ></i>
                        <button
                          style={{ display: "none" }}
                          class="bg-red-500 text-red font-bold py-2 px-4 rounded-full"
                          onClick={() => handleApprove(restaurant.id)}
                        >
                          Not Approved
                        </button>
                      </>
                    )}
                  </td>
                  {/* <td className="border px-4 py-2">
                    <>
                      <Link
                        to={`/edit/${restaurant.id}`}
                        className="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-white"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                    </>
                  </td>

                  <td>
                    <>
                      <button
                        className="bg-red-500 cursor-pointer rounded p-1 mx-1 text-black"
                        onClick={() => handleDeleteResturant(restaurant.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </>
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
