import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RestSidebar from "./components/Restaurants/RestSidebar";
import Navbar from "./components/Restaurants/Navbar";
import AddRestaurant from "./components/User/AddRestaurant";
import ResturantEdit from "./components/Admin/ResturantEdit";
import RestUsersList from "./components/Restaurants/RestUsersList";
import RestBookingHistory from "./components/Restaurants/RestBookingHistory";
import RestaurantList from "./components/Admin/RestaurantList";
import Complaint from "./components/Restaurants/Complaints";
import RestDashboard from "./components/Restaurants/RestDashboard";
import Complaints from "./components/Restaurants/Complaints";

const RestaurantLinks = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="flex col-2">
                <RestSidebar />
                <RestDashboard />
              </div>
            </>
          }
        />

        <Route
          path="/AddRestaurant"
          element={
            <>
              <Navbar />
              <div className="flex col-2">
                <RestSidebar />
                <AddRestaurant />
              </div>
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <Navbar />
              <div className="flex col-2">
                <RestSidebar />

                <RestUsersList />
              </div>
            </>
          }
        />

        <Route
          path="edit/:id"
          element={
            <>
              <Navbar />
              <div className="flex col-2">
                <RestSidebar />
                <ResturantEdit />
              </div>
            </>
          }
        />
        <Route
          path="/RestBookingHistory/:restaurantId"
          element={
            <>
              <Navbar />
              <div className="flex col-2">
                <RestSidebar />
                <RestBookingHistory />
              </div>
            </>
          }
        />
        <Route
          path="/restList"
          element={
            <>
              <Navbar />
              <div className="flex col-2">
                <RestSidebar />
                <RestaurantList />
              </div>
            </>
          }
        />
        <Route
          path="/complaints"
          element={
            <>
              <Navbar />
              <div className="flex col-2">
                <RestSidebar />
                <Complaints />
              </div>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default RestaurantLinks;
