import React, { useState, useEffect } from 'react'
import { useFetch } from './hooks'
import './App.css'

const API_BASE_URL = 'http://localhost:5000'// 'https://chasemetzger-quotes-game.herokuapp.com'

function App () {
  const [quote, setQuote] = useState('BLAH')
  const { loading, result } = useFetch(API_BASE_URL + '/start-game', { game_id: null, quote })

  useEffect(() => {
    if (!loading) {
      setQuote(result.quote)
    }
  }, [result])

  return (
    <div className="app">
      <h2>{quote}</h2>
      <p>Enter your guess</p>
      <input type="text" />
    </div>
  )
}

export default App
