import React, { useState, useEffect } from 'react'
import { useFetch, useSessionStorage } from './hooks'

import posed, { PoseGroup } from 'react-pose'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import GameContext from './context'
import GameCard from './GameCard'
import CorrectAnswer from './CorrectAnswer'
// const SERVER_BASE_URL = 'http://localhost:5000'
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
  const [quote, setQuote] = useState('Loading...')
  const [gameID, setGameID] = useSessionStorage('gameID', null)
  const [remainingGuesses, setRemainingGuesses] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState(null)
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
      setRemainingGuesses(result.remaining_guesses)
    }
  }, [result])

  function setCurrentGuessText (text) {
    setCurrentGuess({
      ...currentGuess,
      text
    })
  }

  function updateStateFromGuessAnswer (answer) {
    setCurrentGuess({
      ...currentGuess,
      messageFromServer: answer.message,
      isRight: answer.is_right,
      text: ''
    })
    setRemainingGuesses(answer.remaining_guesses)
    if (answer.correct_answer) {
      setCorrectAnswer(answer.correct_answer)
    }
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
          guess
        })
      })
        .then(response => response.json())
        .then(updateStateFromGuessAnswer)
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
          messageFromServer: data.message
        })

        setQuote(data.quote)
        setRemainingGuesses(data.remaining_guesses)
        setCorrectAnswer(null)
      })
      .catch(console.log)
  }

  return (
    <div id="app">
      <GameContext.Provider value={{ currentGuess, correctAnswer, quote, remainingGuesses, setCurrentGuessText, restartGame }}>
        <PoseGroup animateOnMount={true}>
          <GameCardAnimator key="game animator">
            <GameCard onGuess={onSubmitGuess}/>
          </GameCardAnimator>
        </PoseGroup>
        {correctAnswer && <CorrectAnswer quote={correctAnswer} />}
      </GameContext.Provider>
    </div>
  )
}

export default App
