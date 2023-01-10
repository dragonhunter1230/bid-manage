import {
  Button,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  Select,
  Textarea,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'

import React, { useMemo, useState, useEffect } from 'react'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'

// Custom components
import Card from 'components/card/Card'
import Menu from 'components/menu/MainMenu'
import { TableProps } from 'views/admin/default/variables/columnsData'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import axios, { formToJSON } from 'axios'
import { backendURL1 } from 'utils/constants'
import { isEmpty } from '@chakra-ui/utils'

export default function ColumnsTable(props: TableProps) {
  const { columnsData, tableData, cardTitle, selectID, getBIDList } = props

  const columns = useMemo(() => columnsData, [columnsData])
  const data = useMemo(() => tableData, [tableData])

  const { isOpen, onClose, onOpen } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [jdate, setJdate] = useState('')
  const [bdate, setBdate] = useState('')
  const [count, setCount] = useState('')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [payment, setPayment] = useState(1)

  const sendBid = () => {

    const data = {
      user_id: selectID,
      client_name: name,
      client_country: country,
      join_date: jdate,
      bid_date: bdate,
      bid_count: count,
      bid_content: content,
      chat_content: '',
      task_url: url,
      payment_flag: payment,
      // user_id: props.id
    }

    console.log(data);

    axios.post(backendURL1 + '/bid/insert', data)
      .then(res => {
        //console.log(res)
        setName('')
        setCountry('')
        setJdate('')
        setBdate('')
        setCount('')
        setContent('')
        setUrl('')
        setPayment(1)
        onClose()
        getBIDList()
      })
      .catch(err => console.log(err))
  }

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState
  } = tableInstance
  initialState.pageSize = 5

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  const alarmColor = useColorModeValue('green.500', 'green')

  return (
    <Card
      flexDirection='column'
      w='100%'
      px='0px'
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px='25px' justify='space-between' align='center' mt={'1rem'}>
        <Flex justifyContent={'space-evenly'} fontSize={28} alignItems={'baseline'}>
          {
            isEmpty(tableData) ? <Flex>There are not
              <Flex ml={5} mr={5} fontSize={32} color={'red.600'}>{cardTitle}</Flex>
              's BID list</Flex>
              :
              <Flex><Flex ml={5} mr={5} fontSize={32} color={'red.600'}>{cardTitle}</Flex>
                's BID list</Flex>
          }
        </Flex>
        <Button onClick={onOpen} leftIcon={<AddIcon />} colorScheme={'red'} size={'sm'} borderRadius={5}>BID</Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form id="inputbox" method="POST" onSubmit={sendBid} autoComplete={'off'}>
                <FormControl>
                  <FormLabel>Client Name</FormLabel>
                  <Input
                    placeholder='client name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Client Country</FormLabel>
                  <Input
                    placeholder='Client Country'
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Join Date</FormLabel>
                  <Input
                    placeholder="Joindate"
                    size="md"
                    type="datetime-local"
                    value={jdate}
                    onChange={e => setJdate(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Bid Date</FormLabel>
                  <Input
                    placeholder="Bid Date"
                    size="md"
                    type="datetime-local"
                    value={bdate}
                    onChange={e => setBdate(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Bid Count</FormLabel>
                  <Input
                    placeholder='Bid Count'
                    value={count}
                    onChange={e => setCount(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Payment</FormLabel>
                  <Select onChange={e => setPayment(e.target.value)}>
                    <option value='1'>verify</option>
                    <option value='0'>none verify</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>BID Content</FormLabel>
                  <Textarea
                    placeholder='Here is a sample placeholder'
                    size='sm'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Task URL</FormLabel>
                  <Input
                    placeholder='URL'
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                  />
                </FormControl>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={sendBid}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      {
        !isEmpty(tableData) ?
          <Table {...getTableProps()} variant='simple' color='gray.500' display={'table'} overflow={'auto'} p='1rem' width={'auto'}>
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      pe='10px'
                      key={index}
                      borderColor={borderColor}
                    >
                      <Flex
                        justify='space-between'
                        align='center'
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color='gray.400'
                      >
                        {column.render('Header')}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row)
                return (
                  <Tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data
                      if (cell.column.Header === 'ClientName') {
                        data = (
                          <Flex align='center'>
                            <Text
                              me='10px'
                              color={textColor}
                              fontSize='sm'
                              fontWeight='700'
                            >
                              {cell.value}
                            </Text>
                          </Flex>
                        )
                      } else if (cell.column.Header === 'Country') {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        )
                      } else if (cell.column.Header === 'JoinDate') {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        )
                      } else if (cell.column.Header === 'BidDate') {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Verified') {
                        data = (
                          <Text color={cell.value ? alarmColor : textColor} fontSize='sm' fontWeight='700'>
                            {cell.value ? 'Verified' : ''}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Message') {
                        data = (
                          <Text color={cell.value ? alarmColor : textColor} fontSize='sm' fontWeight='700'>
                            {cell.value ? 'Message' : ''}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Finished') {
                        data = (
                          <Text color={cell.value ? alarmColor : textColor} fontSize='sm' fontWeight='700'>
                            {cell.value ? 'Finished' : ''}
                          </Text>
                        )
                      } else if (cell.column.Header === 'TaskURL') {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Action') {
                        data = (
                          <Flex>
                            <IconButton icon={<EditIcon />} colorScheme={'messenger'} size={'sm'} aria-label={''} />
                            <Button onClick={onOpen} leftIcon={<AddIcon />} colorScheme={'red'} size={'sm'} borderRadius={5}>BID</Button>
                            <Modal
                              initialFocusRef={initialRef}
                              finalFocusRef={finalRef}
                              isOpen={isOpen}
                              onClose={onClose}
                            >
                              <ModalOverlay />
                              <ModalContent>
                                <ModalHeader>Create your account</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                  <form id="inputbox" method="POST" onSubmit={sendBid} autoComplete={'off'}>
                                    <FormControl>
                                      <FormLabel>Client Name</FormLabel>
                                      <Input
                                        placeholder='client name'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                      />
                                    </FormControl>

                                    <FormControl mt={4}>
                                      <FormLabel>Client Country</FormLabel>
                                      <Input
                                        placeholder='Client Country'
                                        value={country}
                                        onChange={e => setCountry(e.target.value)}
                                      />
                                    </FormControl>
                                    <FormControl mt={4}>
                                      <FormLabel>Join Date</FormLabel>
                                      <Input
                                        placeholder="Joindate"
                                        size="md"
                                        type="datetime-local"
                                        value={jdate}
                                        onChange={e => setJdate(e.target.value)}
                                      />
                                    </FormControl>
                                    <FormControl mt={4}>
                                      <FormLabel>Bid Date</FormLabel>
                                      <Input
                                        placeholder="Bid Date"
                                        size="md"
                                        type="datetime-local"
                                        value={bdate}
                                        onChange={e => setBdate(e.target.value)}
                                      />
                                    </FormControl>
                                    <FormControl mt={4}>
                                      <FormLabel>Bid Count</FormLabel>
                                      <Input
                                        placeholder='Bid Count'
                                        value={count}
                                        onChange={e => setCount(e.target.value)}
                                      />
                                    </FormControl>
                                    <FormControl mt={4}>
                                      <FormLabel>Payment</FormLabel>
                                      <Select onChange={e => setPayment(e.target.value)}>
                                        <option value='1'>verify</option>
                                        <option value='0'>none verify</option>
                                      </Select>
                                    </FormControl>
                                    <FormControl mt={4}>
                                      <FormLabel>BID Content</FormLabel>
                                      <Textarea
                                        placeholder='Here is a sample placeholder'
                                        size='sm'
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                      />
                                    </FormControl>
                                    <FormControl mt={4}>
                                      <FormLabel>Task URL</FormLabel>
                                      <Input
                                        placeholder='URL'
                                        value={url}
                                        onChange={e => setUrl(e.target.value)}
                                      />
                                    </FormControl>
                                  </form>
                                </ModalBody>

                                <ModalFooter>
                                  <Button colorScheme='blue' mr={3} onClick={sendBid}>
                                    Save
                                  </Button>
                                  <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                              </ModalContent>
                            </Modal>
                            <IconButton icon={<DeleteIcon />} colorScheme={'messenger'} size={'sm'} aria-label={''} />
                            <Button ml={1} leftIcon={<AddIcon />} colorScheme={'messenger'} size={'sm'}>chat</Button>
                          </Flex>
                        )
                      }
                      return (
                        <Td
                          {...cell.getCellProps()}
                          key={index}
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          borderColor='transparent'
                        >
                          {data}
                        </Td>
                      )
                    })}
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
          :
          null
      }
    </Card>
  )
}
