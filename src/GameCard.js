import React, { useContext } from 'react'

import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/Form'

import GameContext from './context'

export default function GameCard ({ onGuess, ...rest }) {
  const { quote, currentGuess, correctAnswer, remainingGuesses, setCurrentGuessText, restartGame } = useContext(GameContext)

  function renderButton () {
    let btnVariant = 'primary'
    let onClick = () => onGuess(currentGuess.text)
    let btnText = 'Guess'
    if (currentGuess.isRight) {
      btnVariant = 'success'
      onClick = restartGame
      btnText = 'Play again?'
    } else if (correctAnswer) {
      btnVariant = 'danger'
      onClick = restartGame
      btnText = 'Play again?'
    }

    return <Button variant={btnVariant} onClick={onClick}>{btnText}</Button>
  }

  return (
    <Card className="mx-auto" style={{ width: '24rem' }}>
      <Card.Header>Famous Quote Guessing Game</Card.Header>
      <Card.Body>
        <Card.Title>Can you guess who said this?</Card.Title>
        <Card.Text>
          {quote}
        </Card.Text>
        <InputGroup size="sm" className="mb-3 mx-auto">
          <FormControl as="input" aria-label="Guess input" onChange={(event) => setCurrentGuessText(event.target.value)} />
          <InputGroup.Append>
            {renderButton()}
          </InputGroup.Append>
        </InputGroup>
        <Card.Text>{currentGuess.messageFromServer}</Card.Text>
        {(remainingGuesses > 0) && <Card.Text>Remaining guesses: {remainingGuesses}</Card.Text>}
      </Card.Body>
    </Card>
  )
}
