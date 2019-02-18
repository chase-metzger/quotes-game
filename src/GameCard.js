import React, { useContext } from 'react'

import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/Form'

import GameContext from './context'

export default function GameCard ({ onGuess, ...rest }) {
  const { quote, currentGuess, remainingGuesses, setCurrentGuessText, restartGame } = useContext(GameContext)

  function renderButton () {
    if (currentGuess.isRight) {
      return <Button variant="success" onClick={restartGame}>Play again?</Button>
    } else {
      return <Button variant="primary" onClick={() => onGuess(currentGuess.text)}>Guess</Button>
    }
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
        <Card.Text>Remaining guesses: {remainingGuesses}</Card.Text>
      </Card.Body>
    </Card>
  )
}
