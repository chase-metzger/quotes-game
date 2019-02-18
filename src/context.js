import React from 'react'

const GameContext = React.createContext({
  currentGuess: {
    text: '',
    isRight: false,
    messageFromServer: ''
  },
  quote: '',
  remainingGuesses: 0
})

export default GameContext
