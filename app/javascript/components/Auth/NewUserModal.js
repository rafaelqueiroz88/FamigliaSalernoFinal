import React from 'react'
import { Row, Col, Form, Button, Modal } from 'react-bootstrap'

const NewUserModal = (props) => {

    return(
        <Modal show={props.modal} onHide={props.handleModalClose} backdrop={true}>
            <Form onSubmit={props.handleNewUserFormSubmit}>
                <Modal.Header>
                    Novo Usuário?
                </Modal.Header>
                <Modal.Body>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2">
                            Nome
                        </Form.Label>
                        <Col sm="10" md="4">
                            <Form.Control onChange={props.handleFormChange} name="name" type="text" placeholder="Joãozinho do Forró" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2">
                            E-mail
                        </Form.Label>
                        <Col sm="10" md="4">
                            <Form.Control onChange={props.handleFormChange} name="email" type="text" placeholder="nome@examplo.com" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="authPassword">
                        <Form.Label column sm="2" md="2">
                            Password
                        </Form.Label>
                        <Col sm="10" md="4">
                            <Form.Control onChange={props.handleFormChange} name="password" type="password" placeholder="******" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="authPasswordConfirm">
                        <Form.Label column sm="2" md="2">
                            Confirm
                        </Form.Label>
                        <Col sm="10" md="4">
                            <Form.Control onChange={props.handleFormChange} name="password_confirm" type="password" placeholder="Confirm Password" />
                        </Col>
                    </Form.Group>
                
                    {/* <Form.Group as={Row} className="mb-3">
                        { props.errorMessage }
                    </Form.Group> */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">
                        <i className="far fa-save"></i> Cadastrar
                    </Button>                                        
                    <Button variant="warning" onClick={props.handleCloseButton}>
                        <i className="far fa-times-circle"></i> Cancelar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default NewUserModal