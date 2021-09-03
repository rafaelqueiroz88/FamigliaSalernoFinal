import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import AddressTr from './Addresses/AddressTr'
import AddressModal from './Addresses/AddressModal'

const Addresses = () => {

    let history = useHistory()

    const user_token = localStorage.getItem('token') != null ? localStorage.getItem('token') : null
    const user_slug = localStorage.getItem('slug') != null ? localStorage.getItem('slug') : null
    const user_email = localStorage.getItem('email') != null ? localStorage.getItem('email') : null
    const user_type = localStorage.getItem('user_type') != null ? localStorage.getItem('user_type') : null

    let config = {}

    if(user_token != null)
        config = {
            headers: { Authorization: `Bearer ${user_token}` }
        }

    const [addresses, setAddresses] = useState([])
    const [modal, setModal] = useState(false)
    const [modalContent, setModalContent] = useState([])

    useEffect(() => {

        const url = `/api/v1/addresses_by_user/${user_slug}`

        axios.get(url, config)
            .then(response => {
                setAddresses(response.data.data)
            })
            .catch(response => {
                console.log(response)
            })
    }, [])

    const handleDeleteButton = (content) => e => {
        e.preventDefault()
        axios.delete(`/api/v1/addresses/${content}`, config)
            .then(response => {
                console.log('Endereço apagado com Sucesso!')
                history.go(0)
            })
            .catch(response => {
                console.log(response)
            })

    }

    const handleModalButton = (content) => e => {
        e.preventDefault()
        setModalContent(content)
        setModal(true)
    }

    const handleCloseButton = (e) => {
        e.preventDefault()
        setModal(false)
    }

    const handleModalClose = () => {
        setModal(false)
    }

    let tr = null
    if(addresses != null) {
        tr = addresses.map( address => {
            return(
                <AddressTr
                    key={address.id}
                    attributes={address.attributes}
                    handleModalButton={handleModalButton}
                />
            )
        })
    }

    return(
        <Container className="pt-5">
            <Row>
                <Col>
                    <Button href="/enderecos/novo">
                        <i className="fas fa-map-marker-alt"></i> Novo Endereço
                    </Button>
                </Col>
            </Row>
            <Row className="pt-3">
                <Col>
                    <h2>Sua lista de Endereços</h2>
                </Col>
            </Row>
            <Row className="pt-3">
                <Col>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Endereços</th>
                                <th className="text-center">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                tr == null || addresses.length == 0 ? 
                                <tr>
                                    <td colSpan="2">Você ainda não possui nenhum Endereço Cadastrado</td>
                                </tr> :
                                tr 
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <AddressModal
                modal={modal}
                handleCloseButton={handleCloseButton}
                handleModalClose={handleModalClose}
                modalContent={modalContent}
                handleDeleteButton={handleDeleteButton}
            />

        </Container>
    )
}

export default Addresses