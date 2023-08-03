import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const id = localStorage.getItem("id");

  console.log(id, "idddddd................");

  const handleLogout = async () => {
    try {
      console.log("");
      localStorage.remove("access_token");
      localStorage.removeItem("is_res_admin");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("id");
      localStorage.removeItem("user");
    } catch (error) {
      // Handle any error that occurred during the logout process
    }
  };

  return (
    <aside className="bg-side-nav h-screen w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block">
      <div className="sidebar-layout pt:5rem   bg-gray-600">
        <div className="sidebar-content text-white">
          <ul className="flex flex-col  mb-0 border rounded border-gray-300   style={{ backgroundColor: 'lightblue', hoverBackgroundColor: 'blue' }}">
            <Link
              to="/restSide/"
              className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline active"
            >
              <i className="fas fa-envelope"></i>
              Dashboard
            </Link>
            <Link
              to="/restSide/AddRestaurant"
              className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline active"
            >
              <i className="fas fa-camera-retro"></i>
              Add Restaurant
            </Link>

            <Link
              to="/restSide/users"
              className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
            >
              <i className="fas fa-user"></i>
              Users List
            </Link>

            <Link
              to="/restSide/RestBookingHistory/:restaurantId"
              className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
            >
              <i className="fas fa-pen"></i>
              Bookings
            </Link>
            <Link
              to="/restSide/restList"
              className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
            >
              <i className="fas fa-cog"></i>
              Restaurant
            </Link>
            <Link
              to="/restSide/complaints"
              className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
            >
              <i className="fas fa-cloud"></i>
              Complaints
            </Link>
        
            <Link
              to="/"
              className="block py-2 px-4 text-white hover:bg-gray-300"
              onClick={handleLogout}
            >
              <i className="fas fa-address-book"></i>
              Logout
            </Link>
            <br />
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
