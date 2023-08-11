import React,{useState}from 'react'
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import { BASE_URL } from "../../Utils/Config";
import { toast,Toaster } from 'react-hot-toast';




export default function AddCity() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        state: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const formDataToSend = new FormData();
          formDataToSend.append("name", formData.name);
          formDataToSend.append("state", formData.state);
          const response = await axios.post(
            `${BASE_URL}/admin/add_city/`,formDataToSend)
            toast.success("Added successfully")
            navigate("/Cities");
        
    } catch (error) {
        console.log(error);
      }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        }
  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit}>
      <Toaster position="top-right" reverseOrder="false" limit={1}></Toaster>
      <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
          Add City
        </div>
          <div className="flex -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                  htmlFor="restaurant_name"
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
                   State
                </label>
                <input
                  className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker"
                  id="State"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div></div>
              <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add City
            </button>
        </form>
    </div>
  )
}
