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
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import { isEmpty } from '@chakra-ui/utils'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { backendURL, countryList } from 'utils/constants'
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
    getBIDList: () => void
    closeModal: () => void
}): JSX.Element {

    const { selectID, data, flag, type, closeModal, getBIDList } = props

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const cancelRef = React.useRef(null)

    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [jdate, setJdate] = useState('')
    const [bdate, setBdate] = useState('')
    const [count, setCount] = useState(0)
    const [content, setContent] = useState('')
    const [url, setUrl] = useState('')
    const [payment, setPayment] = useState(1)
    const [chatContent, setChatContent] = useState('')
    const [messageFlag, setMessageFlag] = useState(false)
    const [hiredFlag, setHiredFlag] = useState(false)
    const [newChat, setNewChat] = useState('')
    const [alertFlag, setAlertFlag] = useState(false)
    const [alertContent, setAlertContent] = useState('')
    const [alertTitle, setAlertTitle] = useState('')

    const initialStateBID = () => {
        setName('')
        setCountry('')
        setJdate('')
        setBdate('')
        setCount(0)
        setContent('')
        setUrl('')
        setChatContent('')
        setPayment(1)
        setChatContent('')
        setMessageFlag(false)
        setHiredFlag(false)
    }

    const initialStateChat = (BidData: any) => {
        setName(BidData.client_name)
        setCountry(BidData.client_country)
        setJdate(format(new Date(BidData.join_date), 'yyyy-MM-dd'))
        setBdate(format(new Date(BidData.bid_date), 'yyyy-MM-dd'))
        setCount(BidData.bid_count)
        setContent(BidData.bid_content)
        setUrl(BidData.task_url)
        setChatContent(BidData.chat_content)
        setPayment(BidData.payment_flag)
        setMessageFlag(BidData.message_flag ? true : false)
        setHiredFlag(BidData.finished_flag ? true : false)
    }

    useEffect(() => {
        setNewChat('')
    }, [])

    useEffect(() => {
        console.log('bid-type:', type, ':', data)
        switch (type) {
            case true:
                initialStateBID()
                return
            case false:
                initialStateChat(data)
        }
    }, [data, type])

    const addNewBID = () => {
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

                    initialStateBID()
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
                    initialStateBID()
                    closeModal()
                })
                .catch(err => console.log(err))
        }

    }

    const addNewChat = () => {
        if (isEmpty(newChat)) {
            setAlertFlag(true)
            setAlertTitle('Warning')
            setAlertContent('The "newChat" yard is empty.')
            setTimeout(() => {
                setAlertFlag(false)
            }, 1500);
            return;
        }
        axios.put(backendURL + `/bid/${data.id}`, { chat_content: chatContent + newChat + '\n' })
            .then(() => {
                axios.get(`${backendURL}/bid/${selectID}`)
                    .then(res => {
                        setChatContent(res.data.data.find((value: any) => { return value.id === data.id }).chat_content)
                        setNewChat('')
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const changeMessage = () => {
        setMessageFlag(!messageFlag)
        if (messageFlag) {
            setHiredFlag(false)
        }
        axios.put(backendURL + `/bid/${data.id}`, {
            message_flag: !messageFlag,
            finished_flag: messageFlag ? false : hiredFlag,
        })
            .then(() => {
                setAlertFlag(true)
                setAlertTitle('Success!')
                setAlertContent('The "message" yard has been successfully changed.')
                setTimeout(() => {
                    setAlertFlag(false)
                }, 1000);
            })
            .catch(err => console.log(err))
    }

    const changeHired = () => {
        setHiredFlag(!hiredFlag)
        axios.put(backendURL + `/bid/${data.id}`, {
            finished_flag: !hiredFlag,
        })
            .then(() => {
                setAlertFlag(true)
                setAlertTitle('Success!')
                setAlertContent('The "hired" yard has been successfully changed.')
                setTimeout(() => {
                    setAlertFlag(false)
                }, 1000);
            })
            .catch(err => console.log(err))
    }

    const closeAlert = () => {
        setAlertFlag(false)
    }

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={flag}
            onClose={closeModal}
            size={type ? '2xl' : '4xl'}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{type ? 'Create Your BID' : 'Edit Your BID'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Grid templateColumns={{ md: `repeat(${type ? 1 : 2}, 1fr)` }} gap={{ base: '20px', md: '20px' }}>
                        <Box>
                            <FormControl>
                                <FormLabel ml={4}>Task URL</FormLabel>
                                <Input
                                    placeholder='https://www.upwork.com/jobs/~019fc6aa053ece3ae5'
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    readOnly={!type}
                                />
                            </FormControl>
                            <Flex mt={4}>
                                <FormControl mr={10}>
                                    <FormLabel ml={4}>Client Name</FormLabel>
                                    <Input
                                        placeholder='Client Name'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        readOnly={!type}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel ml={4}>Client Country</FormLabel>
                                    <Select
                                        placeholder='Select Country'
                                        isReadOnly={!type}
                                        onChange={e => setCountry(countryList[parseInt(e.target.value)])}
                                        value={countryList.findIndex((value: any) => { return value === country })}
                                    >
                                        {
                                            countryList.map((row, index) => {
                                                return <option value={index}>{row}</option>
                                            })
                                        }
                                    </Select>
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
                                    readOnly={!type}
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
                                    readOnly={!type}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel ml={4}>Proposals</FormLabel>
                                <NumberInput
                                    value={count}
                                    min={0}
                                    max={100}
                                    onChange={(value) => setCount(parseInt(value))}
                                    isReadOnly={!type}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <Flex justifyContent={'space-between'} mt={6}>
                                <FormControl display={'flex'}>
                                    <FormLabel ml={4}>Payment Veryfied</FormLabel>
                                    <Switch
                                        isChecked={payment ? true : false}
                                        onChange={e => {
                                            setPayment(parseInt(e.target.value))
                                        }}
                                        readOnly={!type}
                                    />
                                </FormControl>
                                {
                                    !type ?
                                        <FormControl display={'flex'}>
                                            <FormLabel ml={4}>Message</FormLabel>
                                            <Switch
                                                isChecked={messageFlag}
                                                onChange={() => {
                                                    changeMessage()
                                                }}
                                            />
                                        </FormControl>
                                        :
                                        null
                                }
                                {
                                    !type ?
                                        <FormControl display={'flex'}>
                                            <FormLabel ml={4}>Hired</FormLabel>
                                            <Switch
                                                isChecked={hiredFlag}
                                                onChange={() => {
                                                    changeHired()
                                                }}
                                                readOnly={!messageFlag}
                                            />
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
                                    readOnly={!type}
                                />
                            </FormControl>
                            {
                                type ?
                                    <Flex mt={4} justifyContent={'end'}>
                                        <Button colorScheme='green' mr={3} onClick={addNewBID} w={'100px'}>
                                            ADD BID
                                        </Button>
                                    </Flex>
                                    :
                                    null
                            }
                        </Box>
                        {
                            !type ?
                                <Flex direction={'column'} justifyContent="space-between" height={'100%'}>
                                    <FormControl>
                                        <FormLabel ml={4}>Chat History</FormLabel>
                                        <Textarea
                                            readOnly
                                            rows={22}
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
                                :
                                null
                        }
                    </Grid>
                </ModalBody>

                <AlertDialog
                    isOpen={alertFlag}
                    leastDestructiveRef={cancelRef}
                    onClose={closeAlert}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='xl' fontWeight='bold' color={'red'}>
                                {alertTitle}
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                {alertContent}
                            </AlertDialogBody>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </ModalContent>
        </Modal>
    )
}
