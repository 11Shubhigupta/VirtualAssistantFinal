import React from 'react'
import { useNavigate } from 'react-router-dom'

function Games() {

  const navigate = useNavigate()

  const games = [
    {
      name: "AI Detective Mystery",
      path: "/games/detective"
    },
    {
      name: "Truth Or Dare",
      path: "/games/truth-dare"
    },
    {
      name: "Rock Paper Scissors",
      path: "/games/rps"
    }
  ]

  return (
    <div className='w-full min-h-screen bg-black text-white p-[30px]'>

      <h1 className='text-[40px] font-bold mb-[40px]'>
        AI Games
      </h1>

      <div className='grid lg:grid-cols-3 gap-[30px]'>

        {games.map((game,index)=>(
          <div
            key={index}
            onClick={()=>navigate(game.path)}
            className='bg-[#111] p-[30px] rounded-3xl cursor-pointer hover:scale-105 transition'
          >
            <h1 className='text-[25px] font-semibold'>
              {game.name}
            </h1>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Games