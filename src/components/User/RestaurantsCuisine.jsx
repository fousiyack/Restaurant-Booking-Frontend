import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../../Utils/Config";

const RestaurantsCuisine = () => {
  const { cuisine } = useParams();
  const [restaurants, setRestaurants] = useState([]);

  const fetchAndFilterRestaurants = async (selectedCuisineId) => {
    try {
      const response = await axios.get(`${BASE_URL}/restaurant/RestListCuisine/${selectedCuisineId}`);
      setRestaurants(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    fetchAndFilterRestaurants(cuisine).then((restaurants) => {
      setRestaurants(restaurants);
    });
  }, [cuisine]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {restaurants.map((restaurant) => (
  
       <div key={restaurant.id} style={{ width: '300px', margin: '20px', backgroundColor: '#ffffff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Link to={`/restaurant-details/${restaurant.id}`}>
          
          <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
            <img src={`${BASE_URL}${restaurant.image}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ padding: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>{restaurant.restaurant_name}</h2>
            <div style={{ backgroundColor: '#f1f1f1', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '25%', backgroundColor: '#30a29f' }}></div>
            </div>
            <div style={{ marginTop: '16px' }}>
              {/* <p style={{ fontWeight: 'bold' }}>Address:</p> */}
              <p>{restaurant.restaurant_address}</p>
            </div>
            <div style={{ marginTop: '16px' }}>
              {/* <p style={{ fontWeight: 'bold' }}>Contact Number:</p> */}
              <p>{restaurant.contact_number}</p>
            </div>
            <div style={{ marginTop: '16px' }}>
              {/* <p style={{ fontWeight: 'bold' }}>Email Address:</p> */}
              <p>{restaurant.email_address}</p>
            </div>
            {/* <div style={{ marginTop: '16px' }}>
              <p style={{ fontWeight: 'bold' }}>Description:</p>
              <p>{restaurant.description}</p>
            </div> */}
          </div>
        </Link>
        </div>

      ))}
    </div>
  );
}

export default RestaurantsCuisine;
