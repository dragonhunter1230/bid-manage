// Chakra imports
import {
    FormLabel,
    Input,
    Grid,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    SimpleGrid,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    ModalCloseButton,
    Select,
    Textarea,
    Button,
    Switch,
    Flex,
    Box,
} from '@chakra-ui/react'
import { isEmpty } from '@chakra-ui/utils'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { backendURL } from 'utils/constants'
import { format } from 'date-fns'
// Custom components

export default function Default(props: {
    selectID: string
    data: {
        id: number,
        user_id: number,
        client_name: string,
        client_country: string,
        join_date: string,
        bid_date: string,
        bid_count: number,
        bid_content: string,
        chat_content: string,
        task_url: string,
        payment_flag: number,
        message_flag: number,
        finished_flag: number,
    }
    flag: boolean
    type: boolean
    closeModal: () => void
}): JSX.Element {
    const { selectID, data, flag, type, closeModal } = props

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [jdate, setJdate] = useState('')
    const [bdate, setBdate] = useState('')
    const [count, setCount] = useState(null)
    const [content, setContent] = useState('')
    const [url, setUrl] = useState('')
    const [payment, setPayment] = useState(1)
    const [chatContent, setChatContent] = useState('')
    const [messageFlag, setMessageFlag] = useState(false)
    const [hiredFlag, setHiredFlag] = useState(false)
    const [newChat, setNewChat] = useState('')

    useEffect(() => {
        console.log('bid-type:', type)
        switch (type) {
            case true:
                setName('')
                setCountry('')
                setJdate('')
                setBdate('')
                setCount('')
                setContent('')
                setUrl('')
                setChatContent('')
                setPayment(1)
                setChatContent('')
                setMessageFlag(false)
                setHiredFlag(false)
                return
            case false:
                setName(data.client_name)
                setCountry(data.client_country)
                setJdate(format(new Date(data.join_date), 'yyyy-MM-dd'))
                setBdate(format(new Date(data.bid_date), 'yyyy-MM-dd'))
                setCount(data.bid_count)
                setContent(data.bid_content)
                setUrl(data.task_url)
                setChatContent(data.chat_content)
                setPayment(data.payment_flag)
                setMessageFlag(data.message_flag ? true : false)
                setHiredFlag(data.finished_flag ? true : false)
        }
    }, [data, type])

    const onClickBtn = () => {
        if (isEmpty(selectID)) {
            return;
        } else if (isEmpty(name)) {
            return;
        } else if (isEmpty(country)) {
            return;
        } else if (isEmpty(jdate)) {
            return;
        } else if (isEmpty(bdate)) {
            return;
        } else if (isEmpty(count)) {
            return;
        } else if (isEmpty(content)) {
            return;
        } else if (isEmpty(url)) {
            return;
        } else if (isEmpty(payment)) {
            return;
        }

        if (type) {
            const newData = {
                user_id: selectID,
                client_name: name,
                client_country: country,
                join_date: jdate,
                bid_date: bdate,
                bid_count: count,
                bid_content: content,
                chat_content: chatContent,
                task_url: url,
                payment_flag: payment,
            }

            console.log(newData);

            axios.post(backendURL + '/bid', newData)
                .then(res => {
                    //console.log(res)
                    setName('')
                    setCountry('')
                    setJdate('')
                    setBdate('')
                    setCount('')
                    setContent('')
                    setUrl('')
                    setChatContent('')
                    setPayment(1)
                    closeModal()
                })
                .catch(err => console.log(err))
        } else {
            const newData = {
                user_id: selectID,
                client_name: name,
                client_country: country,
                join_date: jdate,
                bid_date: bdate,
                bid_count: count,
                bid_content: content,
                chat_content: chatContent,
                task_url: url,
                payment_flag: payment,
                message_flag: messageFlag,
                finished_flag: hiredFlag,
            }

            console.log(newData);

            axios.put(backendURL + `/bid/${data.id}`, newData)
                .then(res => {
                    //console.log(res)
                    setName('')
                    setCountry('')
                    setJdate('')
                    setBdate('')
                    setCount('')
                    setContent('')
                    setUrl('')
                    setChatContent('')
                    setPayment(1)
                    closeModal()
                })
                .catch(err => console.log(err))
        }

    }

    const addNewChat = () => {
        axios.put(backendURL + `/bid/${data.id}`, { chat_content: chatContent + '#' + newChat })
            .then(() => {
                console.log(chatContent + newChat)
                setChatContent((prev) => prev + newChat)
            })
            .catch(err => console.log(err))
    }

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={flag}
            onClose={closeModal}
            size="4xl"
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{type ? 'Create your BID' : 'Edit your BID'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Grid gridTemplateColumns={{ md: 'repeat(2, 1fr)' }} gap={{ base: '20px', md: '20px' }}>
                        <Box>
                            <FormControl>
                                <FormLabel ml={4}>Task URL</FormLabel>
                                <Input
                                    placeholder='URL'
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                />
                            </FormControl>
                            <Flex mt={4}>
                                <FormControl mr={10}>
                                    <FormLabel ml={4}>Client Name</FormLabel>
                                    <Input
                                        placeholder='client name'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel ml={4}>Client Country</FormLabel>
                                    <Input
                                        placeholder='Client Country'
                                        value={country}
                                        onChange={e => setCountry(e.target.value)}
                                    />
                                </FormControl>
                            </Flex>
                            <FormControl mt={4}>
                                <FormLabel ml={4}>Join Date</FormLabel>
                                <Input
                                    placeholder="Joindate"
                                    size="md"
                                    type="date"
                                    value={jdate}
                                    onChange={e => setJdate(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel ml={4}>Bid Date</FormLabel>
                                <Input
                                    placeholder="Bid Date"
                                    size="md"
                                    type="date"
                                    value={bdate}
                                    onChange={e => setBdate(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel ml={4}>Proposals</FormLabel>
                                {/* <NumberInput
                                    placeholder='Bid Count'
                                    value={count}
                                    onChange={e => setCount(e.target.value)}
                                /> */}
                                <NumberInput value={count} min={0} max={100}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <Flex justifyContent={'space-between'} mt="5">
                                <FormControl display={'flex'}>
                                    <FormLabel ml={4}>Payment</FormLabel>
                                    <Switch
                                        isChecked={payment ? true : false}
                                        onChange={e => setPayment(parseInt(e.target.value))} />
                                    {/* <Select value={payment} onChange={e => setPayment(parseInt(e.target.value))}>
                                        <option value='1'>verify</option>
                                        <option value='0'>none verify</option>
                                    </Select> */}
                                </FormControl>
                                {
                                    !type ?
                                        <FormControl display={'flex'}>
                                            <FormLabel ml={4}>Message</FormLabel>
                                            <Switch
                                                isChecked={messageFlag}
                                                onChange={() => setMessageFlag(!messageFlag)} />
                                        </FormControl>
                                        :
                                        null
                                }
                                {
                                    !type && messageFlag ?
                                        <FormControl display={'flex'}>
                                            <FormLabel ml={4}>Hired</FormLabel>
                                            <Switch
                                                isChecked={hiredFlag}
                                                onChange={() => setHiredFlag(!hiredFlag)} />
                                        </FormControl>
                                        :
                                        null
                                }
                            </Flex>
                            <FormControl mt={4}>
                                <FormLabel ml={4}>BID Sentence</FormLabel>
                                <Textarea
                                    placeholder='Here is a sample placeholder'
                                    size='sm'
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <Flex flexDirection={'column'} justifyContent="space-between" height={'100%'}>
                            <FormControl mt={4}>
                                <FormLabel ml={4}>Chat History</FormLabel>
                                <Textarea
                                    readOnly
                                    rows="20"
                                    value={chatContent}
                                ></Textarea>
                            </FormControl>
                            <Box>
                                <Textarea
                                    mt={4}
                                    placeholder='Here is a sample placeholder'
                                    size='sm'
                                    value={newChat}
                                    onChange={e => setNewChat(e.target.value)}
                                />
                                <Flex mt={4} justifyContent={'end'}>
                                    <Button colorScheme='green' mr={3} onClick={addNewChat} w={'100px'}>
                                        ADD CHAT
                                    </Button>
                                </Flex>
                            </Box>
                        </Flex>
                    </Grid>
                </ModalBody>

                {/* <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={onClickBtn} w={'100px'}>
                        {type ? 'ADD' : 'SAVE'}
                    </Button>
                    <Button colorScheme='blue' onClick={closeModal} w={'100px'}>Cancel</Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
    )
}
