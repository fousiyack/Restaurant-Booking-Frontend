import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "../../Utils/Config";
import { toast, Toaster } from "react-hot-toast";
import AuthContext from "../AuthContext";


const LoginModal = ({ onClose }) => {
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, values);
      console.log(response.data.is_superuser, ".............");

      const TokenData = jwt_decode(response.data.access_token);

      console.log(TokenData, "TokenData.............");

      const {
        name,
        user_id,
        email,
        is_active,
        mobile,
        is_superuser,
        is_res_admin,
      } = TokenData;

      const userdata = {
        name: name,
        email: email,
        is_active: is_active,
        user_id: user_id,
        mobile: mobile,
        is_res_admin: is_res_admin,
        is_superuser: is_superuser,
      };

      setUser(userdata);

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user", response.data.email);
      localStorage.setItem("is_res_admin", response.data.is_res_admin);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("is_superuser", response.data.is_superuser);

      if (response.data.is_res_admin) {
        navigate("/restSide/");
      } else {
        navigate("/");
      }
      toast.success("Logged in succesfully!");
      onClose();
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.detail || "Login failed.";
        toast.error(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <Toaster position="top-right" reverseOrder="false" limit={1}></Toaster>
        {/* <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-2xl font-bold mb-4">Login Form</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {loginMessage && (
                  <div className="text-green-500 text-sm mb-4">
                    {loginMessage}
                  </div>
                )}

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
