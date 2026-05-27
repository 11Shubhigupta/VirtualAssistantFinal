import React, { useContext, useRef, useState } from 'react'
import Card from '../components/Card'
import { IoMdArrowRoundBack } from "react-icons/io";
import image1 from "../assets/ai image1.jpg"
import image2 from "../assets/ai image2.jpg"
import image3 from "../assets/ai image3.jpg"
import image4 from "../assets/ai image4.jpg"
import image5 from "../assets/ai image5.jpg"

import image7 from "../assets/ai image7.jpg"
import image8 from "../assets/ai image8.jpg"

import { IoImages } from "react-icons/io5";
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
function Customize() {
 const {  serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage}=useContext(userDataContext)
const navigate=useNavigate()
const inputImage=useRef()
const handleImage=(e)=>{
  const file=e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))
}
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[10px] '>
              <IoMdArrowRoundBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate("/")} />

      <h1 className='text-white text-[30px] text-center mb-[30px]'>Select your <span className='text-blue'> Assistant Image</span></h1>
      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px] '>
    <Card image={image1}/>
     <Card image={image2}/>
      <Card image={image3}/>
       <Card image={image4}/>
        <Card image={image5}/>
         
       <Card image={image7}/>
        <Card image={image8}/>
   <div className={`w-[70px] h-[150] lg:w-[150px] lg:h-[250px] bg-[#0000ff66] border-2 border-[#020220] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${selectedImage=="input"?" border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={()=>{
    inputImage.current.click()
    setSelectedImage("input")
    }}>
{!frontendImage && <IoImages className='text-white w-[25px] h-[25px]'/>}
{frontendImage && <img src={frontendImage} className='h-full object-cover'/>}


      
    </div>
 <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>  
      </div>
      {selectedImage && <button className='min-w-[150px] h-[60px] mt-[10px] bg-white rounded-full text-black font-semibold text=[19px] cursor-pointer' onClick={()=>navigate("/customize2")} >Next</button>}
   
    </div>
  )
}

export default Customize

