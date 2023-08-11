import React from "react";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

const AdminProtectedRoutes = ({ children, ...rest }) => {
  const token = localStorage.getItem("access_token");

  console.log("Token in protected:", token);

  if (token) {
    try {
      const admin = jwt_decode(token);
      console.log("Decoded admin token:", admin);
      const is_superuser = admin?.is_superuser;

      if (is_superuser) {
        return <>{children}</>;
      } else {
        return <Navigate to="/admin" />;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return <Navigate to="/admin" />;
    }
  } else {
    return <Navigate to="/admin" />;
  }
};

export default AdminProtectedRoutes;
