

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
      const {name,user_id, email, is_active,mobile,is_superuser,is_res_admin} = decoded_token
      console.log(decoded_token,'decoded_token............')
      const userdata = {
        name : name,
        email : email,
        is_active: is_active,
        user_id: user_id,
        mobile:mobile,
        is_res_admin:is_res_admin,
        is_superuser:is_superuser
    
      }
      console.log(userdata)
      setUser(userdata)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;