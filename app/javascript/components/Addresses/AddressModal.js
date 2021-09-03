import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const AddressModal = (props) => {

    return(
        <Modal show={props.modal} onHide={props.handleModalClose} backdrop={true}>
            <Modal.Header>
                <h2>{ props.modalContent.description }</h2>
            </Modal.Header>

            <Modal.Body>
                <p>
                    Endereço: { props.modalContent.street ? props.modalContent.street : 'Não informado' } <br />
                    Número: { props.modalContent.number ? props.modalContent.number : 'Não informado' } <br />
                    CEP: { props.modalContent.zipcode ? props.modalContent.zipcode : 'Não informado' } <br />
                    Referência: { props.modalContent.reference ? props.modalContent.reference : 'Não informado' } <br />
                    Observação: { props.modalContent.note ? props.modalContent.note : 'Não informado' }
                </p>
            </Modal.Body>

            <Modal.Footer>                                      
                <Button variant="danger" onClick={props.handleDeleteButton(props.modalContent.slug)}>
                    <i className="far fa-trash-alt"></i> Apagar
                </Button>
                <Button onClick={props.handleCloseButton}>
                    <i className="far fa-window-close"></i> Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddressModal