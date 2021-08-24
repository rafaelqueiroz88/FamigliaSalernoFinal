import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'

const PizzaCard = (props) => {

    // TODO: pending test. come back once insert is working
    return(
        <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{ props.attributes.name }</Card.Title>
                    <Card.Text>
                        { props.attributes.description } <br />
                        { props.attributes.value }
                    </Card.Text>
                    <Button variant="primary" href={`/pizzas/${ props.attributes.slug }`}>
                        Ver Pizza
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default PizzaCard