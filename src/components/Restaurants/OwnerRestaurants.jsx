import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import RestaurantAdd from "./RestaurantAdd";
import { BASE_URL } from "../../Utils/Config";

export default function OwnerRestaurants() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [cityNames, setCityNames] = useState({});
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/restaurant/restListall/`);
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
      const response = await axios.get(`${BASE_URL}/admin/get_city/${cityId}`);
      setCityNames((prevCityNames) => ({
        ...prevCityNames,
        [cityId]: response.data.name,
      }));
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const handleDeleteResturant = async (restaurantId) => {
    try {
      await axios.delete(`${BASE_URL}/restaurant/delete/${restaurantId}/`);
      fetchRestaurants();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
      <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
        <div className="flex justify-between items-center">
          <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
            Restaurants List
          </div>
        </div>
        <div className="p-3">
          <table className="table-responsive w-full rounded">
            <thead>
              <tr>
                <th className="border w-1/4 px-4 py-2">Restaurant Name</th>
                <th className="border w-1/6 px-4 py-2">Executive Name</th>
                <th className="border w-1/6 px-4 py-2">Contact Number</th>
                <th className="border w-1/6 px-4 py-2">Email Address</th>
                {/* <th className="border w-1/6 px-4 py-2">City</th> */}
                <th className="border w-1/6 px-4 py-2">Approved or Not</th>
                <th className="border w-1/5 px-4 py-2">Edit</th>
                <th className="border w-1/5 px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {restaurantList.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td className="border px-4 py-2">
                    {restaurant.restaurant_name}
                  </td>
                  <td className="border px-4 py-2">
                    {restaurant.executive_name}
                  </td>

                  <td className="border px-4 py-2">
                    {restaurant.contact_number}
                  </td>
                  <td className="border px-4 py-2">
                    {restaurant.email_address}
                  </td>

                  {/* <td className="border px-4 py-2">
                    {restaurant.city ? (
                      <span>{cityNames[restaurant.city]}</span>
                    ) :""}
                    
                  </td> */}
                  {/* <td className="border px-4 py-2">
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
                  </td> */}
                  <td className="border px-4 py-2">
                    {restaurant.is_approved ? (
                      <>
                       
                        Approved
                      
                      </>
                    ) : (
                      <>
                       
                        Not Approved
                    
                      </>
                    )}
                  </td>
                  <td className="border px-4 py-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
