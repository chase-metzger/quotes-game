import React, { useState, useEffect } from 'react'
import { useFetch } from './hooks'

import posed, { PoseGroup } from 'react-pose'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import GameContext from './context'
import GameCard from './GameCard'
// const SERVER_BASE_URL = 'http://localhost:5000' // 'https://chasemetzger-quotes-game.herokuapp.com'
const SERVER_BASE_URL = 'https://chasemetzger-quotes-game.herokuapp.com'

const GameCardAnimator = posed.div({
  enter: {
    y: 0,
    transition: {
      duration: 250,
      stiffness: 100,
      type: 'spring',
      y: {
        ease: 'easeInOut'
      }
    }
  },
  exit: {
    y: '100%',
    transition: {
      duration: 250,
      ease: 'easeInOut'
    }
  }
})

function App () {
  const [quote, setQuote] = useState('BLAH')
  const [gameID, setGameID] = useState('')
  const { loading, result } = useFetch(SERVER_BASE_URL + '/start-game', { game_id: null, quote })

  const [currentGuess, setCurrentGuess] = useState({
    text: '',
    isRight: false,
    messageFromServer: ''
  })

  useEffect(() => {
    if (!loading) {
      setQuote(result.quote)
      setGameID(result.game_id)
    }
  }, [result])

  function setCurrentGuessText (text) {
    setCurrentGuess({
      ...currentGuess,
      text
    })
  }

  function onSubmitGuess (guess) {
    if (guess.trim() !== '') {
      fetch(SERVER_BASE_URL + '/check-guess', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          game_id: gameID,
          guess: guess
        })
      })
        .then(response => response.json())
        .then(answer => setCurrentGuess({
          ...currentGuess,
          messageFromServer: answer.message,
          isRight: answer.quote !== undefined
        }))
        .catch(console.log)
    }
  }

  function restartGame () {
    fetch(SERVER_BASE_URL + '/start-game', {
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
          messageFromServer: ''
        })

        setQuote(data.quote)
      })
      .catch(console.log)
  }

  return (
    <div id="app">
      <GameContext.Provider value={{ currentGuess, quote, setCurrentGuessText, restartGame }}>
        <PoseGroup animateOnMount={true}>
          <GameCardAnimator key="game animator">
            <GameCard onGuess={onSubmitGuess}/>
          </GameCardAnimator>
        </PoseGroup>
      </GameContext.Provider>
    </div>
  )
}

export default App
