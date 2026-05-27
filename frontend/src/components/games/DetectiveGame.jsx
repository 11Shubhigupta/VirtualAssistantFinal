import React, { useEffect, useState } from 'react'

function DetectiveGame() {

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [clues, setClues] = useState([])

  const mystery = {
    criminal: "assistant",

    intro:
      "A famous scientist was murdered in a secret laboratory last night.",

    suspects: [
      "guard",
      "assistant",
      "rival scientist"
    ]
  }

  useEffect(() => {

    setMessages([
      {
        sender: "AI",
        text:
          `${mystery.intro}
          
Suspects:
1. Guard
2. Assistant
3. Rival Scientist

Commands:
- inspect room
- inspect body
- question guard
- question assistant
- question rival scientist
- accuse someone`
      }
    ])

  }, [])

  const addMessage = (sender, text) => {

    setMessages(prev => [
      ...prev,
      { sender, text }
    ])
  }

  const sendMessage = () => {

    if (!input || gameOver) return

    const userInput = input.toLowerCase()

    addMessage("You", input)

    // ROOM
    if (userInput.includes("inspect room")) {

      addMessage(
        "AI",
        "You found broken glasses and strange fingerprints near the table."
      )

      setClues(prev => [...prev, "fingerprints"])
    }

    // BODY
    else if (userInput.includes("inspect body")) {

      addMessage(
        "AI",
        "The scientist has a stab wound. Time of death: 11 PM."
      )

      setClues(prev => [...prev, "stab wound"])
    }

    // GUARD
    else if (userInput.includes("question guard")) {

      addMessage(
        "AI",
        "Guard says he saw the assistant entering the lab late night."
      )
    }

    // ASSISTANT
    else if (userInput.includes("question assistant")) {

      addMessage(
        "AI",
        "Assistant looks nervous. You notice blood stains on shoes."
      )

      setClues(prev => [...prev, "blood shoes"])
    }

    // RIVAL
    else if (
      userInput.includes("question rival")
    ) {

      addMessage(
        "AI",
        "Rival scientist says he left the lab before dinner."
      )
    }

    // ACCUSE
    else if (userInput.includes("accuse")) {

      if (userInput.includes(mystery.criminal)) {

        addMessage(
          "AI",
          "Correct. Assistant is the murderer. You solved the mystery."
        )

        setGameOver(true)
      }

      else {

        addMessage(
          "AI",
          "Wrong accusation. Criminal escaped."
        )

        setGameOver(true)
      }
    }

    // HELP
    else {

      addMessage(
        "AI",
        "Unknown command. Try investigating clues or questioning suspects."
      )
    }

    setInput("")
  }

  return (

    <div className='w-full min-h-screen bg-gradient-to-b from-black to-[#111827] text-white p-[20px]'>

      <h1 className='text-[40px] font-bold text-center mb-[20px]'>
        Detective Mystery
      </h1>

      {/* CLUES */}
      <div className='flex gap-[10px] flex-wrap mb-[20px]'>

        {clues.map((clue, index) => (
          <div
            key={index}
            className='px-[15px] py-[8px] bg-yellow-500 text-black rounded-full font-semibold'
          >
            {clue}
          </div>
        ))}

      </div>

      {/* CHAT */}
      <div className='w-full h-[65vh] overflow-y-auto bg-[#0a0a0a] rounded-3xl p-[20px] flex flex-col gap-[20px]'>

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`max-w-[75%] p-[15px] rounded-2xl text-[17px]
            ${msg.sender === "You"
                ? "bg-blue-500 self-end"
                : "bg-gray-700 self-start"
              }`}
          >

            <h1>{msg.text}</h1>

          </div>

        ))}

      </div>

      {/* INPUT */}
      {!gameOver && (

        <div className='flex gap-[20px] mt-[20px]'>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type your investigation...'
            className='flex-1 h-[60px] rounded-2xl px-[20px] bg-[#1f2937] outline-none'
          />

          <button
            onClick={sendMessage}
            className='px-[30px] bg-blue-500 rounded-2xl font-semibold'
          >
            Send
          </button>

        </div>

      )}

      {/* GAME OVER */}
      {gameOver && (

        <button
          onClick={() => window.location.reload()}
          className='mt-[20px] w-full h-[60px] bg-red-500 rounded-2xl text-[20px] font-bold'
        >
          Restart Game
        </button>

      )}

    </div>
  )
}

export default DetectiveGame