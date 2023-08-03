

import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import React, { createContext, useState, useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("helooo there")

    const access_token = localStorage.getItem("access_token")
    console.log(access_token,'..............context..........')
    if (access_token) {
      const decoded_token =  jwt_decode(access_token)
      const {name,user_id, email, is_active,mobile} = decoded_token
      const user = {
        name : name,
        email : email,
        is_active: is_active,
        user_id: user_id,
        mobile:mobile
    
      }
      console.log(user)
      setUser(decoded_token)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;