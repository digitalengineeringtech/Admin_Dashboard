// import { useEffect, useState } from "react";
// import TextInput from "../components/inputbox/TextInput";
// import Button from "../components/inputbox/Button";
// import useLogin from "../api/hooks/UseLogin";
// import useTokenStorage from "../utils/useDecrypt";
// import { useNavigate } from "react-router-dom";

// const InstallerLogin = () => {
//   const [email, setEmail] = useState();
//   const [eError, setEError] = useState();
//   const [pswd, setPswd] = useState();
//   const [pError, setPError] = useState();
//   const navigate = useNavigate();

//   const [{ data, loading, error }, fetchData] = useLogin();
//   const { saveToken } = useTokenStorage();

//   const handleSubmit = () => {
//     if (email == null || pswd == null) {
//       setEError("email require !");
//       setPError("password require !");
//     } else {
//       setEError(null);
//       setPError(null);
//       const user = {
//         email: email,
//         password: pswd,
//       };
//       console.log(user);
//       fetchData("user/login", user);
//     }
//   };

//   useEffect(() => {
//     if (data.token) {
//       console.log(data.token);
//       saveToken(data.token);
//       // navigate("/");
//     }
//   }, [data, loading, error, saveToken, navigate]);

//   console.log(data);

//   return (
//     <div className="flex justify-center h-screen items-center login_bg">
//       <div className="flex bg-secondary rounded-2xl w-[1000px] pt-6 pb-14 flex-col justify-center items-center">
//         <div className=" w-full mb-10  ">
//           <div className="border-b-2 mx-auto w-[80%] pb-4 border-detail/20">
//             <img
//               className="h-14 mx-auto"
//               src="../../static/images/det_logo_dark.png"
//               alt="dd"
//             />
//           </div>
//         </div>
//         <div className="flex  items-center w-full">
//           <div className="w-[50%] items-center text-center ">
//             <form className="w-[90%] flex flex-col items-center gap-4 mx-auto   ">
//               <h1 className="text-3xl mb-2 text-detail font-semibold">
//                 INSTALLER FORM
//               </h1>
//               <TextInput
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 placeholder="Enter your Email . . ."
//               />
//               {eError && (
//                 <div className="text-red-300 me-auto ms-[80px] mt-[-13px] mb-[-10px]">
//                   {eError}
//                 </div>
//               )}

//               <TextInput
//                 value={pswd}
//                 onChange={(e) => setPswd(e.target.value)}
//                 type="password"
//                 placeholder="Enter your Password . . ."
//               />
//               {pError && (
//                 <div className="text-red-300 me-auto ms-[80px] mt-[-13px] mb-[-10px]">
//                   {pError}
//                 </div>
//               )}
//               <Button
//                 text="LOGIN"
//                 onClick={() => handleSubmit()}
//                 className="w-[315px] text-xl"
//               />
//               <p className="text-text text-xs mt-3">
//                 © 2024 Digital Engineering Tech Ltd. All rights reserved.
//               </p>
//             </form>
//           </div>
//           <div className="w-[50%]  text-center ">
//             <div className="w-[90%] ml-[-15px] mx-auto">
//               <img src="../../static/images/login_ill.jpg" alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstallerLogin;
