import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

// import PizzaCard from './Pizzas/PizzaCard'

const PizzaNew = () => {

    let history = useHistory()

    const user_token = localStorage.getItem('token') != null ? localStorage.getItem('token') : null
    const user_type = localStorage.getItem('user_type') != null ? localStorage.getItem('user_type') : null

    if(user_type == 0)
        history.push('/')

    let config = {}

    if(user_type == 1)
        config = {
            headers: { Authorization: `Bearer ${user_token}`}
        }

    const [pizza, setPizza] = useState([])

    const handleChange = (e) => {
        e.preventDefault()
        setPizza(Object.assign({}, pizza, { [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = (e) => {

        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post('/api/v1/pizzas.json', pizza, config)
            .then(response => {
                history.push(`/pizzas/anexo/${response.data.data.attributes.slug}`)
            })
            .catch(response => {
                console.log(response)
            })
    }

    return(
        <Container>
            <Row className="pt-5 pb-3">
                <Col>
                    <h2>Nova Pizza</h2>
                </Col>
            </Row>

            <Form onSubmit={handleFormSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="pizzaName">
                    <Form.Label column sm="2">
                        Nome
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control name="name" onChange={handleChange} placeholder="Baurú..." />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="pizzaDescription">
                    <Form.Label column sm="2">
                        Descrição
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control name="description" onChange={handleChange} placeholder="Descreva de forma direta alguns ingredientes..." />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="pizzaValue">
                    <Form.Label column sm="2">
                        Preço R$
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" onChange={handleChange} name="value" placeholder="30,00" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 pt-3" controlId="pizzaValue">
                    <Col xs={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }}>
                        <div className="d-grid gap-2">
                            <Button type="submit" size="lg">
                                Avançar <i className="fas fa-arrow-circle-right"></i>
                            </Button>
                        </div>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default PizzaNew