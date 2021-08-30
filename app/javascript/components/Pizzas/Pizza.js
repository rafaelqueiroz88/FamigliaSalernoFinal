import React, { useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
// import { StyleSheet, css } from 'aphrodite'

const Img = styled.img`
    @media screen and (max-width: 360px) {
        width: 220px;
        min-height: 210px;
        max-height: 210px;
        position: relative;
            top: 40px;
        z-index: 100;
    }

    @media screen and (min-width: 1260px) {
        width: 90%;
        max-height: 230px;
        min-height: 230px;
        position: relative;
            top: 100px;
    }
    
    box-shadow: 4px 4px 4px rgba(30, 30, 30, 0.6);
    border-radius: 50%;
`

// const picPosition = {
//     marginTop: '10px'  
// }

const Pizza = (props) => {

    let history = useHistory()

    let image_id = null

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
    const [loaded, setLoaded] = useState(false)

    const uri = props.match.params.slug
    const url = `/api/v1/pizzas/${uri}`

    useState(() => {
        axios.get(url)
            .then(response => {
                setPizza(response.data.data.attributes)
                setLoaded(true)
            })
            .catch(response => {
                console.log(response)
            })
    })

    const handleDeleteSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.delete(url, config)
            .then(response => {
                history.push('/pizzas')
            })
            .catch(response => {
                console.log(response)
            })
    }

    if(loaded)
        if(pizza.photo_data != undefined || pizza.photo_data != null)
            image_id = JSON.parse(pizza.photo_data)

    return(
        <Container>
            <Row>
                <Col xs={{span: 11, offset: 1}} sm={{span: 11, offset: 1}} md={{span: 3, offset:0}} lg={{span: 3, offset:0}} xl={{span: 3, offset:0}}>
                    {
                        image_id != null ? 
                        <Img src={`/uploads/${image_id.id}`} alt={pizza.name} /> :
                         '' 
                    }
                </Col>
                <Col xs={{span: 12, offset: 0}} sm={{span: 12, offset: 0}} md={{span: 9, offset:0}} lg={{span: 9, offset:0}} xl={{span: 9, offset:0}}>
                    <Row className="pt-3">
                        <Col className="pt-5" xs={9} sm={9} md={9} lg={9} >
                            <h3>{ pizza.name }</h3>
                        </Col>
                    </Row>
                    <Row className="pt-2">
                        <Col xs={{span: 10, offset: 0}} sm={{span: 10, offset: 0}} md={{span: 9, offset:0}} lg={{span: 9, offset:0}} xl={{span: 9, offset:0}} className="bg-success">
                            <p>{ pizza.description }</p>
                        </Col>
                    </Row>
                    <Row className="pt-2">
                        <Col xs={{span: 10, offset: 0}} sm={{span: 10, offset: 0}} md={{span: 9, offset:0}} lg={{span: 9, offset:0}} xl={{span: 9, offset:0}}>
                            <strong>R$ { pizza.value },00 </strong>
                        </Col>
                    </Row>
                    <Row className={"pt-2 pb-3"}>
                        <Col xs={{span: 5, offset: 0}} sm={{span: 5, offset: 0}} md={{span: 2, offset: 0}} lg={{span: 2, offset: 0}} xl={{span: 2, offset: 0}}>
                            <div className="d-grid gap-2">
                                <Button href={"/pizzas"} variant={"primary"}>
                                    <i className="fas fa-arrow-left"></i> Retornar
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="pb-3">
                        <Col xs={{span: 5, offset: 0}} sm={{span: 5, offset: 0}} md={{span: 2, offset: 0}} lg={{span: 2, offset: 0}} xl={{span: 2, offset: 0}}>
                            <div className="d-grid gap-2">
                                {
                                    user_type == 1 ?
                                    <Button variant="success" href={`/pizzas/atualizar/${ pizza.slug }`}>
                                        <i className="far fa-edit"></i> Atualizar
                                    </Button> :
                                    ''
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row className="pb-3">
                        <Col xs={{span: 5, offset: 0}} sm={{span: 5, offset: 0}} md={{span: 2, offset: 0}} lg={{span: 2, offset: 0}} xl={{span: 2, offset: 0}}>
                            <div className="d-grid gap-2">
                                {
                                    user_type == 1 ?
                                    <Button variant="danger" onClick={handleDeleteSubmit}>
                                        <i className="fas fa-trash-alt"></i> Excluir
                                    </Button> :
                                    ''
                                }
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Pizza