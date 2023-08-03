import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import { BASE_URL } from "../../Utils/Config";

const Complaint = (props) => {
  const { restaurantId } = props;
  const {user}=useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    
    name:user?user.name: '',
    email:user?user.email: '',
    phone: user?user.mobile:'',
    
    complaint: '',
   
    restaurantId: restaurantId
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
   e.preventDefault();

    console.log("formData..............",formData)
    axios.post(`${BASE_URL}/restaurant/complaint/`, formData)
      .then((response) => {
        console.log('Complaint submitted successfully:', response.data);
        setSuccessMessage("Complaint submitted successfully");
        setFormData({
          complaint: '',


        })

      })
      .catch((error) => {
        console.error('Error submitting complaint:', error);
      });
  };
  const handleCancel = () => {
    setSuccessMessage(""); 
    setFormData((prevFormData) => ({
      ...prevFormData,
      complaint: '', 
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
            Mobile No
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="complaint" className="block text-gray-700 text-sm font-bold mb-2">
            Complaint
          </label>
          <textarea
            name="complaint"
            id="complaint"
            value={formData.complaint}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        {successMessage && (
              <div className="bg-green-200 text-green-800 py-2 px-4 mb-4 rounded">
                {successMessage}
              </div>
        )}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Complaint;
