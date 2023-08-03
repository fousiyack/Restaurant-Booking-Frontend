import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../../Utils/Config";

const RestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    const fetchRestaurantList = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/restaurant/restList/`);
        setRestaurantList(response.data);

        console.log(response.data.image,'imageeeeeeeeeee')
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantList();
    
  }, []);

  return (
    <div className="bg-white my-4">
    <h2 class="text-bold text-2xl">Our Popular Restaurants</h2>
    <div className="flex flex-wrap justify-center">
      
      {restaurantList.map((restaurant) => (
        <div key={restaurant.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4">
          <Link to={`/restaurant-details/${restaurant.id}`} className='cursor-pointer'>
          <div className="max-w-sm bg-white rounded shadow-lg">
            <img className="w-full h-48 object-cover rounded-t" src={`${BASE_URL}${restaurant.image}`} alt="rest" />
          
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{restaurant.restaurant_name
}</h3>
              {/* <p className="text-gray-700">{restaurant.description}</p> */}
              <div className="flex justify-between mt-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-gray-500 mr-1"></i>
                  <p className="text-gray-500">{restaurant.restaurant_address}</p>
                </div>
                <div className="flex items-center">
                  {/* <i className="fas fa-star text-yellow-500 mr-1"></i> */}
                  <p className="text-gray-500">{restaurant.contact_number}</p>
                </div>
              </div>
            </div>
          </div>
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
};

export default RestaurantList;
