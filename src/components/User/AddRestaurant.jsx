import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/Config";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const user = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    restaurant_name: "",
    executive_name: "",
    contact_number: "",
    email_address: "",
    city: "",
    state: "",
    restaurant_address: "",
    image: null,
    imagePreview: null,
    description: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    cuisine_type: "",
    user: user,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
        imagePreview: URL.createObjectURL(e.target.files[0]),
      });
    } else if (
      e.target.name === "image1" ||
      e.target.name === "image2" ||
      e.target.name === "image3" ||
      e.target.name === "image4"
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/cities/`);
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCities();
  }, []);

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
      formDataToSend.append("user", localStorage.getItem("id"));
      formDataToSend.append("description", formData.description);
      formDataToSend.append("cuisine_type", formData.cuisine_type);
      formDataToSend.append("image1", formData.image1);
      formDataToSend.append("image2", formData.image2);
      formDataToSend.append("image3", formData.image3);
      formDataToSend.append("image4", formData.image4);

      // if (formData.image) {
      //   formDataToSend.append("image", formData.image);
      // }
      if (formData.image) {
        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}_${formData.image.name}`;
        formDataToSend.append("image", formData.image, uniqueFilename);
      }

      console.log("formDataToSend:", formDataToSend);

      const response = await axios.post(
        `${BASE_URL}/restaurant/addrest/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setSuccessMessage("Restaurant added successfully");
      navigate("/restSide/RestUnderUser");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = (event) => {
    const selectedCityId = parseInt(event.target.value, 10);
    const selectedCity = cities.find((city) => city.id === selectedCityId);
    setSelectedCity(selectedCity);
    setFormData({
      ...formData,
      city: selectedCityId,
    });
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
      <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
        <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
          Add Restaurant
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

            <div className="flex  -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              {/* </div>
             <div className="flex flex-wrap -mx-3 mb-6"> */}
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="cuisine_type"
                >
                  Cuisine Type
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="cuisine_type"
                  type="text"
                  name="cuisine_type"
                  value={formData.cuisine_type}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex  -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="image1"
                >
                  Image 1
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="image1"
                  type="file"
                  name="image1"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="image2"
                >
                  Image 2
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="image2"
                  type="file"
                  name="image2"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex  -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="image3"
                >
                  Image 3
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="image3"
                  type="file"
                  name="image3"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="image4"
                >
                  Image 4
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="image4"
                  type="file"
                  name="image4"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>

            {successMessage && (
              <div className="bg-green-200 text-green-800 py-2 px-4 mb-4 rounded">
                {successMessage}
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Restaurant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
