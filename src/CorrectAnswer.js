import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'

export default function CorrectAnswer ({ quote }) {
  return (
    <Card className="mx-auto" style={{ width: '30rem', marginTop: '5rem' }}>
      <Card.Body>
        <Jumbotron>
          <h1>The answer was {quote.author}</h1>
          <p>Learn more about this person: {quote['bio-link']}</p>
        </Jumbotron>
      </Card.Body>
    </Card>
  )
}
