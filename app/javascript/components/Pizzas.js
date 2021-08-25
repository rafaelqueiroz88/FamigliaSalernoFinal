import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'

import PizzaCard from './Pizzas/PizzaCard'

const Pizzas = () => {

    let history = useHistory()

    const user_token = localStorage.getItem('token') != null ? localStorage.getItem('token') : null
    const user_slug = localStorage.getItem('slug') != null ? localStorage.getItem('slug') : null    
    const user_email = localStorage.getItem('email') != null ? localStorage.getItem('email') : null
    const user_type = localStorage.getItem('user_type') != null ? localStorage.getItem('user_type') : null

    /**
     * If pizzas need an authenticated user, uncomment this block
     */
    // if(token == null)
    //     history.push('/')

    let config = {}

    if(user_token != null)
        config = {
            headers: { Authorization: `Bearer ${user_token}`}
        }

    const [pizzas, setPizzas] = useState(null)

    useEffect(() => {
        axios.get('/api/v1/pizzas.json')
            .then(response => {
                setPizzas(response.data.data)
            })
            .catch(response => {
                console.log(response)
            })
    }, [])

    const menu = user_type != 0 
        ? <Row><Col><Button href="/pizzas/nova"><i className="fas fa-plus-circle"></i> Nova Pizza</Button></Col></Row> 
        : ''

    let cards = null
    
    if(pizzas != null) {
        cards = pizzas.map( pizza => {

            return(
                <PizzaCard
                    key={ pizza.id }
                    attributes={ pizza.attributes }
                />
            )
        })
    }

    return(
        <Container>
            <Row className="pt-5 pb-3">
                <Col>
                    <h2>Pizzas</h2>
                </Col>
            </Row>
            { menu }
            <Row className="pt-3 pl-2">
                <Col>
                    { cards == null ? 'Nenhuma Pizza cadastrada até o momento' : cards }
                </Col>                
            </Row>            
        </Container>
    )
}

export default Pizzas