// import React, { useContext } from 'react'
// import { userDataContext } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { useRef } from 'react'
// import { RiMenu3Line } from "react-icons/ri";
// import { RxCross1 } from "react-icons/rx";
// import aiImg from "../assets/ai.gif"
// import userImg from "../assets/user.gif"
// function Home() {

//   const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)

//   const navigate = useNavigate()

//   const [listening, setListening] = useState(false)
// const [userText,setUserText]=useState("")
// const [aiText,setAiText]=useState("")
//   const isSpeakingRef = useRef(false)
//   const recognitionRef = useRef(null)
//   const [ham,setHam]=useState(false)
//   const isRecognizingRef = useRef(false)

//   const synth = window.speechSynthesis

//   const handleLogOut = async () => {

//     try {

//       await axios.get(`${serverUrl}/api/auth/logout`, {
//         withCredentials: true
//       })

//       setUserData(null)
//       navigate("/signin")

//     } catch (error) {

//       setUserData(null)
//       console.log(error)

//     }
//   }


//   const safeRecognition = () => {

//     if (
//       !isSpeakingRef.current &&
//       !isRecognizingRef.current &&
//       recognitionRef.current &&
//       document.visibilityState === "visible"
//     ) {

//       try {

//         recognitionRef.current.start()

//         console.log("recognition requested to start")

//       } catch (error) {

//         if (error.name !== "InvalidStateError") {
//           console.log(error)
//         }

//       }
//     }
//   }


//   const speak = (text) => {

//     synth.cancel()

//     const utterence = new SpeechSynthesisUtterance(text)

//     isSpeakingRef.current = true

//     utterence.onstart = () => {

//       if (recognitionRef.current) {
//         recognitionRef.current.abort()
//       }

//       isRecognizingRef.current = false
//     }

//     utterence.onend = () => {
//    setAiText("")
//       isSpeakingRef.current = false

//       setTimeout(() => {

//         if (!document.hidden) {
//           safeRecognition()
//         }

//       }, 1000)

//     }

//     synth.speak(utterence)
//   }


//   const handleCommand = (data) => {

//     if (!data) {
//       console.log("No response from backend")
//       return
//     }

//     const { type, userInput, response } = data

//     speak(response)

//     if (type === 'google-search') {

//       const query = encodeURIComponent(userInput)

//       window.open(
//         `https://www.google.com/search?q=${query}`,
//         '_blank'
//       )
//     }

//     if (type === 'calculator-open') {

//       window.open(
//         `https://www.google.com/search?q=calculator`,
//         '_blank'
//       )
//     }

//     if (type === 'instagram-open') {

//       window.open(
//         `https://www.instagram.com/`,
//         '_blank'
//       )
//     }

//     if (type === 'facebook-open') {

//       window.open(
//         `https://www.facebook.com/`,
//         '_blank'
//       )
//     }

//     if (type === 'weather-show') {

//       window.open(
//         `https://www.google.com/search?q=weather`,
//         '_blank'
//       )
//     }

//     if (type === 'youtube-search' || type === 'youtube-play') {

//       const query = encodeURIComponent(userInput)

//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         '_blank'
//       )
//     }
//   }


//   useEffect(() => {

//     const SpeechRecognition =
//       window.SpeechRecognition ||
//       window.webkitSpeechRecognition

//     if (!SpeechRecognition) {
//       console.log("Speech Recognition not supported")
//       return
//     }

//     const recognition = new SpeechRecognition()

//     recognition.continuous = false
//     recognition.lang = 'en-US'
//     recognition.interimResults = false

//     recognitionRef.current = recognition


//     recognition.onstart = () => {

//       console.log("Recognition started")

//       isRecognizingRef.current = true

//       setListening(true)
//     }


//     recognition.onend = () => {

//       console.log("Recognition ended")

//       isRecognizingRef.current = false

//       setListening(false)

//       if (!isSpeakingRef.current) {

//         setTimeout(() => {

//           if (!document.hidden) {
//             safeRecognition()
//           }

//         }, 1000)

//       }
//     }


//     recognition.onerror = (event) => {

//       console.warn("Recognition error:", event.error)

