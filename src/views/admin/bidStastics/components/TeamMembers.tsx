import {
  Avatar,
  Box,
  Button,
  Flex,
  Progress,
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
import { TableProps } from 'views/admin/default/variables/columnsData'
const avatar = "https://scontent.fotp8-1.fna.fbcdn.net/v/t1.6435-9/202074221_101421322193072_8201469573182417214_n.png?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=78fLje1ri2sAX-9M9k1&_nc_ht=scontent.fotp8-1.fna&oh=00_AT-yCcI9whoAZcSaGmJQK53xRa1CldCaj2q5qJlPvDvHRA&oe=626E41FF";
function TopCreatorTable(props: TableProps) {
  const { columnsData, tableData, cardTitle, setFilter, setID } = props

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
  initialState.pageSize = 100

  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Flex
          align={{ sm: 'flex-start', lg: 'center' }}
          justify='space-between'
          w='100%'
          px='22px'
          pb='20px'
          mb='10px'
          boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'
        >
          <Text color={textColor} fontSize='xl' fontWeight='600'>
            {cardTitle}
          </Text>
          {/* <Button variant='action'>See all</Button> */}
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor='transparent'
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

          <Tbody display={'grid'} maxHeight={300} overflow={'auto'}>
            {page.map((row, index) => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data
                    if (cell.column.Header === 'Name') {
                      data = (
                        <Flex align='center'>
                          <Avatar
                            src={avatar}
                            w='30px'
                            h='30px'
                            me='8px'
                          />
                          <Text
                            color={textColor}
                            fontSize='sm'
                            fontWeight='600'
                            cursor={'pointer'}
                            onClick={(e) => {
                              setFilter(cell.value)
                              setID(cell.row.original.id)
                            }}
                          >
                            {cell.value}
                          </Text>
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
      </Flex>
    </>
  )
}

export default TopCreatorTable
