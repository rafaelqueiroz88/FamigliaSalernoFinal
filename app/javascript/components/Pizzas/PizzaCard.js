import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'

const PizzaCard = (props) => {

    let image_id = ''

    if(props.attributes.photo_data != undefined || props.attributes.photo_data != null) {
        image_id = JSON.parse(props.attributes.photo_data)
    }

    return(
        <Col>
            <Card style={{ width: '18rem' }}>
                {
                    props.attributes.photo_data ?
                    <Card.Img variant="top" src={`/uploads/${image_id.id}`} /> :
                    ''
                }
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