//       isRecognizingRef.current = false

//       setListening(false)

//       if (
//         event.error === "not-allowed" ||
//         event.error === "service-not-allowed"
//       ) {
//         return
//       }

//       if (
//         event.error !== "aborted" &&
//         event.error !== "no-speech" &&
//         !isSpeakingRef.current
//       ) {

//         setTimeout(() => {

//           if (!document.hidden) {
//             safeRecognition()
//           }

//         }, 1000)

//       }
//     }


//     recognition.onresult = async (e) => {

//       const transcript =
//         e.results[e.results.length - 1][0].transcript.trim()

//       console.log("heard:" + transcript)

//       if (
//         transcript.toLowerCase().includes(
//           userData?.assistantName?.toLowerCase()
//         )
//       ) {
//         setAiText("")
//            setUserText(transcript)
//         const data = await getGeminiResponse(transcript)

//         if (data) {
//           handleCommand(data)
//         }
//         setAiText(data.response)
//         setUserText("")
//       }

//     }


//     const fallback = setInterval(() => {

//       if (
//         !isSpeakingRef.current &&
//         !isRecognizingRef.current
//       ) {

//         safeRecognition()

//       }

//     }, 10000)


//     setTimeout(() => {
//       safeRecognition()
//     }, 1000)


//     return () => {

//       if (recognitionRef.current) {
//         recognitionRef.current.stop()
//       }

//       setListening(false)

//       isRecognizingRef.current = false

//       clearInterval(fallback)
//     }

//   }, [])



//   return (

//     <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[15px] overflow-hidden'>
// <RiMenu3Line className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={()=>setHam(true)} />
//      <div className={`absolute lg:hidden top-0  w-full h-full bg-[#00000053] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start ${ham?"translate-x-0":"translate-x-full"} transition-transform`}>

// <RxCross1 className=' text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]'onClick={()=>setHam(false)} />
//      <button
//         className='min-w-[150px] h-[60px]  bg-white rounded-full cursor-pointer text-black font-semibold hidden text=[19px]  '
//         onClick={handleLogOut}
//       >
//         Log Out
//       </button>

//       <button
//         className='min-w-[150px] h-[60px]  bg-white rounded-full hidden cursor-pointer text-black font-semibold text=[19px] px-[20px] py-[10px]'
//         onClick={() => navigate("/customize")}
//       >
//         Customize Your Assistant
//       </button>

// <div className='w-full h-[2px] bg-gray-400'></div>
// <h1 className='text-white font-semibold text-[19px]'>History</h1>


// <div className='w-full h-[400px] gap-[20px] overflow-y-auto flex flex-col gap-[20px] '>
//    {userData.history?.map((his)=>(
// <span className='text-gray-200 text-[18px] truncate'>{his}</span>


//    ))}
//    </div>
   
//      </div>
     
     
//       <button
//         className='min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full cursor-pointer text-black font-semibold hidden lg:block text=[19px] absolute top-[20px] right-[20px]'
//         onClick={handleLogOut}
//       >
//         Log Out
//       </button>

//       <button
//         className='min-w-[150px] h-[60px] mt-[30px] bg-white absolute top-[100px] right-[20px] rounded-full hidden lg:block cursor-pointer text-black font-semibold text=[19px] px-[20px] py-[10px]'
//         onClick={() => navigate("/customize")}
//       >
//         Customize Your Assistant
//       </button>

//       <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>

//         <img
//           src={userData?.assistantImage}
//           alt=""
//           className='h-full object-cover'
//         />

//       </div>

//       <h1 className='text-white text-[18px] font-semibold'>

//         I'm {userData?.assistantName || userData?.AssistantName}

//       </h1>
//       {!aiText &&  <img src={userImg} alt="" className='w-[200px]'/>}
      
//       {aiText &&  <img src={aiImg} alt="" className='w-[200px]'/>}
    
//     <h1 className='text-white text-[18px] font-semibold text-wrap '>{userText?userText:aiText?aiText:null}</h1>
//     </div>
//   )
// }

// export default Home

