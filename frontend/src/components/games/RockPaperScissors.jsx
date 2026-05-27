import React, { useEffect, useState } from 'react'

function RockPaperScissors() {

  const [userChoice, setUserChoice] = useState("")
  const [aiChoice, setAiChoice] = useState("")
  const [result, setResult] = useState("")
  const [score, setScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [round, setRound] = useState(1)

  const options = ["rock", "paper", "scissors"]

  // AI VOICE
  const speak = (text) => {

    const synth = window.speechSynthesis

    synth.cancel()

    const utterance =
      new SpeechSynthesisUtterance(text)

    utterance.rate = 1
    utterance.pitch = 1.1

    synth.speak(utterance)
  }

  // WELCOME
  useEffect(() => {

    speak("Welcome to AI Rock Paper Scissors")

  }, [])

  // PLAY GAME
  const playGame = (choice) => {

    setLoading(true)

    speak(`You selected ${choice}`)

    setTimeout(() => {

      const assistantChoice =
        options[Math.floor(Math.random() * 3)]

      setUserChoice(choice)
      setAiChoice(assistantChoice)

      // DRAW
      if (choice === assistantChoice) {

        setResult("Draw")

        speak(
          `I selected ${assistantChoice}. Match draw`
        )
      }

      // USER WIN
      else if (
        (choice === "rock" && assistantChoice === "scissors") ||
        (choice === "paper" && assistantChoice === "rock") ||
        (choice === "scissors" && assistantChoice === "paper")
      ) {

        setResult("You Win")

        setScore(prev => prev + 1)

        speak(
          `I selected ${assistantChoice}. You win this round`
        )
      }

      // AI WIN
      else {

        setResult("AI Wins")

        setAiScore(prev => prev + 1)

        speak(
          `I selected ${assistantChoice}. I win this round`
        )
      }

      setRound(prev => prev + 1)

      setLoading(false)

    }, 1800)
  }

  // RESET GAME
  const resetGame = () => {

    setUserChoice("")
    setAiChoice("")
    setResult("")
    setScore(0)
    setAiScore(0)
    setRound(1)

    speak("Game restarted")
  }

  return (

    <div className='w-full min-h-screen bg-black text-white flex flex-col justify-center items-center overflow-hidden relative p-[20px]'>

      {/* BACKGROUND GLOW */}
      <div className='absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-500 opacity-20 blur-[140px] rounded-full'></div>

      <div className='absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-pink-500 opacity-20 blur-[140px] rounded-full'></div>

      {/* TITLE */}
      <h1 className='text-[55px] font-extrabold mb-[20px] z-10 text-center bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent'>
        AI Rock Paper Scissors
      </h1>

      {/* SCORE BOARD */}
      <div className='flex gap-[20px] mb-[35px] z-10 flex-wrap justify-center'>

        <div className='px-[30px] py-[12px] bg-blue-500 rounded-full font-bold text-[22px] shadow-xl'>
          You : {score}
        </div>

        <div className='px-[30px] py-[12px] bg-pink-500 rounded-full font-bold text-[22px] shadow-xl'>
          AI : {aiScore}
        </div>

        <div className='px-[30px] py-[12px] bg-yellow-400 text-black rounded-full font-bold text-[22px] shadow-xl'>
          Round : {round}
        </div>

      </div>

      {/* GAME CARD */}
      <div className='w-full max-w-[850px] min-h-[400px] bg-[#111827]/80 backdrop-blur-lg border border-gray-700 rounded-[45px] flex flex-col justify-center items-center p-[40px] shadow-2xl relative overflow-hidden z-10'>

        {/* INNER GLOW */}
        <div className='absolute w-[350px] h-[350px] bg-blue-500 opacity-10 blur-[120px] rounded-full'></div>

        {/* LOADING */}
        {loading && (

          <div className='flex flex-col items-center gap-[20px] z-10'>

            <h1 className='text-[35px] animate-pulse font-bold'>
              AI is thinking...
            </h1>

            <div className='w-[100px] h-[100px] rounded-full border-[8px] border-pink-500 border-t-transparent animate-spin'></div>

          </div>

        )}

        {/* RESULT */}
        {!loading && (

          <div className='flex flex-col items-center gap-[25px] z-10'>

            <div className='flex gap-[40px] flex-wrap justify-center'>

              {/* USER */}
              <div className='w-[220px] h-[180px] bg-[#1f2937] rounded-3xl flex flex-col justify-center items-center shadow-xl'>

                <h1 className='text-[24px] font-bold mb-[15px]'>
                  You
                </h1>

                <h1 className='text-[45px] font-extrabold capitalize'>
                  {userChoice || "?"}
                </h1>

              </div>

              {/* AI */}
              <div className='w-[220px] h-[180px] bg-[#1f2937] rounded-3xl flex flex-col justify-center items-center shadow-xl'>

                <h1 className='text-[24px] font-bold mb-[15px]'>
                  AI
                </h1>

                <h1 className='text-[45px] font-extrabold capitalize'>
                  {aiChoice || "?"}
                </h1>

              </div>

            </div>

            {/* RESULT */}
            <h1 className={`text-[40px] font-extrabold
              ${result === "You Win"
                ? "text-green-400"
                : result === "AI Wins"
                  ? "text-red-400"
                  : "text-yellow-300"
              }`}>
              {result || "Choose Your Move"}
            </h1>

          </div>

        )}

      </div>

      {/* BUTTONS */}
      <div className='flex gap-[25px] mt-[35px] z-10 flex-wrap justify-center'>

        <button
          onClick={() => playGame("rock")}
          className='w-[170px] h-[70px] rounded-3xl bg-blue-500 hover:scale-110 transition-all duration-300 text-[24px] font-bold shadow-2xl'
        >
          Rock
        </button>

        <button
          onClick={() => playGame("paper")}
          className='w-[170px] h-[70px] rounded-3xl bg-green-500 hover:scale-110 transition-all duration-300 text-[24px] font-bold shadow-2xl'
        >
          Paper
        </button>

        <button
          onClick={() => playGame("scissors")}
          className='w-[170px] h-[70px] rounded-3xl bg-pink-500 hover:scale-110 transition-all duration-300 text-[24px] font-bold shadow-2xl'
        >
          Scissors
        </button>

      </div>

      {/* RESET */}
      <button
        onClick={resetGame}
        className='mt-[30px] w-[220px] h-[65px] bg-red-500 rounded-3xl text-[24px] font-bold hover:scale-110 transition-all duration-300 shadow-2xl z-10'
      >
        Restart Game
      </button>

      {/* FOOTER */}
      <div className='mt-[25px] text-gray-400 text-center text-[18px] z-10'>
        AI Voice Enabled • Futuristic Mode Active
      </div>

    </div>
  )
}

export default RockPaperScissors