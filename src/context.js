import React from 'react'

const GameContext = React.createContext({
  currentGuess: {
    text: '',
    isRight: false,
    messageFromServer: ''
  },
  quote: ''
})

export default GameContext