// import React, { useContext } from 'react'
// import { userDataContext } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { useRef } from 'react'
// import { RiMenu3Line } from "react-icons/ri";
// import { RxCross1 } from "react-icons/rx";
// import aiImg from "../assets/ai.gif"
// import userImg from "../assets/user.gif"

// function Home() {

//   const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)

//   const navigate = useNavigate()

//   const [listening, setListening] = useState(false)
//   const [userText, setUserText] = useState("")
//   const [aiText, setAiText] = useState("")
//   const isSpeakingRef = useRef(false)
//   const recognitionRef = useRef(null)
//   const [ham, setHam] = useState(false)
//   const isRecognizingRef = useRef(false)

//   const synth = window.speechSynthesis

//   const handleLogOut = async () => {

//     try {

//       await axios.get(`${serverUrl}/api/auth/logout`, {
//         withCredentials: true
//       })

//       setUserData(null)
//       navigate("/signin")

//     } catch (error) {

//       setUserData(null)
//       console.log(error)

//     }
//   }

//  const safeRecognition = () => {

//   if (
//     recognitionRef.current &&
//     !isSpeakingRef.current &&
//     document.visibilityState === "visible"
//   ) {

//     if (isRecognizingRef.current) {
//       return
//     }

//     try {

//       recognitionRef.current.start()

//       isRecognizingRef.current = true

//       console.log("Recognition restarted")

//     } catch (error) {

//       console.log(error)

//     }
//   }
// }

//   const speak = (text) => {

//     synth.cancel()

//     const utterence = new SpeechSynthesisUtterance(text)

//     isSpeakingRef.current = true

//     utterence.onstart = () => {

//       if (recognitionRef.current) {
//         recognitionRef.current.stop()
//       }

//       isRecognizingRef.current = false
//     }

//     utterence.onend = () => {

//       setAiText("")

//       isSpeakingRef.current = false

//       setTimeout(() => {

//         if (!document.hidden) {
//           safeRecognition()
//         }

//       }, 200)

//     }

//     synth.speak(utterence)
//   }

//   const handleCommand = (data) => {

//     if (!data) {
//       console.log("No response from backend")
//       return
//     }

//     const { type, userInput, response } = data

//     speak(response)

//     if (type === 'google-search') {

//       const query = encodeURIComponent(userInput)

//       window.open(
//         `https://www.google.com/search?q=${query}`,
//         '_blank'
//       )
//     }

//     if (type === 'calculator-open') {

//       window.open(
//         `https://www.google.com/search?q=calculator`,
//         '_blank'
//       )
//     }

//     if (type === 'instagram-open') {

//       window.open(
//         `https://www.instagram.com/`,
//         '_blank'
//       )
//     }

//     if (type === 'facebook-open') {

//       window.open(
//         `https://www.facebook.com/`,
//         '_blank'
//       )
//     }

//     if (type === 'weather-show') {

//       window.open(
//         `https://www.google.com/search?q=weather`,
//         '_blank'
//       )
//     }

//     if (type === 'youtube-search' || type === 'youtube-play') {

//       const query = encodeURIComponent(userInput)

//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         '_blank'
//       )
//     }
//   }

//   useEffect(() => {

//     const SpeechRecognition =
//       window.SpeechRecognition ||
//       window.webkitSpeechRecognition

//     if (!SpeechRecognition) {
//       console.log("Speech Recognition not supported")
//       return
//     }

//     const recognition = new SpeechRecognition()

//     recognition.continuous = true
//     recognition.lang = 'en-US'
//     recognition.interimResults = true
//     recognition.maxAlternatives = 1

//     recognitionRef.current = recognition

//    recognition.onstart = () => {

//   console.log("Recognition started")

//   isRecognizingRef.current = true

//   setListening(true)
// }
//    recognition.onend = () => {

//   console.log("Recognition ended")

//   isRecognizingRef.current = false

//   setListening(false)

//   if (!isSpeakingRef.current) {

//     setTimeout(() => {

//       safeRecognition()

//     }, 200)

//   }
// }

//     recognition.onerror = (event) => {

//   console.log("Recognition error:", event.error)

//   isRecognizingRef.current = false

//   setListening(false)

