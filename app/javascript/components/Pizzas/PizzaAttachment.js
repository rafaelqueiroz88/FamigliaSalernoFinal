import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import styled from 'styled-components'

const Img = styled.img`
    width: 80%;
    max-height: 250px;
    box-shadow: 4px 4px 4px rgba(30, 30, 30, 0.6);
    border-radius: 50%;
`

const PizzaAttachment = (props) => {

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
    const form = new FormData()

    const uri = props.match.params.slug

    if(uri != undefined) {
        useEffect(() => {
            axios.get(`/api/v1/pizzas/${uri}`)
                .then(response => {
                    setPizza(response.data.data.attributes)
                })
                .catch(response => {
                    console.log(response)
                })
        }, [])
    }

    let image_id = null

    if(pizza.picture_data != undefined || pizza.picture_data != null) {
        image_id = JSON.parse(pizza.picture_data)
    }

    const fileHandler = (e) => {
        e.preventDefault()
        form.append(`pizza[${e.target.name}]`, e.target.files[0])
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        /**
         * Get Token (csrf) for requests
         */
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        const url = `/api/v1/pizza/attachment/${uri}`

        axios.patch(url, form, config)
            .then(response => {
                alert('Imagem anexada com sucesso para: ' + response.data.data.attributes.name)
                history.push("/pizzas")
            })
            .catch(response => {
                console.log(response)
            })
    }

    return(
        <Container>
            <Row className="pt-5 pb-3">
                <Col>
                    <h2>Anexe uma Imagem</h2>
                </Col>
            </Row>

            <Form onSubmit={handleFormSubmit} encType={"multipart/form-data"}>

                <Row>
                    <Col xs={10} sm={10} md={3}>
                        <div className={"form-group"}>
                            { 
                                image_id != null ? 
                                <Img src={`/uploads/${ image_id.id }`} alt={`${pizza.name}`} /> : 
                                ''
                            }
                        </div>
                    </Col>
                </Row>

                <Form.Group as={Row} className="mb-3" controlId="pizzaValue">
                    <Form.Label column sm="2">
                        Preço R$
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={fileHandler} type={"file"} accept={"image/*"} name="photo" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 pt-3" controlId="pizzaButton">
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

export default PizzaAttachment