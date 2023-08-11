import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/Config";



export default function RestUnderUser() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [cityNames, setCityNames] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/restaurant/RestListOwner/${userId}`
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
        [cityId]: response.data.name
      }));
    } catch (error) {
      console.log(error);
      return "";
    }
  };


//   const handleApprove = async (restaurantId) => {
//     try {
//       await axios.put(
//         `http://localhost:8000/restaurant/Approve/${restaurantId}/`
//       );
//       fetchRestaurants();
//       setRestaurantList((prevRestList) =>
//         prevRestList.map((rest) => {
//           if (rest.id === restaurantId) {
//             return { ...rest, is_approved: true };
//           }
//           return rest;
//         })
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleNotApprove = async (restaurantId) => {
//     try {
//       await axios.put(
//         `http://localhost:8000/restaurant/NotApprove/${restaurantId}/`
//       );
//       fetchRestaurants();
//       setRestaurantList((prevRestList) =>
//         prevRestList.map((rest) => {
//           if (rest.id === restaurantId) {
//             return { ...rest, is_approved: false };
//           }
//           return rest;
//         })
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };


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
          <div className="">
          
             
       
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
                <th className="border w-1/5 px-4 py-2">Actions</th>
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
                        to={`/restSide/edit/${restaurant.id}`}
                        className="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-white"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
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
