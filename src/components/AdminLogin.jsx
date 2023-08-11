import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import bgAdmin from './Images/bgAdmin2.jpg'
import { BASE_URL } from "../Utils/Config";
import { toast, Toaster } from "react-hot-toast";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password };
      console.log("iiiiiiiiiiii",user)
      const { data } = await axios.post(
        `${BASE_URL}/admin/login/`,
        user
      );
      console.log(data,'-------------daaataaaaa');
      const tokenData = jwt_decode(data.access_token);
      localStorage.setItem('access_token',data.access_token) 
      localStorage.setItem('email',data.email) 
      localStorage.setItem('user',data) 

      localStorage.setItem("is_superuser", data.is_superuser);
      console.log("tokennn", tokenData);

      // Perform any additional actions after successful login, such as redirecting to a different page
      navigate("/AdminDashboard");
    } catch (error) {
      
     toast.error("Login Failed")
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgAdmin})` }}>
  {/* Your content goes here */}
      {/* <div className="min-h-screen flex items-center justify-center bg-yellow-500"> */}
      {/* <img
        src={bgAdmin}
        alt="Background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      /> */}

      <div className="w-full max-w-md px-4 py-8 bg-gray-800 rounded-lg shadow-lg">
      <Toaster position="top-right" reverseOrder="false" limit={1}></Toaster>
      <h3 className="text-3xl text-center text-white mb-6">Sign In</h3>
       
      <div className="space-y-4 ">
        <div >
            <input
              type="email"
              className="w-full bg-gray-500 py-3 px-4 rounded-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="pt-2">
            <input
              type="password"
              className="w-full bg-gray-500 py-3 px-3 pt-4 rounded-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
         
          </div>
          <div className="pt-2">
            <button
              className="w-full  bg-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg"
              onClick={handleSignIn}
            >
              Sign In
            </button>
           
          </div>
        </div>
      
      </div>
    </>
  );
}

export default AdminLogin;
