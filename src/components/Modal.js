import React from 'react'

//todo: bring back modal at will

export default function Modal({ isCorrect, solution, turn, setShowModal }) {
  return (
    <div className="modal">
      <div>
        <button className="dismiss" onClick={() => setShowModal(false)}>X</button>
        <h1>{isCorrect ? "You win!" : "Nevermind"}</h1>
        <p className="solution">{solution}</p>
        <p>{isCorrect ? `You found the solution in ${turn} guesses :)` : "Better luck next time :)"}</p>
      </div>
    </div>
  )
}
