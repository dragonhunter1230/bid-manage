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
import { isEmpty } from '@chakra-ui/utils';
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
  const { tableData, cardTitle } = props

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
        <Box>
          {
            tableData.map((row, index)=>(
              <Flex></Flex>
            ))
          }
        </Box>
      </Flex>
    </>
  )
}

export default TopCreatorTable
