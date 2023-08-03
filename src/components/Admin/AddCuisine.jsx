import React,{useState}from 'react'
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import { BASE_URL } from "../../Utils/Config";




export default function AddCuisine() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        image: null,
        imagePreview: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const formDataToSend = new FormData();
          formDataToSend.append("name", formData.name);
          if (formData.image) {
            const timestamp = Date.now();
            const uniqueFilename = `${timestamp}_${formData.image.name}`; 
            formDataToSend.append("image", formData.image, uniqueFilename); 
          }
          const response = await axios.post(
            "${BASE_URL}/admin/add_cuisine/",formDataToSend)
            console.log(response.data);  
            navigate("/Cuisines");
        
    } catch (error) {
        console.log(error);
      }
    };
    const handleChange = (e) => {
        if (e.target.name === "image") {
          setFormData({
            ...formData,
            [e.target.name]: e.target.files[0],
            imagePreview: URL.createObjectURL(e.target.files[0]),
          });
        }
      
        else {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        }
      };
  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit}>
      <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
          Add Cuisine Type
        </div>
          <div className="flex -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="cuisine_name"
                >
                   Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="State"
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
              </div></div>
              <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Cuisine
            </button>
        </form>
    </div>
  )
}
