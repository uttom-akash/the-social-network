import React from 'react'
import {Modal,Header} from 'semantic-ui-react'

export default ({header,children,open,onClose})=> {
    return (
        <Modal open={open} closeIcon onClose={onClose} size='small'>
            <Header content={header} />
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}
