import React, { useContext, useState } from 'react'
import Logo from '../assets/MentorHubLogo.png'
import google from '../assets/google.webp'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../Redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Utils/Firebase';
function Signup() {
    let navigate = useNavigate()
   const dispatch = useDispatch()

  let [show, setShow] = useState(false)
 let {serverUrl} = useContext(authDataContext)
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
   const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {userData} = useSelector(state=> state.user)
   //login function 
  const handleLogin = async (e)=>{
    e.preventDefault();
    setLoading(true)
    setErrorMsg('')

    try {
        let result = await axios.post(serverUrl+'/api/auth/login',
            {email,password},
            {withCredentials:true}
        ) 
        navigate('/')
        dispatch(setUserData(result.data))
        console.log(result.data);
    } catch (error) {
        console.log(error);
        setErrorMsg(
          error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }finally{
      setLoading(false);
    }
  }

  //google login function
const googleLogin = async()=>{
        try {
            const response = await signInWithPopup(auth,provider)
            let user = response.user
            let name = user.displayName
            let email = user.email
            let result = await axios.post(serverUrl+'/api/auth/googlelogin',
                {name,email},
                {withCredentials:true}
            )
            navigate('/')
            console.log(result.data);
        } catch (error) {
            console.log("error",error);
        }
  }


  return (
   <div className="w-[100vw] h-[100vh] 
  bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]
  flex flex-col text-white items-center justify-start">

  {/* Header */}
  <div
    className="w-full h-[80px] flex items-center justify-start text-[25px] font-sans gap-[10px] cursor-pointer"
    onClick={userData?(navigate('/')):""}
  >
    <img className="w-[40px] rounded-full ml-2" src={Logo} alt="" />
    <h1 className="text-[25px] font-sans text-white font-semibold">MentorHub</h1>
  </div>

  {/* Title Section */}
  <div className="w-full h-[80px] flex flex-col items-center justify-center gap-[7px]">
    <span className="text-[25px] font-semibold">Login</span>
    {errorMsg && (
          <span className="text-red-400 text-[14px] font-medium">
            {errorMsg}
          </span>)}
  </div>

  {/* Form Container */}
  <div className="max-w-[500px] w-[90%] h-[400px] border border-blue-300/30 bg-blue-900/20 backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center mb-10">
    <form
      action=""
      className="w-[90%] h-[90%] flex flex-col items-center justify-center gap-[20px] "
      onSubmit={handleLogin}
    >
      {/* Google Signup */}
      <div
        className="w-full h-[50px] bg-blue-600/80 hover:bg-blue-700 flex items-center justify-center gap-[10px] p-[20px] cursor-pointer rounded-lg transition-all"
        onClick={googleLogin}
      >
        <img className="w-[40px] rounded-2xl" src={google} alt="" />{" "}
        <span className="font-medium">Register with Google</span>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] flex items-center justify-center gap-[20px]">
        <div className="w-[50%] h-[1px] bg-blue-200/30"></div> Or{" "}
        <div className="w-[50%] h-[1px] bg-blue-200/30"></div>
      </div>

      {/* Inputs */}
      <div className="w-[90%] flex flex-col items-center justify-center gap-[10px] relative">
        {/* <input
          type="text"
          className="w-full h-[50px] border border-blue-300/40 rounded-lg backdrop-blur-sm bg-transparent placeholder:text-blue-100 text-white font-semibold p-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        /> */}
        <input
          type="email"
          className="w-full h-[50px] border border-blue-300/40 rounded-lg backdrop-blur-sm bg-transparent placeholder:text-blue-100 text-white font-semibold p-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type={show ? "text" : "password"}
          className="w-full h-[50px] border border-blue-300/40 rounded-lg backdrop-blur-sm bg-transparent placeholder:text-blue-100 text-white font-semibold p-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {!show && (
          <FaEye
            className="w-[20px] h-[20px] absolute right-[5%] top-[35%] text-blue-300 cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          />
        )}
        {show && (
          <FaEyeSlash
            className="w-[20px] h-[20px] absolute right-[5%] top-[30%] text-blue-300 cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          />
        )}

        <button className="w-full h-[40px] mt-[15px] bg-blue-600 hover:bg-blue-700 flex items-center justify-center rounded-lg transition-all">
           {loading ? "Logging in..." : "Login"}
        </button>

        <p className="flex gap-[10px] text-blue-100 text-[15px]">
          <span>You Have'nt Any Account?</span>
          <span
            className="text-blue-300 hover:text-blue-400 cursor-pointer font-semibold"
            onClick={() => navigate("/signup")}
          >
            Create new Account
          </span>
        </p>
      </div>
    </form>
  </div>
</div>

  )
}

export default Signup


 