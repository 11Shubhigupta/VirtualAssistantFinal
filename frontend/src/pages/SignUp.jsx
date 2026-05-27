import React, { use, useContext } from 'react'
import bg from "../assets/authPg.jpg"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios";
const SignUp = () => {
  const [showPassword,setShowPassword]=useState(false)
  const navigate=useNavigate()
  const {serverUrl,userData,setUserData}=useContext(userDataContext) 
  const [name,SetName]=useState("")
  const [email,SetEmail]=useState("")
    const[loading,setLoading]=useState(false)
  const [password,setPassword]=useState("")
  const[err,setErr]=useState("")

  //api ko fetch krne ja rhe  or iske phle usercontext me code likhe hai
const handleSignUp=async (e)=>{
  e.preventDefault()
  setErr("")
    setLoading(true)
  try {
    let result=await axios.post(`${serverUrl}/api/auth/signup`,{
      name,email,password
    },{withCredentials:true})
  setUserData(result.data)
     setLoading(false)
     navigate("/customize")
  } catch (error) {
     setUserData(null)
     setLoading(false)
    setErr(error.response.data.message)
  }
  
}



  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`}} >
   <form className='w-[90%] h-[600px] max-w-[500px] bg-[black/90] backdrop-blur shadow-lg shadow-black flex flex-col 
       items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignUp}>

     <h1 className='text-black text-[30px] font-semibold mb-[30px]'>Register to <span className='text-yellow-400'>Virtual Assistant</span></h1>

<input type="text" placeholder='Enter your Name' className='w-full h-[60px] outline-none border-2 border-black bg-trnsparent
text-black placeholder-gray-300 px-[20px] py-[10px] rounded-full' required onChange={(e)=>SetName(e.target.value)} value={name}/>


<input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-black bg-trnsparent
text-black placeholder-gray-300 px-[20px] py-[10px] rounded-full' required onChange={(e)=>SetEmail(e.target.value)} value={email}/>

<div className='w-full h-[60px] border-2 border-black bg-trnsparent text-black rounded-full relative '>

  <input type={showPassword?"text":"password"} placeholder='password' className='w-full h-full rouded-full outline-none bg-transparent 
  placeholder-gray-300 px-[20px] py-[10px] rounded-full' required onChange={(e)=>setPassword(e.target.value)} value={password}/>

  {!showPassword &&  <FaEye className='absolute top-[15px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer' onClick={()=>setShowPassword(true)}/>}
 
 {showPassword &&  <FaEyeSlash className='absolute top-[15px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer' onClick={()=>setShowPassword(false)}/>}


</div>
{err.length>0 && <p className='text-red-500'>
  *{err}
  </p>}
<button className='min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-black font-semibold text=[19px] ' disabled={loading}>{loading?"Loading...":"Sign up"}</button>
<p className='text-[white] text-[18px] cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account?<span className='text-black'>Sign In</span></p>
       </form>
    </div>
  )
}

export default SignUp
