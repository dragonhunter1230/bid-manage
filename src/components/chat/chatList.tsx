// Chakra imports
import {
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    ModalCloseButton,
    Textarea,
    Button,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function Default(props: {
    bid: string
    chat: string
    flag: boolean
    closeModal: () => void
}): JSX.Element {
    const { bid, chat, flag, closeModal } = props

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [bidContent, setBidContent] = useState('')
    const [chatContent, setChatContent] = useState('')

    useEffect(() => {
        setBidContent(bid)
        setChatContent(chat)
    }, [bid, chat])
    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={flag}
            onClose={closeModal}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>BID Detail Data</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form id="inputbox" method="POST" autoComplete={'off'}>
                        <FormControl>
                            <FormLabel>BID Content</FormLabel>
                            <Textarea>{bidContent}</Textarea>
                        </FormControl>

                        <FormControl mt={2}>
                            <FormLabel>Chat History</FormLabel>
                            <Textarea>{chatContent}</Textarea>
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={closeModal}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
