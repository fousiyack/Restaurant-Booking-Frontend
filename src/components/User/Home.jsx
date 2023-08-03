import React from 'react'
import HomeRestaurants from "./HomeRestaurants"
import CuisineType from './CuisineType'
import Banner from './Banner'



function Home() {
  return (
    <div>
      <Banner/>
      <CuisineType/>
      <HomeRestaurants/>
      
    </div>
  )
}

export default Home