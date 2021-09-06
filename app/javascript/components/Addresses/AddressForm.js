import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

const AddressForm = () => {

    let history = useHistory()

    const [address, setAddress] = useState([])
    const [user, setUser] = useState([])
    const [loaded, setLoaded] = useState(false)

    const user_slug = localStorage.getItem('slug') != null ? localStorage.getItem('slug') : null
    const user_token = localStorage.getItem('token') != null ? localStorage.getItem('token') : null
    const user_type = localStorage.getItem('user_type') != null ? localStorage.getItem('user_type') : null

    let config = {}

    if(user_type == 0)
        config = {
            headers: { Authorization: `Bearer ${user_token}`}
        }

    if(user_type == 1)
        history.push('/entrar')
    else {
        useEffect(() => {
            axios.get(`/api/v1/users/${user_slug}`, config)
                .then(response => {
                    setUser(response.data.data)
                    setLoaded(true)
                })
                .catch(response => {
                    console.log(response)
                })
        }, [])
    }

    if(loaded) {
        const user_id = user.id
        setAddress(Object.assign({}, address, { user_id }))
        setLoaded(false)
    }

    const handleChange = (e) => {
        setAddress(Object.assign({}, address, { [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post('/api/v1/addresses', address, config)
            .then(response => {
                console.log('Novo endereço cadastrado com sucesso!')
                history.push('/pizzas')
            })
            .catch(response => {
                console.log(response)
            })
    }

    return(
        <Container>
            <Row className="pt-5 pb-3">
                <Col>
                    <h2>Novo Endereço</h2>
                </Col>
            </Row>

            <Form onSubmit={handleSubmit}>

                <Form.Group as={Row} className="mb-3" controlId="addressDescription">
                    <Form.Label column sm="2">
                        Descrição:
                    </Form.Label>
                    <Col sm={10} md={9}>
                        <Form.Control name="description" onChange={handleChange} placeholder="Endereço da sogra" /> <br />
                        Obs. <small>Descreva ou dê um apelido apenas para resumir o endereço</small>
                    </Col>
                </Form.Group>

                <Row>
                    <Col md={11}>
                        <hr />
                    </Col>
                </Row>

                <Form.Group as={Row} className="mb-3" controlId="addressName">
                    <Form.Label column sm="2">
                        Endereço:
                    </Form.Label>
                    <Col sm={10} md={9}>
                        <Form.Control name="street" onChange={handleChange} placeholder="Av. 07 de Setembro" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="addressNumber">
                    <Form.Label column sm="2">
                        Número:
                    </Form.Label>
                    <Col sm={10} md={9}>
                        <Form.Control name="number" onChange={handleChange} placeholder="786" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="addressNote">
                    <Form.Label column sm="2">
                        Observação:
                    </Form.Label>
                    <Col sm={10} md={9}>
                        <Form.Control name="note" onChange={handleChange} placeholder="Numero do Apto., Bloco, etc." />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="addressZipcode">
                    <Form.Label column sm="2">
                        CEP:
                    </Form.Label>
                    <Col sm={10} md={9}>
                        <Form.Control name="zipcode" onChange={handleChange} placeholder="12345-000" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="addressReference">
                    <Form.Label column sm="2">
                        Referência:
                    </Form.Label>
                    <Col sm={10} md={9}>
                        <Form.Control name="reference" onChange={handleChange} placeholder="Próximo a ..." />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 pt-3" controlId="menu">

                    <Col xs={{ span: 4, offset: 1 }} sm={{ span: 4, offset: 1 }} md={{ span: 4, offset: 2 }}>
                        <div className="d-grid gap-2">
                            <Button variant="warning" href={`/enderecos/${user_slug}`} size="lg">
                                <i className="fas fa-arrow-circle-left"></i> Retornar
                            </Button>
                        </div>
                    </Col>
                    <Col xs={{ span: 4, offset: 1 }} sm={{ span: 4, offset: 1 }} md={4}>
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="success" size="lg">
                                Enviar <i className="fas fa-save"></i>
                            </Button>
                        </div>
                    </Col>

                </Form.Group>

            </Form>
        </Container>
    )
}

export default AddressForm