//   if (
//     event.error === "not-allowed" ||
//     event.error === "service-not-allowed"
//   ) {
//     return
//   }

//   if (event.error === "aborted") {
//     return
//   }

//   setTimeout(() => {

//     safeRecognition()

//   }, 300)
// }

//     recognition.onresult = async (e) => {

//   const current =
//     e.resultIndex

//   const transcript =
//     e.results[current][0].transcript
//       .trim()
//       .toLowerCase()

//   console.log("heard:", transcript)

//   const assistantName =
//     userData?.assistantName?.toLowerCase()

//   if (
//     transcript.includes(assistantName)
//   ) {

//     recognitionRef.current.stop()

//     setUserText(transcript)

//     setAiText("")

//     const cleanText =
//       transcript.replace(assistantName, "").trim()

//     const finalText =
//       cleanText || transcript

//     const data =
//       await getGeminiResponse(finalText)

//     if (data) {

//       setAiText(data.response)

//       handleCommand(data)

//     }

//     setUserText("")
//   }
// }

//     setTimeout(() => {
//       safeRecognition()
//     }, 200)

//     return () => {

//       if (recognitionRef.current) {
//         recognitionRef.current.stop()
//       }

//       setListening(false)

//       isRecognizingRef.current = false
//     }

//   }, [])

//   return (

//     <div className='w-full min-h-screen bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[15px] overflow-hidden px-[20px] py-[30px] relative'>

//       {/* MOBILE MENU ICON */}
//       <RiMenu3Line
//         className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] z-50'
//         onClick={() => setHam(true)}
//       />

//       {/* MOBILE SIDEBAR */}
//       <div className={`fixed top-0 right-0 z-50 w-[75%] sm:w-[60%] h-screen bg-[#111827] backdrop-blur-xl p-[20px] flex flex-col gap-[20px] transition-transform duration-300 ${ham ? "translate-x-0" : "translate-x-full"}`}>

//         <RxCross1
//           className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]'
//           onClick={() => setHam(false)}
//         />

//         <button
//           className='w-full h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold text-[16px]'
//           onClick={handleLogOut}
//         >
//           Log Out
//         </button>

//         <button
//           className='w-full h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold text-[16px]'
//           onClick={() => navigate("/customize")}
//         >
//           Customize Your Assistant
//         </button>

//         <button
//           className='w-full h-[55px] bg-yellow-400 rounded-full cursor-pointer text-black font-semibold text-[16px]'
//           onClick={() => navigate("/games")}
//         >
//           Games
//         </button>

//         <div className='w-full h-[2px] bg-gray-500'></div>

//         <h1 className='text-white font-semibold text-[20px]'>
//           History
//         </h1>

//         <div className='w-full flex flex-col gap-[15px] overflow-y-auto'>

//           {userData.history?.map((his, index) => (

//             <span
//               key={index}
//               className='text-gray-200 text-[16px] break-words'
//             >
//               {his}
//             </span>

//           ))}

//         </div>

//       </div>

//       {/* DESKTOP BUTTONS */}

//       <button
//         className='w-[180px] h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold hidden lg:block absolute top-[20px] right-[20px]'
//         onClick={handleLogOut}
//       >
//         Log Out
//       </button>

//       <button
//         className='w-[180px] h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold hidden lg:block absolute top-[90px] right-[20px]'
//         onClick={() => navigate("/customize")}
//       >
//         Customize Your Assistant
//       </button>

//       <button
//         className='w-[180px] h-[55px] bg-yellow-400 rounded-full cursor-pointer text-black font-semibold hidden lg:block absolute top-[160px] right-[20px]'
//         onClick={() => navigate("/games")}
//       >
//         Games
//       </button>

//       {/* ASSISTANT IMAGE */}

//       <div className='w-[250px] sm:w-[300px] h-[320px] sm:h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-2xl'>

//         <img
//           src={userData?.assistantImage}
//           alt=""
//           className='h-full w-full object-cover'
//         />

//       </div>

//       {/* NAME */}

//       <h1 className='text-white text-[18px] font-semibold text-center'>

//         I'm {userData?.assistantName || userData?.AssistantName}

//       </h1>

//       {/* GIF */}

