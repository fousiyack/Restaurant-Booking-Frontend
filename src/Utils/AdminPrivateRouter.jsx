import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';

export default function AdminPrivateRouter() {
    const Token=localStorage.getItem("admin_access_token");
  return (
    <>
      token?<Outlet/>:<Navigate to="/admin "/>
      </>
  )
}
