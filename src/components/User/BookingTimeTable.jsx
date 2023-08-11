import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { REACT_APP_STRIPE_KEY } from "../../Utils/Config";
import { BASE_URL } from "../../Utils/Config";
import AuthContext from "../AuthContext";



function BookingTimeTable({ restaurantId }) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [date, setDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [price, setPrice] = useState("");
  let userId = localStorage.getItem("id");
  let email = localStorage.getItem("email");
  // userId = 2;
  const navigate = useNavigate();
  const stripePromise = loadStripe(REACT_APP_STRIPE_KEY);
  console.log(stripePromise);
  console.log(REACT_APP_STRIPE_KEY);
  
  
  const {user}=useContext(AuthContext)


  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/timeslots/`)
      .then((response) => setTimeSlots(response.data))
      .catch((error) => console.log(error));

    axios
      .get(`${BASE_URL}/admin/tables/`)
      .then((response) => setTables(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleTimeSlotSelection = (timeSlotId) => {
    setSelectedTimeSlot(timeSlotId);
  };

  const handleTableSelection = (tableId) => {
    setSelectedTable(tableId);
  };

  const handleGuestsChange = (e) => {
    setGuestCount(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    console.log(" stripe ", stripe);
    if (selectedTimeSlot && selectedTable) {
      if (userId) {
        const bookingData = {
          restaurantId: restaurantId,
          tableId: selectedTable,
          guestCount: guestCount,
          date: date,
          timeId: selectedTimeSlot,
          user: userId,
          price:price
        };

        axios
          .get(`${BASE_URL}/restaurant/check-table-availability/`, {
            params: {
              restaurantId: restaurantId,
              tableId: selectedTable,
              date: date,
              timeId: selectedTimeSlot,
            },
          })
          .then((response) => {
            if (response.data.available) {
              axios
                .post(`${BASE_URL}/restaurant/booking/`, bookingData)
                .then((response) => {
                  console.log(response.data, "data..........");
                  setBookingId(response.data.id);

                  setSelectedTimeSlot(null);
                  setSelectedTable(null);
                  setGuestCount(1);
                  setDate("");
                  setBookingStatus("To confirm the Booking please do the payment");
                  setShowPaymentForm(true);
                })
                .catch((error) => {
                  console.log("Booking error:", error);
                });
            } else {
              // Table is not available
              setBookingStatus(
                "Table not available. Please choose another table."
              );
            }
          })

          .catch((error) => {
            console.log("Table availability check error:", error);
            setBookingStatus(
              "Error occurred while checking table availability."
            );
          });
      } else {
        //must change comment after login page ready
        navigate("/user");
        console.log("Please log in to make a booking.");
      }
    } else {
      console.log("Please select a time slot and a table.");
    }
  };
  // ...................................................

  const handleCancelPayment = () => {
    setShowPaymentForm(false);
    setBookingId(null);
  };


  console.log(user,"auth.................");

  return (
    <div className="container mx-auto">
      <div className="bg-white p-3 rounded-lg shadow-md">
        <h2 className="text-2xl text-center font-bold mb-4">
          Table Reservation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <label htmlFor="guests" className="mr-4 w-36">
              Number of Guests:
            </label>
            <input
              type="number"
              id="guestCount"
              value={guestCount}
              onChange={handleGuestsChange}
              min="1"
              required
              className="border border-gray-300 rounded px-3 py-2 flex-grow"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="date" className="mr-4 w-36">
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="border border-gray-300 rounded px-3 py-2 flex-grow"
            />
          </div>

          <div className="w-full">
            <h2 className="text-2xl text-center font-bold mb-4">Time Slots</h2>
            <div className="grid grid-cols-5 gap-4">
              {timeSlots.map((timeSlot) => (
                <button
                  key={timeSlot.id}
                  className={`${
                    selectedTimeSlot === timeSlot.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  } px-3 py-2 tw-m-3 rounded `}
                  onClick={() => handleTimeSlotSelection(timeSlot.id)}
                >
                  {timeSlot.start_time.slice(0, -3)} -{" "}
                  {timeSlot.end_time.slice(0, -3)}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-2xl text-center font-bold mb-4">Tables</h2>
            <div className="flex flex-wrap gap-4">
              {tables.map((table) => (
                <button
                  key={table.id}
                  className={`${
                    selectedTable === table.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  } px-3 py-2 rounded`}
                  onClick={(e) => handleTableSelection(table.id, e)}
                  type="button" // Change the type to "button"
                >
                  Table {table.table_number} - Capacity: {table.capacity}
                </button>
              ))}
            </div>
          </div>

       
          <div className="mb-4">
                <label
                  htmlFor="payment"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Enter Payment
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  required
                  onChange={handlePriceChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

       
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Book Table
          </button>
          {bookingStatus && <p className="text-center mt-4">{bookingStatus}</p>}
        </form>
        {showPaymentForm && (
          <div>
            <form
              action={`${BASE_URL}/user/create-checkout-session/?booking_id=${bookingId}`}
              method="POST"
            >
             
                {/* <label
                  htmlFor="payment"
                  className="block text-gray-700 text-sm font-bold mb-2"
                  type="hidden"
                >
                  Enter Payment
                </label> */}
                <input
                  type="hidden"
                  name="price"
                  id="price"
                  value={price}
                 
                
                />
              
              <input type="hidden" name="userId" value={userId} />
              <input type="hidden" name="email" value={email} />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Proceed to Pay
                </button>
                {/* <button
                  type="button"
                  // onClick={setShowPaymentForm=false}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelPayment} // Call the new function on Cancel button click
                >
                  Cancel
                </button> */}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingTimeTable;
