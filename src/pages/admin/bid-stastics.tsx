import React, { useEffect, useState } from 'react'

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
  useFocusEffect
} from '@chakra-ui/react'

// Custom components
import TeamMemmbers from 'views/admin/bidStastics/components/TeamMembers'
import Card from 'components/card/Card'
import tableDataTeamMembers from 'views/admin/bidStastics/variables/tableDataTeamMembers.json'
import { tableColumnsTeamMembers } from 'views/admin/bidStastics/variables/tableColumnsTeamMembers'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import ColumnsTableBID from 'views/admin/bidStastics/components/ColumnsTable-bid'
import {
  columnsDataBID,
} from 'views/admin/bidStastics/variables/columnsData'
import tableDataBID from 'views/admin/bidStastics/variables/tableDataBID.json'
import MiniCalendar from 'components/calendar/MiniCalendar'
import { isEmpty } from '@chakra-ui/utils'
import axios from 'axios'
import { backendURL } from 'utils/constants'
export default function NftMarketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorBrand = useColorModeValue('brand.500', 'white')
  const [cardTitle, setCardTitle] = useState('Today')
  const [selectUser, setSelectUser] = useState('')
  const [selectUserID, setSelectUserID] = useState('')
  const [userList, setUserList] = useState([])
  const [bidList, setBidList] = useState([])
  useEffect(() => {
    axios.get(backendURL + '/user')
      .then(res => setUserList(res.data))
  }, [])

  useEffect(() => {
    if (!isEmpty(selectUserID)) {
      axios.get(`${backendURL}/bid/getAll?id=${selectUserID}`)
        .then(res => {
          if (!isEmpty(res.data)) {
            setBidList(res.data)
          } else {
            setBidList([])
          }
        })
        .catch(err => console.log(err))
    }
  }, [selectUserID])

  return (
    <AdminLayout>
      <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
        {/* Main Fields */}
        <Grid
          mb='20px'
          gridTemplateColumns={{ md: 'repeat(4, 1fr)' }}
          gap={{ base: '20px', md: '20px' }}
          display={{ base: 'block', md: 'grid' }}
        >
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 1 / 4 / 2' }}
          >
            <SimpleGrid columns={{ base: 2, md: 2, xl: 1 }} mb='20px' display={'contents'}>
              <MiniCalendar h='100%' minW='100%' selectRange={false} mb='20px'/>
              <Card>
                <TeamMemmbers
                  tableData={(userList as unknown) as TableData[]}
                  columnsData={tableColumnsTeamMembers}
                  cardTitle={'Team members'}
                  setFilter={setSelectUser}
                  setID={setSelectUserID}
                />
              </Card>
            </SimpleGrid>
          </Flex>
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 2 / 4 / 5' }}
          >
            {!isEmpty(selectUser) && isEmpty(bidList) && <Flex mt={50} justifyContent={'center'} fontSize={28} alignItems={'baseline'}>
              There are not
              <Flex ml={5} mr={5} fontSize={32} color={'red.600'}>{selectUser}</Flex>
              's BID list
            </Flex>}
            {!isEmpty(selectUser) && !isEmpty(bidList) && <ColumnsTableBID columnsData={columnsDataBID} tableData={(bidList as unknown) as TableData[]} cardTitle={`${selectUser}'s BID Table`} />}
          </Flex>
        </Grid>
        {/* Delete Product */}
      </Box>
    </AdminLayout>
  )
}
