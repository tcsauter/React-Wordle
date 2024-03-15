import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'

// components
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
import Toast from "./Toast";

export default function Wordle({ solution }) {
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup, isError, showToast, toastMessage } = useWordle(solution)
  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} isError={isError} />
      <Keypad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
      <Toast showToast={showToast} message={toastMessage}/>
    </div>
  )
}
