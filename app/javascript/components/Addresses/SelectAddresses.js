import React from 'react'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap'

const SelectAddresses = (props) => {

    return(
        <Form.Group as={Row} className="mb-3" controlId="orderAdress">
            <Form.Label column xs={3} sm={2} md={2}>
                Endereço:
            </Form.Label>
            <Col xs={8} sm={8} md={8}>
                <Select
                    placeholder="Número da casa, rua, etc."
                    isSearchable
                    onChange={props.handleAddressChange}
                    options={props.addresses}
                />
            </Col>
        </Form.Group>
    )
}

export default SelectAddresses