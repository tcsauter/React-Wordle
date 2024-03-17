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
    window.addEventListener('keyup', dismissModalOnEscape)

    if (turn > 5 || isCorrect) {
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => {
      window.removeEventListener('keyup', handleKeyup)
      window.removeEventListener('keyup', dismissModalOnEscape)
    }
  }, [handleKeyup, turn, isCorrect])

  useEffect(() => {
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
    }
  }, [turn]);

  useEffect(() => {
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
    }
  }, [isCorrect]);

  function dismissModalOnEscape({ key }) {
    if (key === "Escape") {
      setShowModal(false)
    }
  }

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} isError={isError} />
      <Keypad usedKeys={usedKeys} handleKeyUp={handleKeyup} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} setShowModal={setShowModal} />}
      <Toast showToast={showToast} message={toastMessage}/>
    </div>
  )
}
