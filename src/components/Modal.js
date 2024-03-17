import React from 'react'

//todo: dismiss modal
//todo: bring back modal at will

export default function Modal({ isCorrect, solution, turn }) {
  return (
    <div className="modal">
      <div>
        <h1>{isCorrect ? "You win!" : "Nevermind"}</h1>
        <p className="solution">{solution}</p>
        <p>{isCorrect ? `You found the solution in ${turn} guesses :)` : "Better luck next time :)"}</p>
      </div>
    </div>
  )
}
