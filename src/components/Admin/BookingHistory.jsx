import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Pagination from '../Pagination';
import { BASE_URL } from "../../Utils/Config";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/restaurant/booking-history/`);
      setBookings(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Pagination settings
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const paginatedData = bookings.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(bookings.length / itemsPerPage);

  const filteredData = paginatedData.filter((booking) => {
    const restaurantNameMatch = booking.restaurantId.restaurant_name.toLowerCase().includes(search.toLowerCase());
    const dateMatch = booking.date.includes(searchDate);
    return restaurantNameMatch && dateMatch;
  });

  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
      <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
       
          <div className="bg-gray-300 px-2 py-3 border-solid border-gray-200 border-b">
            Booking History
          </div>
          <div className="flex justify-between items-center">
          <div className="flex">
            <label className="mr-2">Search Restaurant:</label>
            <input
              type="text"
              className="appearance-none block bg-white-200 text-gray-darker border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray"
              id="Search"
              name="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
          </div>
          <div className="flex">
            <label className="mr-2">Search Date:</label>
            <input
              type="text"
              className="appearance-none block bg-white-200 text-gray-darker border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray"
              id="SearchDate"
              name="SearchDate"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              placeholder="Search Date"
            />
          </div>
        </div>

        {filteredData.length > 0 ? (
          <div className="p-3">
            <table className="table-responsive w-full rounded">
              <thead>
                <tr>
                  <th className="border w-1/2 px-4 py-2">Restaurant</th>
                  <th className="border w-1/2 px-4 py-2">User</th>
                  <th className="border w-1/2 px-4 py-2">Date</th>
                  <th className="border w-1/2 px-4 py-2">Guest Count</th>
                  <th className="border w-1/2 px-4 py-2">Start Time</th>
                  <th className="border w-1/2 px-4 py-2">End Time</th>
                  <th className="border w-1/2 px-4 py-2">Table Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((booking) => (
                  <tr key={booking.id}>
                    <td className="border px-4 py-2">{booking.restaurantId.restaurant_name}</td>
                    <td className="border px-4 py-2">{booking.user.name}</td>
                    <td className="border px-4 py-2">{booking.date}</td>
                    <td className="border px-4 py-2">{booking.guestCount}</td>
                    <td className="border px-4 py-2">{booking.timeId.start_time.slice(0, -3)}</td>
                    <td className="border px-4 py-2">{booking.timeId.end_time.slice(0, -3)}</td>
                    <td className="border px-4 py-2">{booking.tableId.table_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default BookingHistory;
