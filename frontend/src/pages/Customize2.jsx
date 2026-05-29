import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
function Customize2() {
    const {userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext)
    const [assistantName,setAssistantName]=useState(userData?.assistantName||"")
    const [loading,setLoading]=useState(false)
    const [err,setErr]=useState("")
    const navigate=useNavigate()
    const handleUpdateAssistant=async()=>{
        setLoading(true)
        setErr("")
        try {
            let formData=new FormData()
            formData.append("assistantName",assistantName)
            if(backendImage){
                  formData.append("assistantImage",backendImage)
            }else{
                formData.append("imageUrl",selectedImage)
            }
            const token = localStorage.getItem("token")
            const result =await axios.post(`${serverUrl}/api/user/update`,formData,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials:true
            })
         setLoading(false)
            console.log(result.data)
            setUserData(result.data)
            navigate("/")
        } catch (error) {
             setLoading(false)
            console.log(error)
            setErr(error.response?.data?.message || error.message || "Failed to create assistant")
        }
    }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[10px] relative '>
        <IoMdArrowRoundBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate("/customize")} />
       <h1 className='text-white text-[30px] text-center mb-[30px]'>Enter your <span className='text-blue-400'>Assistant's Name</span></h1>
       <input type="text" placeholder='e.g: shifra' className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white/20 bg-white/5 text-white placeholder-gray-400 px-[20px] py-[10px] rounded-full focus:border-blue-500 focus:bg-white/10 transition-all duration-300' required  onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}/>

{err.length > 0 && <p className='text-red-500 text-sm mt-[10px]'>*{err}</p>}

{assistantName && <button className='min-w-[300px] h-[60px] mt-[20px] bg-white hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 rounded-full text-black font-semibold text-[19px] cursor-pointer' disabled={loading} onClick={()=>{

    handleUpdateAssistant()

}} >{!loading?"Finally Create Your Assistant":"Loading..."}</button>}


   
   
    </div>
  )
}

export default Customize2
