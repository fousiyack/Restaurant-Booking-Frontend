import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Utils/Config";

const CuisineType = () => {
  const [cuisineTypeList, setCuisineTypeList] = useState([]);

  useEffect(() => {
    const fetchCuisineTypeList = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/cuisines/`);
        setCuisineTypeList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCuisineTypeList();
  }, []);

  return (
   
    <div className="bg-gray-300">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
      <h2 class="text-bold text-2xl">Cuisines</h2>

        {cuisineTypeList.length === 0 ? (
          <div className="text-center text-gray-500">Nothing to display</div>
        ) : (
          <div className="flex gap-6 to-blue-700"> 
            {cuisineTypeList.map((cuisine) => (
            <div key={cuisine.id} className=" w-full ">
                <div className="bg-gray-400">
                  <Link to={`/rest/${cuisine.id}`} className="block  w-[100px]  shadow-md py-10">
                    <img
                      src={`${BASE_URL}${cuisine.image}`}
                      className="w-32 h-32 rounded-full mx-auto"
                    />
                    <div className="text-center mt-2">{cuisine.name}</div>
                  </Link>
                </div>
            </div>
            ))}
          </div>

        )}
      </div>
    </div>
    
    

  );
};

export default CuisineType;
