import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import styled from 'styled-components'

const Img = styled.img`
    width: 220px;
    min-height: 210px;
    max-height: 210px;
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
    const url = `/api/v1/pizzas/${uri}`

    if(uri != undefined) {
        useEffect(() => {
            axios.get(url)
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

    if(pizza.photo_data != undefined || pizza.photo_data != null)
        image_id = JSON.parse(pizza.photo_data)

    return(
        <Container>
            <Row className="pt-5 pb-3">
                <Col xs={12} sm={12} md={5}>
                    <h2>Anexar uma Imagem</h2>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col xs={{ span: 10, offset: 2 }} sm={{ span: 10, offset: 2 }} md={{ span: 3, offset: 0 }}>
                    { 
                        image_id != null ? 
                        <Img src={`/uploads/${ image_id.id }`} alt={`${pizza.name}`} /> : 
                        ''
                    }
                </Col>
            </Row>

            <Form onSubmit={handleFormSubmit} encType={"multipart/form-data"}>

                <Form.Group as={Row} className="mb-3" controlId="pizzaImagem">
                    <Form.Label column sm="2">
                        Anexe uma imagem
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={fileHandler} type={"file"} accept={"image/*"} name="photo" required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 pt-3" controlId="pizzaButton">
                    <Col xs={{ span: 8, offset: 2 }} sm={{ span: 8, offset: 2 }} md={{ span: 3, offset: 2 }}>
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="success" size="lg">
                                <i className="far fa-save"></i> Atualizar
                            </Button>
                        </div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 pt-3" controlId="pizzaKeepButton">
                    <Col xs={{ span: 8, offset: 2 }} sm={{ span: 8, offset: 2 }} md={{ span: 3, offset: 2 }}>
                        <div className="d-grid gap-2">
                            <Button size="lg" href="/">
                                <i className="fas fa-check-circle"></i> Manter Imagem
                            </Button>
                        </div>
                        { 
                            image_id == null ? 
                            <small><br />{'Obs. não há nenhuma imagem cadastrado'}</small> :
                            ''
                        }
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default PizzaAttachment