//       {!aiText &&
//         <img
//           src={userImg}
//           alt=""
//           className='w-[140px] sm:w-[200px]'
//         />
//       }

//       {aiText &&
//         <img
//           src={aiImg}
//           alt=""
//           className='w-[140px] sm:w-[200px]'
//         />
//       }

//       {/* TEXT */}

//       <h1 className='text-white text-[16px] sm:text-[18px] font-semibold text-center px-[10px] max-w-[90%] break-words'>

//         {userText ? userText : aiText ? aiText : null}

//       </h1>

//     </div>
//   )
// }

// export default Home

// import React, { useContext } from 'react'
// import { userDataContext } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { useRef } from 'react'
// import { RiMenu3Line } from "react-icons/ri";
// import { RxCross1 } from "react-icons/rx";
// import aiImg from "../assets/ai.gif"
// import userImg from "../assets/user.gif"

// function Home() {

//   const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)

//   const navigate = useNavigate()

//   const [listening, setListening] = useState(false)
//   const [userText, setUserText] = useState("")
//   const [aiText, setAiText] = useState("")

//   const isSpeakingRef = useRef(false)
//   const recognitionRef = useRef(null)
//   const isRecognizingRef = useRef(false)

//   const [ham, setHam] = useState(false)

//   const synth = window.speechSynthesis

//   const handleLogOut = async () => {

//     try {

//       await axios.get(`${serverUrl}/api/auth/logout`, {
//         withCredentials: true
//       })

//       setUserData(null)

//       navigate("/signin")

//     } catch (error) {

//       setUserData(null)

//       console.log(error)

//     }
//   }

//   const safeRecognition = () => {

//     if (
//       recognitionRef.current &&
//       !isSpeakingRef.current &&
//       !isRecognizingRef.current &&
//       document.visibilityState === "visible"
//     ) {

//       try {

//         recognitionRef.current.start()

//         console.log("Recognition restarted")

//       } catch (error) {

//         if (error.name !== "InvalidStateError") {
//           console.log(error)
//         }

//       }
//     }
//   }

//   const speak = (text) => {

//     synth.cancel()

//     const utterence =
//       new SpeechSynthesisUtterance(text)

//     isSpeakingRef.current = true

//     utterence.onstart = () => {

//       if (recognitionRef.current) {

//         recognitionRef.current.stop()

//       }

//       isRecognizingRef.current = false
//     }

//     utterence.onend = () => {

//       setAiText("")

//       isSpeakingRef.current = false

//       setTimeout(() => {

//         safeRecognition()

//       }, 100)

//     }

//     synth.speak(utterence)
//   }

//   const handleCommand = (data) => {

//     if (!data) {
//       return
//     }

//     const { type, userInput, response } = data

//     speak(response)

//     if (type === 'google-search') {

//       const query =
//         encodeURIComponent(userInput)

//       window.open(
//         `https://www.google.com/search?q=${query}`,
//         '_blank'
//       )
//     }

//     if (type === 'calculator-open') {

//       window.open(
//         `https://www.google.com/search?q=calculator`,
//         '_blank'
//       )
//     }

//     if (type === 'instagram-open') {

//       window.open(
//         `https://www.instagram.com/`,
//         '_blank'
//       )
//     }

//     if (type === 'facebook-open') {

//       window.open(
//         `https://www.facebook.com/`,
//         '_blank'
//       )
//     }

//     if (type === 'weather-show') {

//       window.open(
//         `https://www.google.com/search?q=weather`,
//         '_blank'
//       )
//     }

//     if (
//       type === 'youtube-search' ||
//       type === 'youtube-play'
//     ) {

//       const query =
//         encodeURIComponent(userInput)

//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         '_blank'
//       )
//     }
//   }

//   useEffect(() => {

//     const SpeechRecognition =
//       window.SpeechRecognition ||
//       window.webkitSpeechRecognition

//     if (!SpeechRecognition) {

//       console.log("Speech Recognition not supported")

//       return
//     }

//     const recognition =
//       new SpeechRecognition()

//     recognition.continuous = true
//     recognition.lang = 'en-US'
//     recognition.interimResults = true
//     recognition.maxAlternatives = 1

