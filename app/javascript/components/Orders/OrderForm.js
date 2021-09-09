import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'

import SelectAddresses from '../Addresses/SelectAddresses'
import SelectPizzas from '../Pizzas/SelectPizzas'

const OrderForm = () => {

    const [order, setOrder] = useState([])
    const [pizza, setPizza] = useState([])
    const [pizzas, setPizzas] = useState([])
    const [primary, setPrimary] = useState(true)
    const [half, setHalf] = useState(false)
    const [addresses, setAddresses] = useState([])

    const user_slug = localStorage.getItem('slug') != null ? localStorage.getItem('slug') : null
    const user_token = localStorage.getItem('token') != null ? localStorage.getItem('token') : null
    const user_type = localStorage.getItem('user_type') != null ? localStorage.getItem('user_type') : null

    let config = null

    if(user_type == 0)
        config = {
            headers: { Authorization: `Bearer ${user_token}`}
        }

    useEffect(() => {
        axios.get(`/api/v1/addresses_by_user/${user_slug}`, config)
            .then(response => {
                setAddresses(response.data.data)
                setOrder(Object.assign({}, order, { ['user_id']: user_slug }))
            })
            .catch(response => {
                console.log(response)
            })

        axios.get('/api/v1/pizzas.json')
            .then(response => {
                setPizzas(response.data.data)
            })
            .catch(response => {
                console.log(response)
            })
    }, [])

    let addresses_options = null
    let pizzas_options = null
    if(addresses_options == null && pizzas_options == null) {

        addresses_options = addresses.map( address => {
            return({
                key: address.id,
                value: address.attributes.slug,
                label: `${address.attributes.street}, ${address.attributes.number}`
            })
        })

        pizzas_options = pizzas.map( p => {
            return({
                key: p.id,
                value: p.attributes.slug,
                label: `${p.attributes.name}`
            })
        })
    }

    const handleNewHalf = () => {
        if(half) {
            setHalf(false)
            setPizza(Object.assign({}, pizza, { ['secondary']: undefined }))
        }
        else
            setHalf(true)
    }

    const handleAddressChange = (e) => {
        setOrder(Object.assign({}, order, { ['address_id']: e.value }))
    }

    const handlePizza = (content) => e => {
        
    }

    const handleAddPizza = () => {
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setOrder(Object.assign(order, { 'pizzas': pizza }))

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post(`/api/v1/orders`, order, config)
        .then(response => {
            console.log(response)
        })
        .catch(response => {
            console.log(response)
        })
    }

    return(
        <Container>
            <Row className="pt-5 pb-3">
                <Col md={{ span: 10, offset: 2 }}>
                    <h2>Novo Pedido</h2>
                </Col>
            </Row>

            <Form onSubmit={handleSubmit}>

                {
                    addresses_options &&
                    <SelectAddresses
                        handleAddressChange={handleAddressChange}
                        addresses={addresses_options}
                    />
                }

                <SelectPizzas
                    half="primary"
                    handlePizza={handlePizza}
                    pizzas={pizzas_options}
                    handleNewHalf={handleNewHalf}
                />

                {
                    half && 
                    <SelectPizzas
                        half="secondary"
                        handlePizza={handlePizza}
                        pizzas={pizzas_options}
                        handleNewHalf={handleNewHalf}
                    />
                }

                <Form.Group as={Row} className="mb-1" controlId="orderAddMore">
                    <Col xs={{ span: 10, offset: 1 }} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
                        <div className="d-grid gap-2">
                            <Button onClick={handleAddPizza}>
                                <i className="fas fa-plus-circle"></i> Add mais pizza ao Pedido
                            </Button>
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2 pt-2" controlId="menu">

                    <Col xs={{ span: 4, offset: 1 }} sm={{ span: 4, offset: 1 }} md={{ span: 4, offset: 2 }}>
                        <div className="d-grid gap-2">
                            <Button variant="warning" href={`/pedidos/${user_slug}`} size="lg">
                                <i className="fas fa-arrow-circle-left"></i> Retornar
                            </Button>
                        </div>
                    </Col>
                    <Col xs={{ span: 4, offset: 1 }} sm={{ span: 4, offset: 1 }} md={{ span: 4, offset: 0 }} >
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

export default OrderForm