
import React from 'react';
import { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from "../../Utils/Config";

const RestDashboard = () => {

  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    axios
    .get(`${BASE_URL}/restaurant/total-bookings/`)
    .then((response) => {
      setTotalBookings(response.data.total_bookings);
    })
    .catch((error) => {
      console.log('Error fetching total bookings:', error);
    });

  axios.get(`${BASE_URL}/restaurant/restListall/`)
    .then((response) => {
      setTotalRestaurants(response.data.length);
    })
    .catch((error) => {
      console.log('Error fetching total restaurants:', error);
    });

    axios.get(`${BASE_URL}/user/userList/`)
    .then((response) => {
      setTotalUsers(response.data.length);
    })
    .catch((error) => {
      console.log('Error fetching total restaurants:', error);
    });

}, []);
  return (
    <div>
  
 
    <main className="bg-white-300 flex-1 p-3 overflow-hidden">
<h1>Dashboard</h1>
      <div className="flex flex-col">
       
        <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
          <div className="shadow-lg bg-gray-800  border-l-8 hover:bg-gray-vibrant-dark border-red-vibrant-dark mb-2 p-2 md:w-1/4 mx-2">
            <div className="p-4 flex flex-col">
              <a href="#" className="no-underline text-white text-2xl">
                {totalBookings}
              </a>
              <a href="#" className="no-underline text-white text-lg">
                Total Bookings
              </a>
            </div>
          </div>

          <div className="shadow bg-gray-800  border-l-8 hover:bg-gray-dark border-info-dark mb-2 p-2 md:w-1/4 mx-2">
            <div className="p-4 flex flex-col">
              <a href="#" className="no-underline text-white text-2xl">
              1
              </a>
              <a href="#" className="no-underline text-white text-lg">
                Restaurants
              </a>
            </div>
          </div>

          <div className="shadow bg-gray-800  border-l-8 hover:bg-gray-600 border-warning-dark mb-2 p-2 md:w-1/4 mx-2">
            <div className="p-4 flex flex-col">
              <a href="#" className="no-underline text-white text-2xl">
              {totalUsers}
              </a>
              <a href="#" className="no-underline text-white text-lg">
                Total Users
              </a>
            </div>
          </div>

          <div className="shadow bg-gray-800  border-l-8 hover:bg-gray-600 border-success-dark mb-2 p-2 md:w-1/4 mx-2">
            <div className="p-4 flex flex-col">
              .<a href="#" className="no-underline text-white text-2xl">
                2
              </a>
              <a href="#" className="no-underline text-white text-lg">
                Total Cities
              </a>
            </div>
          </div>
        </div>
        {/* Stats Row Ends Here */}

        {/* Card Section Starts Here */}
        <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
       

          
          
         </div>
      </div>
    </main> 
   </div>

  );
};

export default RestDashboard;
