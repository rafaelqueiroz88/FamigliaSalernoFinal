import React from 'react'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap'

const SelectPizzas = (props) => {

    return(
        <div id={`pizza-select`}>
            <Form.Group as={Row} className="mb-3" controlId="orderPizzasPrimary">
                <Form.Label column xs={3} sm={2} md={2}>
                    Sabor:
                </Form.Label>
                <Col xs={8} sm={8} md={8}>
                    <Select
                        id={`${props.id}`}
                        placeholder="Sabor da Pizza"
                        isSearchable
                        onChange={props.handlePizza(props.half)}
                        options={props.pizzas}
                    />
                </Col>
            </Form.Group>
            {
                props.half == "primary" ?
                <Form.Group as={Row} className="mb-3" controlId="orderChangeHalf">
                    <Col xs={{ span:9, offset: 1 }} sm={{ span:9, offset: 1 }} md={{ span: 8, offset: 2 }}>
                        <Form.Switch
                            onChange={props.handleNewHalf}
                            type="switch"
                            id="half-types"
                            label="Add outra metade?"
                        />
                    </Col>
                </Form.Group> :
                ''
            }
        </div>
    )
}

export default SelectPizzas