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
  useColorModeValue,
  useDisclosure,
  Tooltip,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Box,
  ButtonGroup,
  PopoverFooter
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
import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import axios, { formToJSON } from 'axios'
import { backendURL } from 'utils/constants'
import { isEmpty } from '@chakra-ui/utils'
import moment from 'moment'
import BID from 'components/bid/bid'
import ChatList from 'components/chat/chatList'
import InsertChat from 'components/chat/insertChat'
export default function ColumnsTable(props: TableProps): JSX.Element {
  const { columnsData, tableData, cardTitle, selectID, getBIDList } = props

  const initialFocusRef = React.useRef()
  const columns = useMemo(() => columnsData, [columnsData])
  const data = useMemo(() => tableData, [tableData])
  const [actionType, setActionType] = useState(true)
  const [selectData, setSelectData] = useState({})
  const [modalFlag, setModalFlag] = useState(false)
  const [datailBIDData, setDetailBIDData] = useState('')
  const [datailChatData, setDetailChatData] = useState('')
  const [detailFlag, setDetailFlag] = useState(false)
  const [insertChatFlag, setInsertChatFlag] = useState(false)
  const [selectBIDId, setSelectBIDId] = useState(null)
  const [beforeChatContent, setBeforeChatContent] = useState('')
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

  const AddBID = () => {
    setActionType(true)
    setModalFlag(true)
  }

  const EditBID = (key: object) => {
    console.log(key)
    setSelectData(key)
    setActionType(false)
    setModalFlag(true)
  }

  const CloseModal = () => {
    setModalFlag(false)
    setDetailFlag(false)
    setInsertChatFlag(false)
    getBIDList()
  }

  const DisplayDetailData = (bid: string, chat: string) => {
    setDetailBIDData(bid)
    setDetailChatData(chat)
    setDetailFlag(true)
  }

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
            isEmpty(tableData) ? <Flex alignItems={'baseline'}>There are not
              <Flex ml={5} fontSize={32} color={'red.600'}>{cardTitle}</Flex>
              's BID list</Flex>
              :
              <Flex alignItems={'baseline'}><Flex ml={5} fontSize={32} color={'red.600'}>{cardTitle}</Flex>
                's BID list</Flex>
          }
        </Flex>
        <Button mr={'2rem'} onClick={AddBID} leftIcon={<AddIcon />} colorScheme={'red'} size={'sm'} borderRadius={5}>BID</Button>
      </Flex>
      {
        !isEmpty(tableData) ?
          <Table
            {...getTableProps()}
            variant='simple'
            color='gray.500'
            display={'flow-root'}
            overflow={'auto'}
            p='1rem'
            width={'auto'}
            height={'100%'}
            mr={'1rem'}
          >
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
                  <Tr {...row.getRowProps()} key={index} onClick={() => EditBID(row.original)} cursor={'pointer'}>
                    {row.cells.map((cell, index) => {
                      let data
                      if (cell.column.Header === 'Client') {
                        data = (
                          <Flex align='center' cursor={'pointer'}>
                            <Text
                              me='10px'
                              color={textColor}
                              fontSize='sm'
                              fontWeight='700'
                              minW={'max-content'}
                              onClick={() => DisplayDetailData(cell.row.original.bid_content, cell.row.original.chat_content)}
                            >
                              {cell.value}
                            </Text>
                          </Flex>
                        )
                      } else if (cell.column.Header === 'Country') {
                        data = (
                          <Flex align='center' cursor={'pointer'}>
                            <Text color={textColor} fontSize='sm' fontWeight='700' minW={'max-content'}>
                              {cell.value}
                            </Text>
                          </Flex>
                        )
                      } else if (cell.column.Header === 'JoinDate') {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {moment(cell.value).format('MM/DD/YYYY')}
                          </Text>
                        )
                      } else if (cell.column.Header === 'BidDate') {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {moment(cell.value).format('MM/DD/YYYY')}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Proposals') {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Verified') {
                        data = (
                          <Text color={cell.value ? alarmColor : textColor} fontSize='sm' fontWeight='700'>
                            {cell.value ? <CheckIcon /> : ''}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Message') {
                        data = (
                          <Text color={cell.value ? alarmColor : textColor} fontSize='sm' fontWeight='700'>
                            {cell.value ? <CheckIcon /> : ''}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Hired') {
                        data = (
                          <Text color={cell.value ? alarmColor : textColor} fontSize='sm' fontWeight='700'>
                            {cell.value ? <CheckIcon /> : ''}
                          </Text>
                        )
                      } else if (cell.column.Header === 'TaskURL') {
                        data = (
                          <Link href={cell.value} fontSize='sm' fontWeight='700' color={textColor} isExternal>
                            <Text maxW={110} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>{cell.value}</Text>
                          </Link>
                        )
                      } else if (cell.column.Header === 'Action') {
                        data = (
                          <Flex>
                            {/* <Tooltip label='Add Chat'>
                              <IconButton
                                icon={<AddIcon />}
                                colorScheme={'messenger'}
                                size={'sm'}
                                aria-label={''}
                                onClick={() => {
                                  setSelectBIDId(cell.row.original.id)
                                  setBeforeChatContent(cell.row.original.chat_content)
                                  setInsertChatFlag(true)
                                }}
                              />
                            </Tooltip> */}
                            <Tooltip label='Edit BID'>
                              <IconButton
                                ml={1}
                                icon={<EditIcon />}
                                colorScheme={'messenger'}
                                size={'sm'}
                                aria-label={''}
                                onClick={() => EditBID(cell.row.original)}
                              />
                            </Tooltip>
                            <Tooltip label='Delete BID'>
                              <Popover
                                initialFocusRef={initialFocusRef}
                                placement='bottom'
                                closeOnBlur={false}
                              >
                                {({ isOpen, onClose }) => (
                                  <>
                                    <PopoverTrigger>
                                      <IconButton ml={1} icon={<DeleteIcon />} colorScheme={'red'} size={'sm'} aria-label={''} />
                                    </PopoverTrigger>
                                    <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                                      <PopoverHeader pt={4} fontWeight='bold' border='0'>
                                        Delete Your BID
                                      </PopoverHeader>
                                      <PopoverArrow />
                                      <PopoverCloseButton />
                                      <PopoverBody>
                                        Delete the data by clicking the Delete button.
                                        However, this data still exists in the database.
                                      </PopoverBody>
                                      <PopoverFooter
                                        border='0'
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='end'
                                        pb={4}
                                      >
                                        <ButtonGroup size='sm'>
                                          <Button
                                            colorScheme='green'
                                            onClick={() => {
                                              axios.delete(backendURL + '/bid/' + cell.row.original.id)
                                                .then(res => {
                                                  console.log(res)
                                                  getBIDList()
                                                })
                                                .catch(err => {
                                                  console.log(err)
                                                })
                                              onClose()
                                            }}
                                          >
                                            Delete
                                          </Button>
                                          <Button colorScheme='blue' ref={initialFocusRef} onClick={onClose}>
                                            Cancel
                                          </Button>
                                        </ButtonGroup>
                                      </PopoverFooter>
                                    </PopoverContent>
                                  </>
                                )}
                              </Popover>
                            </Tooltip>
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
      <BID
        selectID={selectID}
        data={selectData}
        flag={modalFlag}
        type={actionType}
        closeModal={CloseModal}
      />
      <ChatList
        bid={datailBIDData}
        chat={datailChatData}
        flag={detailFlag}
        closeModal={CloseModal}
      />
      <InsertChat
        selectID={selectBIDId}
        chat={beforeChatContent}
        flag={insertChatFlag}
        closeModal={CloseModal}
      />
    </Card>
  )
}
