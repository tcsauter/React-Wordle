import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({}) // {a: 'grey', b: 'green', c: 'yellow'} etc
  const [isError, setIsError] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  function handleError(message) {
    setIsError(true)
    setShowToast(true)
    setToastMessage(message)
    setTimeout(() => {
      setShowToast(false)
    }, 3500)
  }

  // format a guess into an array of letter objects 
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((l) => {
      return {key: l, color: 'grey'}
    })

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'green'
        solutionArray[i] = null
      }
    })
    
    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }
    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    setHistory(prevHistory => {
      return [...prevHistory, currentGuess]
    })
    setTurn(prevTurn => {
      return prevTurn + 1
    })
    setUsedKeys(prevUsedKeys => {
      formattedGuess.forEach(l => {
        const currentColor = prevUsedKeys[l.key]

        if (l.color === 'green') {
          prevUsedKeys[l.key] = 'green'
          return
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          prevUsedKeys[l.key] = 'yellow'
          return
        }
        if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
          prevUsedKeys[l.key] = 'grey'
          return
        }
      })

      return prevUsedKeys
    })
    setCurrentGuess('')
  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = async ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is less than 5
      if (turn > 5) {
        handleError('you used all your guesses!')
        return
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        handleError('you already tried that word.')
        return
      }
      // check word is 5 chars
      if (currentGuess.length !== 5) {
        handleError('word must be 5 chars.')
        return
      }
      // only allow valid words
      if (!(await validateGuess(currentGuess))) {
        handleError('your guess is not in the word bank')
        return
      }
      const formatted = formatGuess()
      addNewGuess(formatted)
    }
    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key)
      }
    }

    isError && setIsError(false);
  }

  async function validateGuess(guess) {
    const check = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)

    return check.ok
  }

  return {turn, currentGuess, guesses, isCorrect, usedKeys, isError, showToast, toastMessage, handleKeyup}
}

export default useWordle