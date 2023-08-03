import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
  const [bannerImage, setBannerImage] = useState('');

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const response = await axios.get('http://localhost:8000/banner//');
        if (response.data && response.data.payload && response.data.payload.length > 0) {
          setBannerImage(response.data.payload[0].image);
        }
      } catch (error) {
        console.error('Error fetching banner image:', error);
      }
    };

    fetchBannerImage();
  }, []);

  const bannerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const imageStyle = {
    maxWidth: '100%',
    height: '268'
    
    // Add any additional styling as per your requirement
  };

  return (
     <div className="col-span-10">
    
      {bannerImage && (
         <div className="banner flex justify-center">
         <img className="banner-image w-1263 h-268" src={`http://localhost:8000${bannerImage}`} alt="Banner" />
       </div>
      )}
     </div>
  );
};

export default Banner;
