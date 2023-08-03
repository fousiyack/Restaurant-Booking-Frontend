import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import BookingTimeTable from "./BookingTimeTable";
import { useNavigate } from "react-router-dom";
import Complaint from "./Complaint";
import { BASE_URL } from "../../Utils/Config";

export default function SingleRestaurant() {
  const { id } = useParams();

  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("About");
  const navigate = useNavigate();
  const [stripeResponse, setStripeResponse] = useState(false);
  const [paymentUrlFromStripe, setPaymentUrlFromStripe] = useState("");

  const [price, setPrice] = useState("");

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/restaurant/details/${id}`
        );
        console.log(response.data);
        setRestaurantDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  // action={`http://localhost:8000/user/create-checkout-session/`}

  const paymentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "${BASE_URL}/user/create-checkout-session/"
      );
      console.log("stripe response", response);

      if (response) {
        // window.location.href = response.data.url;

        console.log(response.data.url, "response hereeeeeeeeeeeeeeeeeee");

        // const redirectUrl = response.data.url;
        // window.location.href = redirectUrl;
        setPaymentUrlFromStripe(response);
        setStripeResponse(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleBookTableClick = (e) => {
    e.preventDefault();
    //setShowBooking(true);
    navigate(`/restaurant-details/${id}/`);
  };

  const handlePayment = () => {
    // window.open(paymentUrlFromStripe, "_self");
    console.log("pay button clicked", paymentUrlFromStripe);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 flex col-2">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full md:w-3/5 pr-4">
              <div className="bg-white shadow-lg rounded-lg">
                {/* <div className="grid grid-cols-1 md:grid-cols-12"> */}
                <div className="md:col-span-7">
                  <img
                    className="w-full h-96 object-cover rounded-t-lg"
                    src={`${BASE_URL}${restaurantDetails?.image}`}
                    alt="Restaurant Image"
                  />
                </div>
                <div className="md:col-span-5 p-8">
                  <h1 className="text-3xl font-bold mb-4">
                    {restaurantDetails?.restaurant_name}
                  </h1>
                  <p className="text-gray-500 mb-4">
                    {restaurantDetails?.restaurant_address}
                  </p>
                  <div className="flex items-center mb-4">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 14.415l-5.624 3.208a.5.5 0 01-.782-.57L5.227 10.9l-4.73-4.353a.5.5 0 01.274-.86l6.152-.528L9.457.572a.5.5 0 01.88 0l2.434 4.587 6.152.528a.5.5 0 01.274.86l-4.73 4.353 1.399 6.152a.5.5 0 01-.782.57L10 14.414z" clipRule="evenodd" />
                  </svg> */}
                    <p className="text-gray-500">{restaurantDetails?.rating}</p>
                  </div>
                  <p className="text-gray-700 mb-8">
                    {restaurantDetails?.description}
                  </p>
                  {/* <div className="flex space-x-4">
                  <a
                    href="#"
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleBookTableClick}
                  >
                    Book Table
                  </a>
                 
                  <a
                    href="#"
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    View Menu
                  </a>
                </div> */}
                </div>
                {/* </div> */}
              </div>
              <div>
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Select tab
                    </label>
                    <select
                      id="tabs"
                      className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setActiveTab(e.target.value)}
                      value={activeTab}
                    >
                      <option value="About">About</option>
                      <option value="Photos">Photos</option>
                      <option value="Reviews">Reviews</option>
                      <option value="Map">Payment</option>
                    </select>
                  </div>
                  <ul
                    className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400"
                    id="fullWidthTab"
                    data-tabs-toggle="#fullWidthTabContent"
                    role="tablist"
                  >
                    <li className="w-full">
                      <button
                        id="about-tab"
                        data-tabs-target="#about"
                        type="button"
                        role="tab"
                        aria-controls="about"
                        aria-selected={activeTab === "About"}
                        className={`inline-block w-full p-4 rounded-tl-lg ${
                          activeTab === "About"
                            ? "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                            : "hover:bg-gray-100 dark:hover:bg-gray-600"
                        } focus:outline-none`}
                        onClick={() => handleTabClick("About")}
                      >
                        About
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        id="photos-tab"
                        data-tabs-target="#photos"
                        type="button"
                        role="tab"
                        aria-controls="photos"
                        aria-selected={activeTab === "Photos"}
                        className={`inline-block w-full p-4 ${
                          activeTab === "Photos"
                            ? "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                            : "hover:bg-gray-100 dark:hover:bg-gray-600"
                        } focus:outline-none`}
                        onClick={() => handleTabClick("Photos")}
                      >
                        Photos
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        id="reviews-tab"
                        data-tabs-target="#reviews"
                        type="button"
                        role="tab"
                        aria-controls="reviews"
                        aria-selected={activeTab === "Reviews"}
                        className={`inline-block w-full p-4 ${
                          activeTab === "Reviews"
                            ? "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                            : "hover:bg-gray-100 dark:hover:bg-gray-600"
                        } focus:outline-none`}
                        onClick={() => handleTabClick("Reviews")}
                      >
                        Complaint
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        id="map-tab"
                        data-tabs-target="#payment"
                        type="button"
                        role="tab"
                        aria-controls="payment"
                        aria-selected={activeTab === "Payment"}
                        className={`inline-block w-full p-4 rounded-tr-lg ${
                          activeTab === "Payment"
                            ? "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                            : "hover:bg-gray-100 dark:hover:bg-gray-600"
                        } focus:outline-none`}
                        onClick={() => handleTabClick("Payment")}
                      >
                        Payment
                      </button>
                    </li>
                  </ul>
                  <div
                    id="fullWidthTabContent"
                    className="px-4 py-6 space-y-6 sm:p-6"
                    role="tabpanel"
                    aria-labelledby="about-tab"
                    hidden={activeTab !== "About"}
                  >
                    {/* About Tab Content */}
                    {restaurantDetails && (
                      <div>
                        <h2 className="text-xl font-semibold">
                          {restaurantDetails.name}
                        </h2>
                        <p>{restaurantDetails.description}</p>
                      </div>
                    )}
                  </div>
                  <div
                    id="fullWidthTabContent"
                    className="px-4 py-6 space-y-6 sm:p-6"
                    role="tabpanel"
                    aria-labelledby="photos-tab"
                    hidden={activeTab !== "Photos"}
                  >
                    {/* Photos Tab Content */}
                    {restaurantDetails && (
                      <div>
                        <div className="flex gap-4">
                          <div className="w-1/2">
                            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                              <img
                                className="w-full h-46 object-cover rounded-t-lg"
                                src={`${BASE_URL}${restaurantDetails?.image1}`}
                                alt="Restaurant Image"
                              />
                            </div>
                          </div>
                          <div className="w-1/2">
                            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                              <img
                                className="w-full h-46 object-cover rounded-t-lg"
                                src={`${BASE_URL}${restaurantDetails?.image2}`}
                                alt="Restaurant Image"
                              />
                            </div>
                          </div>
                          <div className="w-1/2">
                            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                              <img
                                className="w-full h-46 object-cover rounded-t-lg"
                                src={`${BASE_URL}${restaurantDetails?.image3}`}
                                alt="Restaurant Image"
                              />
                            </div>
                          </div>
                          <div className="w-1/2">
                            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                              <img
                                className="w-full h-46 object-cover rounded-t-lg"
                                src={`${BASE_URL}${restaurantDetails?.image4}`}
                                alt="Restaurant Image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    id="fullWidthTabContent"
                    className="px-4 py-6 space-y-6 sm:p-6"
                    role="tabpanel"
                    aria-labelledby="reviews-tab"
                    hidden={activeTab !== "Reviews"}
                  >
                    {/* Reviews Tab Content */}
                    {restaurantDetails && <Complaint restaurantId={id} />}
                  </div>
                  <div
                    id="fullWidthTabContent"
                    className="px-4 py-6 space-y-6 sm:p-6"
                    role="tabpanel"
                    aria-labelledby="map-tab"
                    hidden={activeTab !== "Payment"}
                  >
                    {/* Map Tab Content */}
                    {restaurantDetails && (
                      <div>
                        <form method="POST">
                          <div className="mb-4">
                            <label
                              htmlFor="payment"
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Enter Payment
                            </label>

                            <input
                              type="text"
                              name="price"
                              id="price"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />

                            {/* <ErrorMessage name="payment" component="div" className="text-red-500 text-sm" /> */}
                          </div>
                          <div className="flex justify-between">
                            <button
                              type="submit"
                              className="bg-red-500 text-white py-2 px-4 rounded"
                              onClick={paymentSubmit}
                            >
                              Proceed to Pay
                            </button>
                            <button
                              type="button"
                              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  {stripeResponse && (
                    <div className="flex justify-center">
                      <button
                        onClick={handlePayment}
                        className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        Pay Now
                      </button>
                        
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/5 pl-4">
              <BookingTimeTable restaurantId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
