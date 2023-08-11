import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Utils/Config";

const Navbar = () => {
  const [hasRestaurant, setHasRestaurant] = useState(false);

  const userId = localStorage.getItem("id");
  useEffect(() => {
    const checkRestaurantEntry = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/restaurant/has-entry/${userId}`
        );
        console.log(response.data);
        setHasRestaurant(response.data.hasEntry);
        if (response.data.restaurantId) {
          localStorage.setItem("restaurantId", response.data.restaurantId);
        } else {
          localStorage.removeItem("restaurantId");
        }
      } catch (error) {
        // Handle error
      }
    };

    if (userId) {
      checkRestaurantEntry();
    }
  }, [userId]);
  return (
    <nav className="bg-gray-800 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Restaurant Side{" "}
          </span>
        </a>
        <div className="flex md:order-2">
          <Link
            to="/restSide/OwnerProfile"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Owner Details
          </Link>

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          ></button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          {/* <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Navbar = () => {
//   const [hasRestaurant, setHasRestaurant] = useState(false);
//   const userId = localStorage.getItem('id');

//   useEffect(() => {
//     const checkRestaurantEntry = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/restaurant/has-entry/${userId}`);
//         setHasRestaurant(response.data.hasEntry);
//       } catch (error) {
//         // Handle error
//       }
//     };

//     if (userId) {
//       checkRestaurantEntry();
//     }
//   }, [userId]);

//   return (
//     <nav className="bg-Black border-gray-200 dark:bg-gray-300">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

//         <div className="flex md:order-2">
//           {hasRestaurant ? (
//             <Link
//               to="/restaurants/edit/1"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               Edit Restaurant
//             </Link>
//           ) : (
//             <Link
//               to="/restaurants/add"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               Add Restaurant
//             </Link>
//           )}

//           {/* Rest of the code */}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
