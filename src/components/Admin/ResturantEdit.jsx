
 import React, { useState, useEffect } from "react";
 import axios from "axios";
 import { Link, useParams,useNavigate } from "react-router-dom";
 import { BASE_URL } from "../../Utils/Config";



const ResturantEdit = ({ match }) => { 
  const { id } = useParams();
  const Navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [formData, setFormData] = useState({
    restaurant_name: "",
    executive_name: "",
    contact_number: "",
    email_address: "",
    city: "",
    state: "",
    restaurant_address: "",
    image: null, // New state for the image file
    imagePreview: null, 
  });
  const fetchCities = async () => {
    try {
        const response = await axios.get('${BASE_URL}/admin/cities/');
        setCities(response.data);
    } catch (error) {
        console.log(error);
    }
};
useEffect(() => {
  fetchCities();
}, []);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/restaurant/details/${id}/`
        );

        const restaurant = response.data;
        if (cities.length > 0) {
          const selectedCity = cities.find(city => city.id === restaurant.city);
          setSelectedCity(selectedCity);
        }
        
        setFormData({
          restaurant_name: restaurant.restaurant_name,
          executive_name: restaurant.executive_name,
          contact_number: restaurant.contact_number,
          email_address: restaurant.email_address,
          city: restaurant.city,
      
          state: restaurant.state,
          restaurant_address: restaurant.restaurant_address,
          image: null,
          imagePreview: restaurant.image, 
        });
       
      } catch (error) {
        console.log(error);
      }
    };

    fetchRestaurant();
  }, [id,cities]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
        imagePreview: URL.createObjectURL(e.target.files[0]), // Update the image preview state
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("restaurant_name", formData.restaurant_name);
      formDataToSend.append("executive_name", formData.executive_name);
      formDataToSend.append("contact_number", formData.contact_number);
      formDataToSend.append("email_address", formData.email_address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("restaurant_address", formData.restaurant_address);
      // if (formData.image) {
      //   formDataToSend.append("image", formData.image); // Append the new image file if it exists
      // }
      if (formData.image) {
        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}_${formData.image.name}`; 
        formDataToSend.append("image", formData.image, uniqueFilename); 
      }
      const response = await axios.put(
        `${BASE_URL}/restaurant/edit/${id}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      Navigate("/RestaurantList");
    
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  
const handleCityChange = (event) => {
  const selectedCityId = parseInt(event.target.value, 10);
  const selectedCity = cities.find(city => city.id === selectedCityId);
  setSelectedCity(selectedCityId);
  setFormData({
    ...formData,
    city: selectedCityId,
  });
};


  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
      <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
        <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
          Edit Restaurant
        </div>
        <div className="p-3">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="restaurant_name"
                >
                  Restaurant Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker"
                  id="restaurant_name"
                  type="text"
                  name="restaurant_name"
                  value={formData.restaurant_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="executive_name"
                >
                  Executive Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="executive_name"
                  type="text"
                  name="executive_name"
                  value={formData.executive_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex  -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="contact_number"
                >
                  Contact Number
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="contact_number"
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="email_address"
                >
                  Email Address
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="email_address"
                  type="email"
                  name="email_address"
                  value={formData.email_address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
           
            <div className="flex flex-wrap -mx-3 mb-6"> 
            
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="restaurant_address"
                >
                  Restaurant Address
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="restaurant_address"
                  type="text"
                  name="restaurant_address"
                  value={formData.restaurant_address}
                  onChange={handleChange}
                  required
                />
              </div>
              </div>
            <div className="flex  -mx-3 mb-6"> 
          
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="city"
                >
                  City
                </label>
                {/* <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                /> */}
                 <select
  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
  value={selectedCity ? selectedCity.id : ""}
  onChange={handleCityChange}
  name="city"
>
  <option value="">--Select a City--</option>
  {cities.map((city) => (
    <option key={city.id} value={city.id}>
      {city.name}
    </option>
  ))}
</select>
              </div>
            
          
            
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="image"
                >
                  Image
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="mt-2 w-32 h-auto"
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Restaurant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResturantEdit;
