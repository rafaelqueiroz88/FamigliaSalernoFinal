import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'

import './pizza.css'

const PizzaCard = (props) => {

    let image_id = ''

    if(props.attributes.photo_data != undefined || props.attributes.photo_data != null) {
        image_id = JSON.parse(props.attributes.photo_data)
    }

    return(
        <Card className="shaddow mb-3 mr-3" style={{ width: '18rem' }}>
            {
                props.attributes.photo_data ?
                <Card.Img variant="top" src={`/uploads/${image_id.id}`} /> :
                ''
            }
            <Card.Body>
                <Card.Title>
                    { props.attributes.name }
                </Card.Title>
                <Card.Text>
                    { props.attributes.description } <br />
                    <strong>R$ { props.attributes.value },00</strong>
                </Card.Text>
                <Button variant="primary" href={`/pizzas/${ props.attributes.slug }`}>
                    <i className="far fa-eye"></i> Ver Pizza
                </Button>
            </Card.Body>
        </Card>
    )
}

export default PizzaCard