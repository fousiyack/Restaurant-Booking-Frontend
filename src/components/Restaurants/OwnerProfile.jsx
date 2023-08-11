import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import profile from "../Images/profile.jpg";
import AuthContext from "../AuthContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../Utils/Config";

const OwnerProfile = ({ onClose }) => {
  const [singleUser, setSingleUser] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [bookings, setBookings] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [isBookingCanceled, setIsBookingCanceled] = useState(false);

  const userEmail = localStorage.getItem("user");
  const userId = localStorage.getItem("id");

  async function getUser() {
    try {
      const response = await axios.get(`${BASE_URL}/user/details/${userId}/`);
      const user = response.data;

      console.log(user, "fetching state");

      setSingleUser((prevUser) => ({
        ...prevUser,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      }));

      console.log(singleUser, "final");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log(singleUser); // Log the updated state
  }, [singleUser]);

  if (!singleUser.name) {
    return <p>Loading...</p>;
  }
  const closeForm = () => {
    // Call the onClose function passed as prop
    if (typeof onClose == "function") {
      onClose();
    }
  };

  return (
    <section className="min-h-screen bg-gray-100">
      {/* <ToastContainer /> */}
      <div className="container py-5">
        <div className="flex justify-center">
          <div className="max-w-lg w-full">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/4 gradient-custom text-center text-white py-6 px-4 flex flex-col items-center">
                  <img
                    src={profile}
                    alt="Avatar"
                    className="w-24 h-24 mx-auto mb-5 rounded-full object-cover"
                  />
                  <h5 className="text-xl font-semibold">Owner</h5>
                  <p className="text-sm text-gray-500"> {singleUser.name}</p>
                  <i className="far fa-edit mt-5"></i>
                </div>
                <div className="md:w-3/4 px-6 py-4">
                  <div className="mb-4">
                    <h6 className="text-lg font-semibold">Information</h6>
                    <hr className="mt-2 mb-4 border-gray-300" />
                    <div className="flex">
                      <div className="w-full md:w-1/2 mb-3">
                        <h6 className="font-semibold">Email</h6>
                        <p className="text-gray-600">{userEmail}</p>
                        <h6 className="font-semibold">Phone</h6>

                        <p className="text-gray-600">{singleUser.mobile}</p>
                      </div>
                    </div>
                  </div>
                  <button
                  onClick={closeForm}
                  className="bg-white-500 hover:bg-white-700 text-black font-bold py-2 px-4 rounded mt-4"
                >
                  Cancel
                </button>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerProfile;