//     recognitionRef.current = recognition

//     recognition.onstart = () => {

//       console.log("Recognition started")

//       isRecognizingRef.current = true

//       setListening(true)
//     }

//     recognition.onend = () => {

//       console.log("Recognition ended")

//       isRecognizingRef.current = false

//       setListening(false)

//       if (!isSpeakingRef.current) {

//         setTimeout(() => {

//           safeRecognition()

//         }, 100)

//       }
//     }

//     recognition.onerror = (event) => {

//       console.log(
//         "Recognition error:",
//         event.error
//       )

//       isRecognizingRef.current = false

//       setListening(false)

//       if (
//         event.error === "not-allowed" ||
//         event.error === "service-not-allowed"
//       ) {
//         return
//       }

//       if (
//         event.error === "aborted"
//       ) {
//         return
//       }

//       setTimeout(() => {

//         safeRecognition()

//       }, 100)
//     }

//     recognition.onresult = async (e) => {

//       const transcript =
//         Array.from(e.results)
//           .map(result => result[0].transcript)
//           .join("")
//           .toLowerCase()
//           .trim()

//       console.log("heard:", transcript)

//       const assistantName =
//         userData?.assistantName
//           ?.toLowerCase()

//       if (
//         assistantName &&
//         transcript.includes(assistantName)
//       ) {

//         recognition.stop()

//         setUserText(transcript)

//         setAiText("")

//         const cleanText =
//           transcript
//             .replace(assistantName, "")
//             .trim()

//         const finalText =
//           cleanText || transcript

//         const data =
//           await getGeminiResponse(finalText)

//         if (data) {

//           setAiText(data.response)

//           handleCommand(data)
//         }

//         setUserText("")
//       }
//     }

//     setTimeout(() => {

//       safeRecognition()

//     }, 100)

//     const warmup = setInterval(() => {

//       if (
//         !isRecognizingRef.current &&
//         !isSpeakingRef.current
//       ) {

//         safeRecognition()
//       }

//     }, 1500)

//     return () => {

//       clearInterval(warmup)

//       if (recognitionRef.current) {

//         recognitionRef.current.stop()
//       }

//       setListening(false)

//       isRecognizingRef.current = false
//     }

//   }, [])

//   return (

//     <div className='w-full min-h-screen bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[15px] overflow-hidden px-[20px] py-[30px] relative'>

//       <RiMenu3Line
//         className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] z-50'
//         onClick={() => setHam(true)}
//       />

//       <div className={`fixed top-0 right-0 z-50 w-[75%] sm:w-[60%] h-screen bg-[#111827] backdrop-blur-xl p-[20px] flex flex-col gap-[20px] transition-transform duration-300 ${ham ? "translate-x-0" : "translate-x-full"}`}>

//         <RxCross1
//           className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]'
//           onClick={() => setHam(false)}
//         />

//         <button
//           className='w-full h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold text-[16px]'
//           onClick={handleLogOut}
//         >
//           Log Out
//         </button>

//         <button
//           className='w-full h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold text-[16px]'
//           onClick={() => navigate("/customize")}
//         >
//           Customize Your Assistant
//         </button>

//         <button
//           className='w-full h-[55px] bg-yellow-400 rounded-full cursor-pointer text-black font-semibold text-[16px]'
//           onClick={() => navigate("/games")}
//         >
//           Games
//         </button>

//         <div className='w-full h-[2px] bg-gray-500'></div>

//         <h1 className='text-white font-semibold text-[20px]'>
//           History
//         </h1>

//         <div className='w-full flex flex-col gap-[15px] overflow-y-auto'>

//           {userData.history?.map((his, index) => (

//             <span
//               key={index}
//               className='text-gray-200 text-[16px] break-words'
//             >
//               {his}
//             </span>

//           ))}

//         </div>

//       </div>

//       <button
//         className='w-[180px] h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold hidden lg:block absolute top-[20px] right-[20px]'
//         onClick={handleLogOut}
//       >
//         Log Out
//       </button>

