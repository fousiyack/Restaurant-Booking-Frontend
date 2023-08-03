import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link ,useNavigate} from 'react-router-dom';
import { BASE_URL } from "../../Utils/Config";

export default function Cities() {
  const [cityList, setCityList] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/cities/`);
      setCityList(response.data);


    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);
  const handleDeleteCity = async (cityId) => {
    try {
      await axios.delete(`${BASE_URL}/admin/deleteCity/${cityId}/`);
      fetchCities();
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleButtonClick = () => {
    navigate("/AddCity");
  };
  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
      <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
      <div className="flex justify-between items-center">
          <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
            City List
          </div>
          <div className="">
          
             
          
            <button onClick={handleButtonClick} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Add New City
</button>
          </div>
        </div>
        <div className="p-3">
          <table className="table-responsive w-full rounded">
            <thead>
              <tr>
                <th className="border w-1/2 px-4 py-2">City Name</th>
                <th className="border w-1/2 px-4 py-2">State</th>
              </tr>
            </thead>
            <tbody>
              {cityList.length === 0 ? (
                <tr>
                  <td colSpan="2">Loading...</td>
                </tr>
              ) : (
                cityList.map((city) => (
                  <tr key={city.id}>
                    <td className="border px-4 py-2">{city.name}</td>
                    <td className="border px-4 py-2">{city.state}</td>
                    <td className="border px-4 py-2">
                    <Link to={`/editCity/${city.id}`} className="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-white">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="bg-red-500 cursor-pointer rounded p-1 mx-1 text-white"
                      onClick={() => handleDeleteCity(city.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
