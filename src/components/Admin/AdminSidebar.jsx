import React from "react";
import { Link } from "react-router-dom";
import "./dist/styles.css";
import "./dist/all.css";

const AdminSidebar = () => {
  return (
    <aside
      id="sidebar"
      className="bg-side-nav w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block"
    >
      <ul className="list-reset flex flex-col">
      <li className="w-full h-full py-3 px-2 border-b border-light-border">
          <Link
            to="/Dashboard"
            className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
          >
            <i className="fas fa-tachometer-alt float-left mx-2"></i>
            Dashboard
            <span>
              <i className="fas fa-angle-right float-right"></i>
            </span>
          </Link>
        </li>
        <li className="w-full h-full py-3 px-2 border-b border-light-border">
          <Link
            to="/RestaurantList"
            className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
          >
            <i className="fab fa-wpforms float-left mx-2"></i>
            Restaurants
            <span>
              <i className="fa fa-angle-right float-right"></i>
            </span>
          </Link>
        </li>
        <li className="w-full h-full py-3 px-2 border-b border-light-border">
          <Link
            to="/UsersList"
            className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
          >
            <i className="fas fa-grip-horizontal float-left mx-2"></i>
            Users
            <span>
              <i className="fa fa-angle-right float-right"></i>
            </span>
          </Link>
        </li>
        <li className="w-full h-full py-3 px-2 border-b border-light-border">
          <Link
            to="/Cities"
            className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
          >
            <i className="fas fa-table float-left mx-2"></i>
            City
            <span>
              <i className="fa fa-angle-right float-right"></i>
            </span>
          </Link>
        </li>
        <li className="w-full h-full py-3 px-2 border-b border-light-border">
          <Link
            to="/Cuisines"
            className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
          >
            <i className="fas fa-table float-left mx-2"></i>
            Cuisine Types
            <span>
              <i className="fa fa-angle-right float-right"></i>
            </span>
          </Link>
        </li>
        <li className="w-full h-full py-3 px-2 border-b border-light-border">
          <Link
            to="/BookingHistory"
            className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
          >
            <i className="fas fa-table float-left mx-2"></i>
            Bookings
            <span>
              <i className="fa fa-angle-right float-right"></i>
            </span>
          </Link>
        </li>
        <li className="w-full h-full py-3 px-2 border-b border-light-border">
          <Link
            to="/ChatCommunity"
            className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
          >
            <i className="fas fa-cloud"></i>
            Community Chat Group
          </Link>
        </li>
        {/* <li className="w-full h-full py-3 px-2">
      <Link
        to="#"
        className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline"
      >
        <i className="far fa-file float-left mx-2"></i>
        Pages
        <span>
          <i className="fa fa-angle-down float-right"></i>
        </span>
      </Link>
      <ul className="list-reset -mx-2 bg-white-medium-dark">
        <li className="border-t mt-2 border-light-border w-full h-full px-2 py-3">
          <Link
            to="login.html"
            className="mx-4 font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline"
          >
            Login Page
            <span>
              <i className="fa fa-angle-right float-right"></i>
            </span>
          </Link>
        </li>
        <li className="border-t border-light-border w-full h-full px-2 py-3">
          <Link
            to="register.html"
            className="mx-4 font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline"
          >
            Register Page
            <span>
              <i className="fa fa-angle-right float-right"></i>
            </span>
          </Link>
        </li>
        <li className="border-t border-light-border w-full h-full px-2 py-3">
          <Link
            to="404.html"
            className="mx-4 font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline"
          >
            404 Page
            <span>
              <i className="fa fa-angle-right float-right"></i>
            </span>
          </Link>
        </li>
      </ul>
    </li> */}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
