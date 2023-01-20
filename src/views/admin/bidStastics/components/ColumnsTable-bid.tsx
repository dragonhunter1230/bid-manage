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
  PopoverFooter,
  Input,
  Grid,
  GridItem
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
import { format } from 'date-fns'

export default function ColumnsTable(props: TableProps): JSX.Element {
  const { columnsData, tableData, cardTitle, selectID, getBIDList } = props

  const initialFocusRef = React.useRef()
  const columns = useMemo(() => columnsData, [columnsData])
  const data = useMemo(() => tableData, [tableData])
  const [actionType, setActionType] = useState(true)
  const [selectData, setSelectData] = useState({})
  const [modalFlag, setModalFlag] = useState(false)
  const [selectDate, setSelectDate] = useState('')

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

  useEffect(() => {
    console.log(format(new Date(), 'yyyy-MM-dd'), data)
    setSelectDate(format(new Date(), 'yyyy-MM-dd'))
  }, [])

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
    getBIDList()
  }

  return (
    <Card
      flexDirection='column'
      w='100%'
      px='0px'
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Grid
        templateColumns='repeat(5, 1fr)'
        gap={4}
        alignItems='center'
      >
        <GridItem colSpan={3}>
          <Flex justifyContent={'start'} fontSize={28} pl={5}>
            {
              <Flex alignItems={'baseline'}>
                <Flex ml={5} fontSize={32} color={'red.600'}>{cardTitle}</Flex>
                's BID list
              </Flex>
            }
          </Flex>
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date-local"
            maxW={150}
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Button mr={'2rem'} onClick={AddBID} leftIcon={<AddIcon />} colorScheme={'red'} size={'sm'} borderRadius={5}>BID</Button>
        </GridItem>
      </Grid>
      {/* <Flex px='25px' justify='space-between' align='center' mt={'1rem'}>
        <Flex justifyContent={'space-evenly'} fontSize={28} alignItems={'baseline'}>
          {
            <Flex alignItems={'baseline'}>
              <Flex ml={5} fontSize={32} color={'red.600'}>{cardTitle}</Flex>
              's BID list
            </Flex>
          }
        </Flex>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date-local"
          maxW={150}
          value={selectDate}
          onChange={(e) => setSelectDate(e.target.value)}
        />
        <Button mr={'2rem'} onClick={AddBID} leftIcon={<AddIcon />} colorScheme={'red'} size={'sm'} borderRadius={5}>BID</Button>
      </Flex> */}
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
                  <Tr {...row.getRowProps()} key={index} cursor={'pointer'}>
                    {row.cells.map((cell, index) => {
                      let data
                      if (cell.column.Header === 'Client') {
                        data = (
                          <Flex align='center' cursor={'pointer'} onClick={() => EditBID(row.original)} >
                            <Text
                              me='10px'
                              color={textColor}
                              fontSize='sm'
                              fontWeight='700'
                              minW={'max-content'}
                            >
                              {cell.value}
                            </Text>
                          </Flex>
                        )
                      } else if (cell.column.Header === 'Country') {
                        data = (
                          <Flex align='center' cursor={'pointer'} onClick={() => EditBID(row.original)} >
                            <Text color={textColor} fontSize='sm' fontWeight='700' minW={'max-content'}>
                              {cell.value}
                            </Text>
                          </Flex>
                        )
                      } else if (cell.column.Header === 'JoinDate') {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700' onClick={() => EditBID(row.original)} >
                            {moment(cell.value).format('MM/DD/YYYY')}
                          </Text>
                        )
                      } else if (cell.column.Header === 'BidDate') {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700' onClick={() => EditBID(row.original)} >
                            {moment(cell.value).format('MM/DD/YYYY')}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Proposals') {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700' onClick={() => EditBID(row.original)} >
                            {cell.value}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Verified') {
                        data = (
                          <Text color={cell.value ? alarmColor : textColor} fontSize='sm' fontWeight='700' onClick={() => EditBID(row.original)} >
                            {cell.value ? <CheckIcon /> : ''}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Message') {
                        data = (
                          <Text color={cell.value ? alarmColor : textColor} fontSize='sm' fontWeight='700' onClick={() => EditBID(row.original)} >
                            {cell.value ? <CheckIcon /> : ''}
                          </Text>
                        )
                      } else if (cell.column.Header === 'Hired') {
                        data = (
                          <Text color={cell.value ? alarmColor : textColor} fontSize='sm' fontWeight='700' onClick={() => EditBID(row.original)} >
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
                                        Are you sure delete BID?
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
        getBIDList={getBIDList}
        closeModal={CloseModal}
      />
    </Card>
  )
}
