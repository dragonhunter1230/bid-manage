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
  Link
} from '@chakra-ui/react'

// Custom components
import TeamMemmbers from 'views/admin/bidStastics/components/TeamMembers'
import Card from 'components/card/Card'
import tableDataTeamMembers from 'views/admin/bidStastics/variables/tableDataTeamMembers.json'
import { tableColumnsTeamMembers } from 'views/admin/bidStastics/variables/tableColumnsTeamMembers'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import ChatList from 'views/admin/chatHistory/components/ChatList'
import {
  columnsDataBID,
} from 'views/admin/bidStastics/variables/columnsData'
import tableDataBID from 'views/admin/bidStastics/variables/tableDataBID.json'
import MiniCalendar from 'components/calendar/MiniCalendar'
import { isEmpty } from '@chakra-ui/utils'
export default function NftMarketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorBrand = useColorModeValue('brand.500', 'white')
  const [selectUser, setSelectUser] = useState('')
  const [beforeUser, setBeforeUser] = useState('')
  const [selectClient, setSelectClient] = useState('')
  const [cardTitle, setCardTitle] = useState('')

  useEffect(()=>{
    if(!isEmpty(selectUser)){
      setCardTitle(`${selectUser}'s Chat History`);
    }
  }, [selectUser, selectClient])
  return (
    <AdminLayout>
      <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
        {/* Main Fields */}
        <Grid
          mb='20px'
          gridTemplateColumns={{ xl: 'repeat(4, 1fr)' }}
          gap={{ base: '20px', xl: '20px' }}
          display={{ base: 'block', xl: 'grid' }}
        >
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 1 / 4 / 2' }}
          >
            <Card mb='20px'>
              <TeamMemmbers
                tableData={(tableDataTeamMembers as unknown) as TableData[]}
                columnsData={tableColumnsTeamMembers}
                cardTitle={'Team Members'}
                setFilter={setSelectUser}
              />
            </Card>
            {/* {
              !isEmpty(selectUser) ?
                <Card>
                  <TeamMemmbers
                    tableData={(tableDataTeamMembers as unknown) as TableData[]}
                    columnsData={tableColumnsTeamMembers}
                    cardTitle={`${selectUser}'s Client`}
                    setFilter={setSelectClient}
                  />
                </Card>
                :
                null
            } */}
          </Flex>
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 2 / 4 / 5' }}
          >
            {
              !isEmpty(selectUser) ? <ChatList
                columnsData={columnsDataBID}
                tableData={(tableDataBID as unknown) as TableData[]}
                cardTitle={cardTitle}
              />
                :
                null
            }

          </Flex>
        </Grid>
        {/* Delete Product */}
      </Box>
    </AdminLayout>
  )
}