//       <button
//         className='w-[180px] h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold hidden lg:block absolute top-[90px] right-[20px]'
//         onClick={() => navigate("/customize")}
//       >
//         Customize Your Assistant
//       </button>

//       <button
//         className='w-[180px] h-[55px] bg-yellow-400 rounded-full cursor-pointer text-black font-semibold hidden lg:block absolute top-[160px] right-[20px]'
//         onClick={() => navigate("/games")}
//       >
//         Games
//       </button>

//       <div className='w-[250px] sm:w-[300px] h-[320px] sm:h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-2xl'>

//         <img
//           src={userData?.assistantImage}
//           alt=""
//           className='h-full w-full object-cover'
//         />

//       </div>

//       <h1 className='text-white text-[18px] font-semibold text-center'>

//         I'm {userData?.assistantName || userData?.AssistantName}

//       </h1>

//       {!aiText &&

//         <img
//           src={userImg}
//           alt=""
//           className='w-[140px] sm:w-[200px]'
//         />
//       }

//       {aiText &&

//         <img
//           src={aiImg}
//           alt=""
//           className='w-[140px] sm:w-[200px]'
//         />
//       }

//       <h1 className='text-white text-[16px] sm:text-[18px] font-semibold text-center px-[10px] max-w-[90%] break-words'>

//         {userText
//           ? userText
//           : aiText
//             ? aiText
//             : null}

//       </h1>

//     </div>
//   )
// }

// export default Home

