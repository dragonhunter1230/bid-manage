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
  useColorModeValue
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
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
import { AddIcon, EditIcon } from '@chakra-ui/icons'
export default function ColumnsTable(props: TableProps) {
  const { columnsData, tableData, cardTitle } = props

  const columns = useMemo(() => columnsData, [columnsData])
  const data = useMemo(() => tableData, [tableData])

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
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'
        >
          {cardTitle}
        </Text>
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' display={'block'} overflow={'auto'} m='1rem' width={'auto'}>
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
                        <IconButton icon={<EditIcon />} colorScheme={'messenger'} size={'sm'} aria-label={''}/>
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
    </Card>
  )
}
