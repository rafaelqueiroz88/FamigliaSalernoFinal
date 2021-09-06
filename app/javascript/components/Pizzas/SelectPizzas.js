import React from 'react'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap'

const SelectPizzas = (props) => {

    return(
        <Form.Group as={Row} className="mb-3" controlId="orderPizzasPrimary">
            <Form.Label column xs={3} sm={2} md={2}>
                Sabor:
            </Form.Label>
            <Col xs={8} sm={8} md={8}>
                <Select
                    placeholder="Sabor da Pizza"
                    isSearchable
                    onChange={props.handleAddressChange}
                    options={props.pizzas}
                />
            </Col>
        </Form.Group>
    )
}

export default SelectPizzas