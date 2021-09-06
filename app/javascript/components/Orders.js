import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'

const Orders = () => {

    let history = useHistory()

    const [orders, setOrders] = useState([])

    const user_slug = localStorage.getItem('slug') != null ? localStorage.getItem('slug') : null

    useEffect(() => {
        axios.get(`/api/v1/orders/${user_slug}`)
            .then(response => {
                setOrders(response.data.data)
            })
            .catch(response => {
                console.log(response)
            })
    }, [])

    let tr = null
    if(orders != undefined && orders.count > 0) {
        tr = orders.map( order => {

            // TODO: Make an component to each address
            return(
                <tr><td>{ order.address }</td></tr>
            )
        })
    }

    return(
        <Container>
            <Row className="pt-5">
                <Col>
                    <Button href="/pedidos/novo">
                        <i className="far fa-file-alt"></i> Novo Pedido
                    </Button>
                </Col>
            </Row>
            <Row className="pt-3">
                <Col>
                    <h2>Seus Pedidos</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Resumo</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                tr == null ?
                                <tr><td colSpan="2">Nenhum pedido até o momento</td></tr> :
                                tr
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Orders