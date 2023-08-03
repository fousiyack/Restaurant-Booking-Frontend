import React from 'react'

export default function UserPrivateRouter() {
  const Token=localStorage.getItem("user_access_token");
  return (
    <>
      token?<Outlet/>:<Navigate to="/user "/>
      </>
  )
}
