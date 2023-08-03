import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import profile from "../Images/profile.jpg";
import AuthContext from "../AuthContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../Utils/Config";

const UserProfile = () => {
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
      const response = await axios.get(
        `${BASE_URL}/user/details/${userId}/`
      );
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

  async function getBooking() {
    try {
      const response = await axios.get(
        `${BASE_URL}/restaurant/UserBooking/${userId}/`
      );
      const booking = response.data;
      console.log(booking, "getBooking................");

      setBookings(booking);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getBooking();
  }, [isBookingCanceled]);

  async function getComplaints() {
    try {
      const response = await axios.get(
        `${BASE_URL}/restaurant/UserComplaints/${userEmail}/`
      );
      const complaint = response.data;
      console.log(complaint, "complaint................");
      setComplaints(complaint);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getComplaints();
  }, []);

  if (!singleUser.name) {
    return <p>Loading...</p>;
  }
  const handleCancelBooking = async (bookingId) => {
    try {
      console.log(bookingId, "bookingId................");
      const response = await axios.put(
        `${BASE_URL}/restaurant/bookingCancel/${bookingId}/`,
        {
          status: "canceled",
        }
      );
      console.log(response.data);
      setIsBookingCanceled(true);
      // toast.success('Project added successfully!');
      alert("Booking has been canceled successfully.plz check your mail!");
    } catch (error) {
      // Handle error if needed
      console.log("An error occurred while canceling the booking:", error);
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
                  <h5 className="text-xl font-semibold">Booked By</h5>
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
                  <div className="mb-4">
                    <h6 className="text-lg font-semibold">Booking History</h6>
                    <hr className="mt-2 mb-4 border-gray-300" />
                    {bookings.length > 0 ? (
                      <div className="flex flex-wrap">
                        {bookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="w-full md:w-1/2 mb-3"
                          >
                            <div className="bg-white rounded-lg shadow p-4">
                              <h6 className="font-semibold text-lg">
                                Restaurant:{" "}
                                {booking.restaurantId.restaurant_name}
                              </h6>
                              <p className="text-gray-600">
                                Date: {booking.date}
                              </p>
                              <p className="text-gray-600">
                                Guests: {booking.guestCount}
                              </p>
                              <p className="text-gray-600">
                                Status: {booking.status}
                              </p>
                              {booking.status === "canceled" ? (
                                <p className="text-red-500">
                                  Booking is canceled.
                                </p>
                              ) : (
                                <button
                                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-2"
                                  onClick={() =>
                                    handleCancelBooking(booking.id)
                                  }
                                >
                                  Cancel Booking
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No bookings found.</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <h6 className="text-lg font-semibold">Complaint History</h6>
                    <hr className="mt-2 mb-4 border-gray-300" />
                    {complaints.length > 0 ? (
                      <div className="flex flex-wrap">
                        {complaints.map((complaint) => (
                          <div
                            key={complaint.id}
                            className="w-full md:w-1/2 mb-3"
                          >
                            <div className="bg-white rounded-lg shadow p-4">
                              <h6 className="font-semibold text-lg">
                                Complaint: {complaint.complaint}
                              </h6>
                              <p className="text-gray-600">
                                Status: {complaint.status}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No complaints found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
