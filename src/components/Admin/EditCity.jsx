import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/Config";
import { toast, Toaster } from "react-hot-toast";

export default function EditCity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cityData, setCityData] = useState({});
  const [error, setError] = useState(null);

  const fetchCityData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get_city/${id}`);

      setCityData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCityData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", cityData.name);
      formDataToSend.append("state", cityData.state);

      await axios.put(`${BASE_URL}/admin/editCity/${id}/`, formDataToSend);

      navigate("/Cities");
      toast.success("Edited successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCityData({
      ...cityData,
      [e.target.name]: e.target.value,
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit}>
        <Toaster position="top-right" reverseOrder="false" limit={1}></Toaster>
        <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
          Edit City
        </div>
        <div className="flex -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker"
              id="name"
              type="text"
              name="name"
              value={cityData.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
              htmlFor="state"
            >
              State
            </label>
            <input
              className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker"
              id="state"
              type="text"
              name="state"
              value={cityData.state || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update City
        </button>
      </form>
    </div>
  );
}
