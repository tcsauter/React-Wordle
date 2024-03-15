import React from 'react'

// components
import Row from './Row'

export default function Grid({ guesses, currentGuess, turn, isError }) {
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} isError={isError} />
        }
        return <Row key={i} guess={g} /> 
      })}
    </div>
  )
}
