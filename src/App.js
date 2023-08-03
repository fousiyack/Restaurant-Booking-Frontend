import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";
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

// import AdminLinks from "./AdminLinks";
// import BookingTimeTable from "./components/User/BookingTimeTable";

function App() {
  // const [user, setUser] = useState(null);
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

          <Route path="/rest/:cuisine" 
                element={
                  <>
                   <Navbar/>
                    <RestaurantsCuisine />
                    <Footer />
                  </>
                } /> 

   

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

          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route
            path="/Dashboard"
            element={
              <>
                <AdminNavbar />
                <div className="flex col-2">
                  <AdminSidebar />
                  <Dashboard />
                </div>
              </>
            }
          />
          
          <Route path="/BookingHistory" 
                element={
                  <>
                   <AdminNavbar/>
                   <div className="flex col-2">
                    <AdminSidebar />
                    <BookingHistory />
                    </div >
                  </>

                } 
                />   

          <Route
            path="/RestaurantList"
            element={
              <>
                <AdminNavbar />
                <div className="flex col-2">
                  <AdminSidebar />
                  <RestaurantList />
                </div>
     
              </>
            }
          />
          <Route
            path="/RestaurantAdd"
            element={
              <>
                <AdminNavbar />
                <div className="flex col-2">
                  <AdminSidebar />
                  <RestaurantAdd />
                </div>
              </>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <>
                <AdminNavbar />
                <div className="flex col-2">
                  <AdminSidebar />
                  <RestaurantEdit />
                </div>
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
              <>
                <AdminNavbar />
                <div className="flex col-2">
                  <AdminSidebar />
                  <Cities />
                </div>
              </>
            }
          />
          <Route
            path="/AddCity"
            element={
              <>
                <AdminNavbar />
                <div className="flex col-2">
                  <AdminSidebar />
                  <AddCity />
                </div>
              </>
            }
          />
          <Route
            path="/Cuisines"
            element={
              <>
                <AdminNavbar />
                <div className="flex col-2">
                  <AdminSidebar />
                  <Cuisines />
                </div>
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
              <>
                <AdminNavbar />
                <div className="flex col-2">
                  <AdminSidebar />
               <CreateRoom/>
                </div>
              </>
            }
          />
           <Route path='chat'
            element={<> <Navbar />
            <Chat/></> }/>
            <Route path="/*" element={< PageNotFound />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
