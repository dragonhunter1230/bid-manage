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
import { isEmpty } from '@chakra-ui/utils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendURL } from 'utils/constants'

export default function Default(props: {
    selectID: number
    chat: string
    flag: boolean
    closeModal: () => void
}): JSX.Element {
    const { selectID, chat, flag, closeModal } = props

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [chatContent, setChatContent] = useState('')
    const [beforeChatContent, setBeforeChatContent] = useState('')

    useEffect(() => {
        setChatContent('')
        setBeforeChatContent(chat)
    }, [chat])

    const InsertChat = () => {
        if (isEmpty(chatContent)) {
            return
        }
        axios.put(backendURL + `/bid/${selectID}`, { chat_content: beforeChatContent + '#' + chatContent })
            .then(() => {
                setChatContent('')
                closeModal()
            })
            .catch(err => console.log(err))
    }
    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={flag}
            onClose={closeModal}
            isCentered
        >
            <ModalOverlay />
            <ModalContent color='white' bg='blue.800' borderColor='blue.800'>
                <ModalHeader>Insert Chat</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form id="inputbox" method="POST" autoComplete={'off'}>
                        <FormControl>
                            <FormLabel>Chat Content</FormLabel>
                            <Textarea onChange={(e) => setChatContent(e.target.value)}>{chatContent}</Textarea>
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme='green'
                        mr={'1rem'}
                        onClick={InsertChat}
                    >
                        Insert
                    </Button>
                    <Button colorScheme='blue' onClick={closeModal}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
