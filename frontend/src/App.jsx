import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import Home from './pages/Home'
import Customize2 from './pages/Customize2'
import { userDataContext } from './context/UserContext'
import Games from './pages/Games'
import RockPaperScissors from './components/games/RockPaperScissors'
import TruthDare from './components/games/TruthDare'
import DetectiveGame from './components/games/DetectiveGame'
function App() {

  const { userData,setUserData } = useContext(userDataContext)

  // // Check login
  // const isLoggedIn = userData !== null

  // // Check customization
  // const isCustomized =
  //   userData?.assistantImage &&
  //   userData?.assistantName

  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={(userData?.assistantImage && userData?.assistantName)? <Home/>:<Navigate to={"/customize"}/>}
        />
   

      {/* SIGNUP */}
      <Route
        path="/signup"
        element={!userData?<SignUp/>:<Navigate to={"/"}/>        
        }
      />

      {/* SIGNIN */}
    <Route
        path="/signin"
        element={!userData?<SignIn/>:<Navigate to={"/"}/>        
        }
      />

      {/* CUSTOMIZE */}
      <Route
        path="/customize"
        element={
        userData?<Customize/>:<Navigate to={"/signup"}/>
        }
      />

         {/* CUSTOMIZE2 */}
      <Route
        path="/customize2"
        element={
          userData?
             <Customize2 />
            : <Navigate to={"/signup"} />
        }
      />

<Route path='/games' element={<Games/>} />

<Route
 path='/games/rps'
 element={<RockPaperScissors/>}
/>

<Route
 path='/games/truth-dare'
 element={<TruthDare/>}
/>

<Route
 path='/games/detective'
 element={<DetectiveGame/>}
/>



    </Routes>
  )
}

export default App