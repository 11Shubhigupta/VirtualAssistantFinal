import React, { useEffect, useRef, useState } from 'react'

function TruthDare() {

  const [question, setQuestion] = useState("")
  const [mode, setMode] = useState("")
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [gameStarted, setGameStarted] = useState(false)
  const [completed, setCompleted] = useState(false)

  const timerRef = useRef(null)

  const truths = [
    "What is your biggest fear?",
    "Who was your first crush?",
    "What secret talent do you have?",
    "Have you ever lied to your best friend?",
    "What is your most embarrassing moment?",
    "What is your weirdest habit?",
    "What is one thing nobody knows about you?"
  ]

  const dares = [
    "Dance for 10 seconds",
    "Speak like a robot",
    "Sing your favorite song",
    "Do 10 jumping jacks",
    "Talk in slow motion for 20 seconds",
    "Act like a cat",
    "Make a funny face for 15 seconds"
  ]

  // AI VOICE
  const speak = (text) => {

    const synth = window.speechSynthesis

    synth.cancel()

    const utterance =
      new SpeechSynthesisUtterance(text)

    utterance.rate = 1
    utterance.pitch = 1.1
    utterance.volume = 1

    synth.speak(utterance)
  }

  // START TIMER
  const startTimer = () => {

    clearInterval(timerRef.current)

    setTimeLeft(15)

    timerRef.current = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timerRef.current)

          speak("Time is over")

          return 0
        }

        return prev - 1
      })

    }, 1000)
  }

  // TRUTH
  const getTruth = () => {

    setCompleted(false)
    setLoading(true)
    setGameStarted(true)

    setTimeout(() => {

      const random =
        truths[Math.floor(Math.random() * truths.length)]

      setQuestion(random)
      setMode("Truth")

      speak(`Truth question. ${random}`)

      setLoading(false)

      startTimer()

    }, 1200)
  }

  // DARE
  const getDare = () => {

    setCompleted(false)
    setLoading(true)
    setGameStarted(true)

    setTimeout(() => {

      const random =
        dares[Math.floor(Math.random() * dares.length)]

      setQuestion(random)
      setMode("Dare")

      speak(`Dare challenge. ${random}`)

      setLoading(false)

      startTimer()

    }, 1200)
  }

  // COMPLETE
  const completeChallenge = () => {

    setCompleted(true)

    clearInterval(timerRef.current)

    setScore(prev => prev + 5)

    speak("Challenge completed successfully")
  }

  // SKIP
  const skipChallenge = () => {

    clearInterval(timerRef.current)

    speak("Challenge skipped")
  }

  // WELCOME
  useEffect(() => {

    speak("Welcome to AI Truth or Dare")

    return () => {

      clearInterval(timerRef.current)
    }

  }, [])

  return (

    <div className='w-full min-h-screen bg-black text-white overflow-hidden relative flex flex-col justify-center items-center p-[20px]'>

      {/* BACKGROUND GLOW */}
      <div className='absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-pink-500 opacity-20 blur-[150px] rounded-full'></div>

      <div className='absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-500 opacity-20 blur-[150px] rounded-full'></div>

      {/* TITLE */}
      <h1 className='text-[55px] font-extrabold mb-[10px] z-10 text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent'>
        AI Truth Or Dare
      </h1>

      {/* SCORE + TIMER */}
      <div className='flex gap-[20px] mb-[35px] z-10 flex-wrap justify-center'>

        <div className='px-[25px] py-[12px] bg-yellow-400 text-black rounded-full font-bold text-[20px] shadow-lg'>
          Score : {score}
        </div>

        <div className='px-[25px] py-[12px] bg-red-500 text-white rounded-full font-bold text-[20px] shadow-lg'>
          Time : {timeLeft}s
        </div>

      </div>

      {/* BUTTONS */}
      <div className='flex gap-[25px] mb-[40px] z-10 flex-wrap justify-center'>

        <button
          onClick={getTruth}
          className='w-[170px] h-[70px] rounded-3xl bg-blue-500 hover:scale-110 transition-all duration-300 text-[24px] font-bold shadow-2xl'
        >
          Truth
        </button>

        <button
          onClick={getDare}
          className='w-[170px] h-[70px] rounded-3xl bg-pink-500 hover:scale-110 transition-all duration-300 text-[24px] font-bold shadow-2xl'
        >
          Dare
        </button>

      </div>

      {/* MAIN CARD */}
      <div className='w-full max-w-[850px] min-h-[320px] bg-[#111827]/80 backdrop-blur-lg border border-gray-700 rounded-[45px] flex flex-col justify-center items-center p-[40px] shadow-[0_0_50px_rgba(0,0,0,0.7)] relative overflow-hidden z-10'>

        {/* CARD GLOW */}
        <div className='absolute w-[350px] h-[350px] bg-pink-500 opacity-10 blur-[120px] rounded-full'></div>

        {/* MODE */}
        {mode && (
          <div className={`mb-[25px] px-[25px] py-[10px] rounded-full text-[22px] font-bold z-10
          ${mode === "Truth"
              ? "bg-blue-500"
              : "bg-pink-500"
            }`}>
            {mode} Mode
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <h1 className='text-[28px] animate-pulse z-10 font-bold'>
            AI is preparing your challenge...
          </h1>
        )}

        {/* QUESTION */}
        {!loading && (
          <h1 className='text-[34px] text-center font-bold leading-[55px] z-10'>
            {question || "Choose Truth or Dare"}
          </h1>
        )}

        {/* COMPLETED */}
        {completed && (
          <h1 className='mt-[25px] text-green-400 text-[28px] font-bold animate-bounce z-10'>
            Challenge Completed
          </h1>
        )}

      </div>

      {/* ACTION BUTTONS */}
      {gameStarted && !loading && (

        <div className='flex gap-[25px] mt-[35px] z-10 flex-wrap justify-center'>

          <button
            onClick={completeChallenge}
            className='w-[180px] h-[65px] rounded-2xl bg-green-500 hover:scale-110 transition text-[22px] font-bold shadow-xl'
          >
            Done
          </button>

          <button
            onClick={skipChallenge}
            className='w-[180px] h-[65px] rounded-2xl bg-red-500 hover:scale-110 transition text-[22px] font-bold shadow-xl'
          >
            Skip
          </button>

        </div>

      )}

      {/* FOOTER */}
      <div className='mt-[35px] text-gray-400 text-center text-[18px] z-10'>
        AI Voice Enabled • Interactive Mode Active
      </div>

    </div>
  )
}

export default TruthDare