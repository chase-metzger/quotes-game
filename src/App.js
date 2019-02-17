import React, { useState, useEffect } from 'react'
import { useFetch } from './hooks'
import './App.css'

const API_BASE_URL = 'https://chasemetzger-quotes-game.herokuapp.com'

function App () {
  const [quote, setQuote] = useState('BLAH')
  const [gameID, setGameID] = useState('')
  const { loading, result } = useFetch(API_BASE_URL + '/start-game', { game_id: null, quote })
  const [currentGuess, setCurrentGuess] = useState({
    text: '',
    isRight: false,
    message: ''
  })

  useEffect(() => {
    if (!loading) {
      setQuote(result.quote)
      setGameID(result.game_id)
    }
  }, [result])

  function onGuessChange (event) {
    setCurrentGuess({
      ...currentGuess,
      text: event.target.value
    })
  }

  function onSubmitGuess () {
    if (currentGuess.text.trim() !== '') {
      fetch(API_BASE_URL + '/check-guess', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          game_id: gameID,
          guess: currentGuess.text
        })
      })
        .then(response => response.json())
        .then(answer => setCurrentGuess({
          ...currentGuess,
          message: answer.message,
          isRight: answer.quote !== undefined
        }))
        .catch(console.log)
    }
  }

  function restartGame () {
    fetch(API_BASE_URL + '/start-game', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game_id: gameID
      })
    })
      .then(response => response.json())
      .then(data => {
        setCurrentGuess({
          text: '',
          isRight: false,
          message: ''
        })

        setQuote(data.quote)
      })
      .catch(console.log)
  }

  return (
    <div className="app">
      <h2>{quote}</h2>
      <p>Enter your guess</p>
      <input type="text" onChange={onGuessChange} value={currentGuess.text}/>
      <button onClick={onSubmitGuess}>Guess</button>
      <h1>{currentGuess.message}</h1>
      {currentGuess.isRight && <button onClick={restartGame}>Play again?</button>}
    </div>
  )
}

export default App
