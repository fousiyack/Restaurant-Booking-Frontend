import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";
import axios from "axios";
import Cookies from "js-cookie";
import RestaurantModal from "./RestaurantModal";
//import UserContext from './UserContext';
import logo from "../Images/png/logo-no-background.png";
import { IoIosArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BsChatDots } from "react-icons/bs";
import { BASE_URL } from "../../Utils/Config";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const userEmail = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleCitySelection = (city) => {
    console.log(city);
    setSelectedCity(city);
    navigate(`/restaurants/${city}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = (modalName) => {
    if (modalName === "login") {
      setIsLoginModalOpen(!isLoginModalOpen);
    } else if (modalName === "register") {
      setIsRegistrationModalOpen(!isRegistrationModalOpen);
    } else if (modalName === "restaurantModal") {
      setIsRestaurantModalOpen(!isRestaurantModalOpen);
    }
  };
  const handleLogout = async () => {
    try {
      //await axios.post('http://localhost:8000/user/logout/');

      localStorage.removeItem("user");
      console.log("");
      localStorage.removeItem("access_token");

      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("is_res_admin");
      localStorage.removeItem("user_access_token");
      localStorage.removeItem("id");
    } catch (error) {
      // Handle any error that occurred during the logout process
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/cities/`);
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfile = async () => {};

  return (
    <nav className="bg-red-800  shadow">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/">
              <img className="w-24 h-auto p-2" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="lg:flex lg:items-center lg:w-auto">
            <div className="relative inline-block text-left">
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedCity
                    ? cities.find((city) => city.id === selectedCity)?.name ||
                      "Select City"
                    : "Select City"}
                  {/* <svg
      className="-mr-1 ml-2 h-5 w-5 transform rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 3.586L3.707 9.879a1 1 0 101.414 1.414L10 6.414l4.879 4.879a1 1 0 001.414-1.414L10 3.586z"
        clipRule="evenodd"
      />
    </svg> */}
                  <IoIosArrowDropdown className="w-12 tw-h-8" />
                </button>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {cities.map((city) => (
                        <div
                          key={city.id}
                          className={`block px-4 py-2 text-sm ${
                            selectedCity === city.id
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } hover:bg-gray-100 hover:text-gray-900`}
                          role="menuitem"
                          onClick={() => {
                            handleCitySelection(city.id);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {city.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center"></div>
          <div className="hidden lg:flex items-center space-x-4">
            {/* <Link to="/add-restaurant" className="block px-4 py-2 text-white">
              Add Restaurant
            </Link> */}
            <div className="hidden lg:flex items-center space-x-4">
              {userEmail ? (
                <>
                  <span className="text-white mr-2">{loginMessage}</span>

                  <div className="flex items-center space-x-4">
                    <Link to="/profile" className="text-white text-2xl">
                      <CgProfile />
                    </Link>
                    <Link to="/chat" className="text-white text-2xl">
                      <BsChatDots />
                    </Link>
                  </div>

                  <button
                    className="block px-4 py-2 text-white tw-border-spacing-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="block px-4 py-2 text-white"
                    onClick={() => toggleModal("login")}
                  >
                    Sign In
                  </button>
                  <button
                    className="block px-4 py-2 text-white"
                    onClick={() => toggleModal("register")}
                  >
                    User
                  </button>
                  <button
                    className="block px-4 py-2 text-white"
                    onClick={() => toggleModal("restaurantModal")}
                  >
                    Owner
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => {
            setIsLoginModalOpen(false);
            setLoginMessage("");
          }}
        />
      )}
      {isRegistrationModalOpen && (
        <RegistrationModal onClose={() => setIsRegistrationModalOpen(false)} />
      )}
      {isRestaurantModalOpen && (
        <RestaurantModal onClose={() => setIsRestaurantModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
