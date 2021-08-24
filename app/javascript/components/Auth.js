import React, { useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import NewUserModal from './Auth/NewUserModal'

const Auth = () => {

    let history = useHistory()

    const [user, setUser] = useState([])
    const [modal, setModal] = useState(false)

    const handleFormChange = (e) => {
        e.preventDefault()
        setUser(Object.assign({}, user, {[e.target.name]: e.target.value}))
    }

    const handleNewUserModal = (e) => {
        e.preventDefault()
        setModal(true)
    }

    const handleModal = () => {
        setModal(true)
    }

    const handleModalClose = () => {
        setModal(false)
    }

    const handleCloseButton = (e) => {
        e.preventDefault()
        setModal(false)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post('/api/v1/login', user)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('slug', response.data.slug)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('user_type', response.data.user_type)
                history.push('/pizzas')
            }).catch(response => {
                console.log(response)
            })
    }

    const handleNewUserFormSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post('/api/v1/users.json', user)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('slug', response.data.slug)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('user_type', response.data.user_type)
                history.push('/pizzas')
            }).catch(response => {
                console.log(response)
            })
    }

    return(
        <Container>
            <Row className="pt-5">
                <Col>
                    <h2>Identifique-se</h2>
                </Col>
            </Row>

            <Form onSubmit={handleFormSubmit} className="pt-5">
                <Form.Group as={Row} className="mb-3" controlId="authEmail">
                    <Form.Label column sm="2" md="1">
                        Email
                    </Form.Label>
                    <Col sm="10" md="3">
                        <Form.Control onChange={handleFormChange} name="email" type="text" placeholder="nome@examplo.com" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="authPassword">
                    <Form.Label column sm="2" md="1">
                        Password
                    </Form.Label>
                    <Col sm="10" md="3">
                        <Form.Control onChange={handleFormChange} name="password" type="password" placeholder="******" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="authPassword">
                    <Col sm={{span: 4, offset: 2}} md={{span: 4, offset: 1}}>
                        <Button type="submit">
                            Enviar
                        </Button>
                    </Col>
                </Form.Group>
            </Form>

            <Row className="pt-2">
                <Col sm={{span: 4, offset: 2}} md={{span: 4, offset: 1}}>
                    Novo por aqui? <Link to="#" onClick={handleNewUserModal}>Nova Conta</Link>
                </Col>
            </Row>

            <NewUserModal
                modal={modal}
                handleModalClose={handleModalClose}
                handleNewUserFormSubmit={handleNewUserFormSubmit}
                handleFormChange={handleFormChange}
                handleCloseButton={handleCloseButton}
            />
        </Container>
    )
}

export default Auth