import React, { createContext, use } from "react";
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
export const userDataContext = createContext();

function UserContext({ children }) {

  // Automatically detect if running on Vercel production or local development
  const serverUrl = import.meta.env.VITE_SERVER_URL || 
    (window.location.hostname.includes("localhost") || window.location.hostname.includes("127.0.0.1")
      ? "http://localhost:8000"
      : "https://backend-xi-ten-86.vercel.app");
  const [userData,setUserData]=useState(null)
   const[frontendImage,setFrontendImage]=useState(null)
      const[backendImage,setBackendImage]=useState(null)
const[selectedImage,setSelectedImage]=useState(null)
  const handleCurrentUser=async ()=>{
    try {
      const token = localStorage.getItem("token")
      const result=await axios.get(`${serverUrl}/api/user/current`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials:true
      })
      setUserData(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

const getGeminiResponse=async (command)=>{
  try {
    const token = localStorage.getItem("token")
    const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials:true
    })
    return result.data
  } catch (error) {
    console.log(error)
  }
}







  useEffect(()=>{
    handleCurrentUser()
  },[])


  const value = {
    serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage,getGeminiResponse
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;