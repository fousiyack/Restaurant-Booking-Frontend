import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Navbar from "./components/User/NavBar";
import Home from "./components/User/Home";
import Footer from "./components/User/Footer";
import AddRestaurant from "./components/User/AddRestaurant";
import AdminLogin from "./components/AdminLogin";
import LoginModal from "./components/User/LoginModal";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Dashboard from "./components/Admin/Dashboard";
import RestaurantList from "./components/Admin/RestaurantList";
import UsersList from "./components/Admin/UsersList";
// import CuisineType from "./components/User/CuisineType";
import AdminSidebar from "./components/Admin/AdminSidebar";
import AdminNavbar from "./components/Admin/AdminNavbar";
import RestaurantEdit from "./components/Admin/ResturantEdit";
import SingleRestaurant from "./components/User/SingleRestaurant";
import RestaurantAdd from "./components/Admin/RestaurantAdd";
import UserEdit from "./components/User/UserEdit";
import Cities from "./components/Admin/Cities";
// import {Authprovider} from './components/UserContext';
import RegistrationModal from "./components/User/RegistrationModal";
import AddCity from "./components/Admin/AddCity";
import Cuisines from "./components/Admin/Cuisines";
import AddCuisine from "./components/Admin/AddCuisine";
import RestaurantLinks from "./RestaurantLinks";
import RestaurantsCity from "./components/User/RestaurantsCity";
import RestaurantsCuisine from "./components/User/RestaurantsCuisine";
import BookingHistory from "./components/Admin/BookingHistory";
import UserProfile from "./components/User/UserProfile";
import { AuthProvider } from "./components/AuthContext";
import Success from "./components/User/Success";
import Chat from "./components/Chat/Chat";
import PageNotFound from "./components/pageNotFound";
import CreateRoom from "./components/Restaurants/CreateRoom";

import EditCity from "./components/Admin/EditCity";
import AdminProtectedRoutes from "./Utils/AdminProtectedRoute";
import RestaurantProtectedRouter from "./Utils/RestaurantProtectedRouter";



function App() {

  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/restSide/*" element={<RestaurantLinks />} />

            {/* <Route path="/userSide/*" element={<UserLinks />} /> */}

            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              }
            />

            <Route
              path="/user"
              element={
                <>
                  <Navbar />
                  <LoginModal />

                  <Footer />
                </>
              }
            />
            <Route
              path="/user-register"
              element={
                <>
                  <Navbar />
                  <RegistrationModal />

                  <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Navbar />
                  <UserProfile />

                  <Footer />
                </>
              }
            />
            <Route
              path="/success"
              element={
                <>
                  <Navbar />
                  <Success />

                  <Footer />
                </>
              }
            />

            <Route
              path="/add-restaurant"
              element={
                <>
                  <Navbar />
                  <AddRestaurant />
                  <Footer />
                </>
              }
            />
            <Route
              path="/restaurant-details/:id"
              element={
                <>
                  <Navbar />

                  <SingleRestaurant />
                  <Footer />
                </>
              }
            />
            <Route
              path="/restaurants/:city"
              element={
                <>
                  <Navbar />

                  <RestaurantsCity />
                  <Footer />
                </>
              }
            />

            <Route
              path="/rest/:cuisine"
              element={
                <>
                  <Navbar />
                  <RestaurantsCuisine />
                  <Footer />
                </>
              }
            />

            {/* <Route  path="/restaurant-details/:id/bookingpage" 
                element={
                  <>
                   <Navbar/>
                   <BookingTimeTable />
                    <Footer />
                  </>
                } /> */}
            {/* <Route path="/user/" element={<UserRouter />} />
            
            <Route path="/admin/" element={<AdminRouter />} /> */}
            <Route
              path="/admin"
              element={
                <>
                  <AdminLogin />
                  <Footer />
                </>
              }
            />

            <Route path="/AdminDashboard" element={   <AdminProtectedRoutes><AdminDashboard /></AdminProtectedRoutes>} />
           
              <Route
                path="/Dashboard"
                element={
                  <>
                   <AdminProtectedRoutes>
                    <AdminNavbar />
                    <div className="flex col-2">
                      <AdminSidebar />
                      <Dashboard />
                    </div>
                    </AdminProtectedRoutes>
                  </>
                }
              />
           

            <Route
              path="/BookingHistory"
              element={
                <><AdminProtectedRoutes>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <BookingHistory />
                  </div>
                 </AdminProtectedRoutes>
                </>
              }
            />

            <Route
              path="/RestaurantList"
              element={
                <><AdminProtectedRoutes>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <RestaurantList />
                  </div>
                </AdminProtectedRoutes>
                </>
              }
            />
            <Route
              path="/RestaurantAdd"
              element={
                <><AdminProtectedRoutes>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <RestaurantAdd />
                  </div>
                 </AdminProtectedRoutes>
                </>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <><AdminProtectedRoutes>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <RestaurantEdit />
                  </div>
                </AdminProtectedRoutes>
                </>
              }
            />
             <Route
              path="/editCity/:id"
              element={
                <><AdminProtectedRoutes>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <EditCity/>
                  </div>
                </AdminProtectedRoutes>
                </>
              }
            />
            <Route
              path="/UsersList"
              element={
                <>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <UsersList />{" "}
                  </div>
                </>
              }
            />
            <Route
              path="/editUser/:id"
              element={
                <>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <UserEdit />
                  </div>
                </>
              }
            />
            <Route
              path="/Cities"
              element={
                <><AdminProtectedRoutes>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <Cities />
                  </div>
                  </AdminProtectedRoutes>
                </>
              }
            />
            <Route
              path="/AddCity"
              element={
                <><AdminProtectedRoutes>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <AddCity />
                  </div>
                  </AdminProtectedRoutes>
                </>
              }
            />
            <Route
              path="/Cuisines"
              element={
                <><AdminProtectedRoutes>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <Cuisines />
                  </div>
                 </AdminProtectedRoutes>
                </>
              }
            />
            <Route
              path="/AddCuisine"
              element={
                <>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <AddCuisine />
                  </div>
                </>
              }
            />
            <Route
              path="/ChatCommunity"
              element={
                <><AdminProtectedRoutes>
                  <AdminNavbar />
                  <div className="flex col-2">
                    <AdminSidebar />
                    <CreateRoom />
                  </div>
                </AdminProtectedRoutes>
                </>
              }
            />
            <Route
              path="chat"
              element={
                <>
                  {" "}
                  <Navbar />
                  <Chat />
                </>
              }
            />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
