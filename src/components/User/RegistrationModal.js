import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate, json } from 'react-router-dom';
import { BASE_URL } from "../../Utils/Config";

const RegistrationModal = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const [regMessage, setRegMessage] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const navigate = useNavigate();

  // const { handleSubmit } = F

  const initialValues = {
    email: '',
    name: '',
    password: '',
    mobile: '',
    address: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    name: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    mobile: Yup.string().required('Mobile number is required'),
    address: Yup.string()
  });
  console.log('vlaidation schema', validationSchema)




  const handleRegistration = async (values, { setSubmitting }) => {
    console.log("registration", values);
    const { email, name, password, mobile } = values;
    setEmail(email);
    const response = await axios.post(`${BASE_URL}/user/register/`, values);
    console.log(response.data);
    setShowOTPModal(true);
    // Pass the email value to handleOTPSubmit
    handleOTPSubmit(values, response.data.email, setSubmitting);
  };
  
  const handleOTPSubmit = async (values, setSubmitting) => {
    console.log('handle otp submit', values);
    try {
      // Combine the OTP values with the email
      const otpValues = { ...values, email };
      const response = await axios.post(`${BASE_URL}/user/verify/`, otpValues);
      console.log(response.data); 
      // navigate("/user-login");
      setShowOTPModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
            <h2 className="text-2xl font-bold mb-4">Registration</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegistration}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
                    Mobile Number
                  </label>
                  <Field
                    type="text"
                    name="mobile"
                    id="mobile"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
                </div>

                {/* {showOTPInput && (
                  <div className="mb-4">
                    <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
                      OTP
                    </label>
                    <Field
                      type="text"
                      name="otp"
                      id="otp"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
                  </div>
                )} */}
              <div>
            
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                  onClick={() => setShowOTPModal(true)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Send OTP
                  </button>
                </div> 
                
              </Form>
            </Formik>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          {showOTPModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div> */}

            {/* This element is to trick the browser into centering the modal contents */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h4>We have sent an OTP to your email. Please check your inbox.</h4>
                <Formik
                  initialValues={{ otp: '' }}
                  validationSchema={Yup.object().shape({
                    otp: Yup.string().required('OTP is required')
                  })}
                  onSubmit={handleOTPSubmit}
                >
                    {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-4">
                      <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
                        OTP
                      </label>
                      <Field
                        type="text"
                        name="otp"
                        id="otp"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        disabled={isSubmitting} 
                      >
                        Verify OTP
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setShowOTPModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                    )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;






























// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import {useNavigate, json } from 'react-router-dom';

// const RegistrationModal = ({ onClose }) => {
//   const [regMessage, setRegMessage] = useState('');
//   const [showOTPInput, setShowOTPInput] = useState(false); 
//   const navigate = useNavigate();

//   // const { handleSubmit } = F

//   const initialValues = {
//     email: '',
//     name: '',
//     password: '',
//     mobile: '',
//     address: ''
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     name: Yup.string().required('Username is required'),
//     password: Yup.string().required('Password is required'),
//     mobile: Yup.string().required('Mobile number is required'),
//     address: Yup.string()
//   });

//   const handleRegistration = async (values, {setSubmitting}) => {
//    // console.log(JSON.stringify(values, null, 2));
//     const response = await axios.post('http://127.0.0.1:8000/user/register/', values);
//     console.log(response.data);
//    // setRegMessage('For email verification we have sent an OTP to your mail id. ');
//     setShowOTPInput(true);

//   };

//   const handleOTPSubmit = async (values, { setSubmitting }) => {
//     try {
//       const response = await axios.post('http://localhost:8000/user/verify', values);
//       console.log(response.data);
//       <navigate to="/user-login"/>
//     } catch (error) {
//       console.log(error);
//       // Handle any error that occurred while verifying the OTP
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed z-10 inset-0 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>
//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
//         &#8203;
//         <div
//           className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="modal-headline"
//         >
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <h2 className="text-2xl font-bold mb-4">Registration</h2>
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={handleRegistration}
//             >
//               <Form>
//                 <div className="mb-4">
//                   <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//                     Email
//                   </label>
//                   <Field
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   />
//                   <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
//                     Name
//                   </label>
//                   <Field
//                     type="text"
//                     name="name"
//                     id="name"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   />
//                   <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//                     Password
//                   </label>
//                   <Field
//                     type="password"
//                     name="password"
//                     id="password"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   />
//                   <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
//                     Mobile Number
//                   </label>
//                   <Field
//                     type="text"
//                     name="mobile"
//                     id="mobile"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   />
//                   <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
//                 </div>

//                 {/* {showOTPInput && (
//                   <div className="mb-4">
//                     <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
//                       OTP
//                     </label>
//                     <Field
//                       type="text"
//                       name="otp"
//                       id="otp"
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     />
//                     <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
//                   </div>
//                 )} */}
//                 { showOTPInput ? null : <div>
            
//                   <button
//                     type="button"
//                     className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                     onClick={onClose}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white py-2 px-4 rounded"
//                   >
//                     Send OTP
//                   </button>
//                 </div> 
//                 }
//               </Form>
//             </Formik>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             {showOTPInput ? (
                
//               <Formik
//                 initialValues={{ otp: '' }}
//                 validationSchema={Yup.object().shape({
//                   otp: Yup.string().required('OTP is required')
//                 })}
//                 onSubmit={handleOTPSubmit}
//               >
//                 <Form>
//                {/* <h4> We have sent an OTP to your mail-id Pls check</h4>{' '}
//                                     <a href="https://www.gmail.com" className="text-blue-700 hover:underline dark:text-blue-500">
//                                        Click here
//                                     </a> */}
//                   <div className="mb-4">
//                     <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
//                       OTP
//                     </label>
//                     <Field
//                       type="text"
//                       name="otp"
//                       id="otp"
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     />
//                     <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
//                   </div>
//                   <div className="flex justify-between">
//                     <button
//                       type="submit"
//                       className="bg-blue-500 text-white py-2 px-4 rounded"
//                       onClick={onClose}
//                     >
//                       Verify OTP
//                     </button>
//                     <button
//                       type="button"
//                       className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                       onClick={onClose}
//                     >
//                       Cancel
//                     </button>
                    
//                   </div>
//                 </Form>
//               </Formik>
//             ) : (
//               null
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationModal;






