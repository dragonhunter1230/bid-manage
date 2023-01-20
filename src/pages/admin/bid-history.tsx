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
  useFocusEffect,
  FormControl,
  GridItem
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
import { AddIcon } from '@chakra-ui/icons'
import { headers } from '../../../next.config'
export default function NftMarketplace() {
  // Chakra Color Mode

  const [selectUser, setSelectUser] = useState('')
  const [selectUserID, setSelectUserID] = useState('')
  const [userList, setUserList] = useState([])
  const [bidList, setBidList] = useState([])

  useEffect(() => {
    axios.get(backendURL + '/user')
      .then(res => {
        setUserList(res.data.data)
      })
      .catch(err => { console.log("2342343:", err); })
  }, [])

  const getBIDList = () => {
    axios.get(`${backendURL}/bid/${selectUserID}`)
      .then(res => {
        if (res.data.data) {
          setBidList(res.data.data)
        } else {
          setBidList([])
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!isEmpty(selectUserID)) {
      getBIDList()
    }
  }, [selectUserID])

  return (
    <AdminLayout>
      <Box pt={{ base: '180px', md: '80px', xl: '80px' }} minH={'93vh'}>
        <Grid
          templateAreas={`"nav main"`}
          gridTemplateRows={'50px 1fr 30px'}
          gridTemplateColumns={'340px 1fr'}
          h='200px'
          gap='1'
          color='blackAlpha.700'
          fontWeight='bold'
        >
          <GridItem area={'nav'}>
            <Card>
              <TeamMemmbers
                tableData={(userList as unknown) as TableData[]}
                columnsData={tableColumnsTeamMembers}
                cardTitle={'Team members'}
                setFilter={setSelectUser}
                setID={setSelectUserID}
                selectID={selectUserID}
              />
            </Card>
          </GridItem>
          <GridItem ml={6} area={'main'}>
            {!isEmpty(selectUser) && <ColumnsTableBID columnsData={columnsDataBID} tableData={(bidList as unknown) as TableData[]} cardTitle={selectUser} selectID={selectUserID} getBIDList={getBIDList} />}
          </GridItem>
        </Grid>
      </Box>
    </AdminLayout>
  )
}