import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { RiMenu3Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { FaMicrophone } from "react-icons/fa";
import aiImg from "../assets/ai.gif"
import userImg from "../assets/user.gif"

function Home() {

  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)

  const navigate = useNavigate()

  const [listening, setListening] = useState(false)
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("")

  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)

  const [ham, setHam] = useState(false)

  const synth = window.speechSynthesis

  const handleLogOut = async () => {

    try {

      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true
      })

      setUserData(null)

      navigate("/signin")

    } catch (error) {

      setUserData(null)

      console.log(error)

    }
  }

  const startListening = () => {

    if (
      recognitionRef.current &&
      !isSpeakingRef.current
    ) {

      try {

        recognitionRef.current.start()

      } catch (error) {

        console.log(error)

      }
    }
  }

  const speak = (text) => {

    synth.cancel()

    const utterence =
      new SpeechSynthesisUtterance(text)

    isSpeakingRef.current = true

    utterence.onstart = () => {

      if (recognitionRef.current) {

        recognitionRef.current.stop()

      }
    }

    utterence.onend = () => {

      setAiText("")

      isSpeakingRef.current = false
    }

    synth.speak(utterence)
  }

  const handleCommand = (data) => {

    if (!data) {
      return
    }

    const { type, userInput, response } = data

    speak(response)

    if (type === 'google-search') {

      const query =
        encodeURIComponent(userInput)

      window.open(
        `https://www.google.com/search?q=${query}`,
        '_blank'
      )
    }

    if (type === 'calculator-open') {

      window.open(
        `https://www.google.com/search?q=calculator`,
        '_blank'
      )
    }

    if (type === 'instagram-open') {

      window.open(
        `https://www.instagram.com/`,
        '_blank'
      )
    }

    if (type === 'facebook-open') {

      window.open(
        `https://www.facebook.com/`,
        '_blank'
      )
    }

    if (type === 'weather-show') {

      window.open(
        `https://www.google.com/search?q=weather`,
        '_blank'
      )
    }

    if (
      type === 'youtube-search' ||
      type === 'youtube-play'
    ) {

      const query =
        encodeURIComponent(userInput)

      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        '_blank'
      )
    }
  }

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {

      console.log("Speech Recognition not supported")

      return
    }

    const recognition =
      new SpeechRecognition()

    recognition.continuous = false
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognitionRef.current = recognition

    recognition.onstart = () => {

      console.log("Recognition started")

      setListening(true)
    }

    recognition.onend = () => {

      console.log("Recognition ended")

      setListening(false)
    }

    recognition.onerror = (event) => {

      console.log(
        "Recognition error:",
        event.error
      )

      setListening(false)
    }

    recognition.onresult = async (e) => {

      const transcript =
        e.results[0][0].transcript
          .toLowerCase()
          .trim()

      console.log("heard:", transcript)

      setUserText(transcript)

      setAiText("")

      const assistantName =
        userData?.assistantName
          ?.toLowerCase()

      const cleanText =
        transcript
          .replace(assistantName, "")
          .trim()

      const finalText =
        cleanText || transcript

      const data =
        await getGeminiResponse(finalText)

      if (data) {

        setAiText(data.response)

        handleCommand(data)
      }

      setUserText("")
    }

    return () => {

      if (recognitionRef.current) {

        recognitionRef.current.stop()
      }

      setListening(false)
    }

  }, [])

  return (

    <div className='w-full h-screen bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[10px] overflow-hidden px-[20px] py-[10px] relative'>

      <RiMenu3Line
        className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] z-50'
        onClick={() => setHam(true)}
      />

      <div className={`fixed top-0 right-0 z-50 w-[75%] sm:w-[60%] h-screen bg-[#111827] backdrop-blur-xl p-[20px] flex flex-col gap-[20px] transition-transform duration-300 ${ham ? "translate-x-0" : "translate-x-full"}`}>

        <RxCross1
          className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]'
          onClick={() => setHam(false)}
        />

        <button
          className='w-full h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold text-[16px]'
          onClick={handleLogOut}
        >
          Log Out
        </button>

        <button
          className='w-full h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold text-[16px]'
          onClick={() => navigate("/customize")}
        >
          Customize Your Assistant
        </button>

        <button
          className='w-full h-[55px] bg-yellow-400 rounded-full cursor-pointer text-black font-semibold text-[16px]'
          onClick={() => navigate("/games")}
        >
          Games
        </button>

        <div className='w-full h-[2px] bg-gray-500'></div>

        <h1 className='text-white font-semibold text-[20px]'>
          History
        </h1>

        <div className='w-full flex flex-col gap-[15px] overflow-y-auto'>

          {userData.history?.map((his, index) => (

            <span
              key={index}
              className='text-gray-200 text-[16px] break-words'
            >
              {his}
            </span>

          ))}

        </div>

      </div>

      <button
        className='w-[180px] h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold hidden lg:block absolute top-[20px] right-[20px]'
        onClick={handleLogOut}
      >
        Log Out
      </button>

      <button
        className='w-[180px] h-[55px] bg-white rounded-full cursor-pointer text-black font-semibold hidden lg:block absolute top-[90px] right-[20px]'
        onClick={() => navigate("/customize")}
      >
        Customize Your Assistant
      </button>

      <button
        className='w-[180px] h-[55px] bg-yellow-400 rounded-full cursor-pointer text-black font-semibold hidden lg:block absolute top-[160px] right-[20px]'
        onClick={() => navigate("/games")}
      >
        Games
      </button>

     <div className='w-[220px] sm:w-[260px] h-[280px] sm:h-[340px] flex justify-center items-center overflow-hidden rounded-4xl shadow-2xl'>

        <img
          src={userData?.assistantImage}
          alt=""
          className='h-full w-full object-cover'
        />

      </div>

      <h1 className='text-white text-[18px] font-semibold text-center'>

        I'm {userData?.assistantName || userData?.AssistantName}

      </h1>

      {/* MIC BUTTON */}

      <button
        onClick={startListening}
        className={`w-[75px] h-[75px] rounded-full flex justify-center items-center text-white text-[32px] transition-all duration-300 shadow-2xl ${
          listening
            ? "bg-red-500 scale-110 animate-pulse"
            : "bg-blue-500 hover:scale-110"
        }`}
      >

        <FaMicrophone />

      </button>

      {!aiText &&

        <img
          src={userImg}
          alt=""
          className='w-[140px] sm:w-[200px]'
        />
      }

      {aiText &&

        <img
          src={aiImg}
          alt=""
          className='w-[140px] sm:w-[200px]'
        />
      }

      <h1 className='text-white text-[16px] sm:text-[18px] font-semibold text-center px-[10px] max-w-[90%] break-words'>

        {userText
          ? userText
          : aiText
            ? aiText
            : "Tap mic and speak"}

      </h1>

    </div>
  )
}

export default Home