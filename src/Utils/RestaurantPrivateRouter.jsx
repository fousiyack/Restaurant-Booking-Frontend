import React from 'react'

function RestaurantPrivateRouter() {
  const Token=localStorage.getItem("access_token");
  return (
    <>
      token?<Outlet/>:<Navigate to="/restaurant "/>
      </>
  )
}

export default RestaurantPrivateRouter