import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../Utils/Config";

export default function CreateRoom() {
  const [restaurant, setRestaurant] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Add this state variable

  useEffect(() => {
    const restaurantId = localStorage.getItem("restaurantId");
    setRestaurant(restaurantId);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("restaurant", restaurant);
      formData.append("name", name);
      formData.append('description', description);
      formData.append('image', image);

      await axios.post(`${BASE_URL}/chat/roomCreate/`, formData);
      setRestaurant("");
      setName("");
      setDescription('')
      setImage(null)
      setImagePreview(null); // Reset the image preview

      toast.success('Successfully created Room');
    } catch (error) {
      console.log(error);
      toast.error("Could not create Room");
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setImagePreview(imageURL);
    }
  };
  return (
    <div className="ml-3 mt-3 bg-transparent">
      <Toaster position="top-center" reverseOrder={false} limit={1} />
      <h4 className="text-blue-gray text-2xl font-serif mt-3 text-start">
        Create Chat Room
      </h4>

      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 mt-3"
            placeholder="Description"
            required
          />
          {imagePreview && (
            <img src={imagePreview} alt="Image Preview" className="h-40 mt-5" />
          )}
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="focus:outline-none mt-5"
            required
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Create Community Group
          </button>
        </div>
      </form>
    </div>
  );
}
