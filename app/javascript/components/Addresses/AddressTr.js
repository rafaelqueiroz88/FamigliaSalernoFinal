import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import AddressModal from './AddressModal'

const AddressTr = (props) => {

    return(
        <tr>
            <td>{ props.attributes.street }</td>
            <td>
                <Button onClick={props.handleModalButton(props.attributes)}>
                    <i className="far fa-eye"></i> Ver +
                </Button>
            </td>
        </tr>
    )
}

export default AddressTr