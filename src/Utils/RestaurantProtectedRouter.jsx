import React from "react";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

const RestaurantProtectedRouter = ({ children, ...rest }) => {
  const token = localStorage.getItem("access_token");

  console.log("Token in protected:", token);

  if (token) {
    try {
      const restaurant = jwt_decode(token);
      const is_res_admin = restaurant?.is_res_admin;

      if (is_res_admin) {
        return <>{children}</>;
      } else {
        return <Navigate to="/user" />;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return <Navigate to="/user" />;
    }
  } else {
    return <Navigate to="/user" />;
  }
};

export default RestaurantProtectedRouter;
