import React from 'react'

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
import ColumnsTableBID from 'views/admin/bidStastics/components/ColumnsTable-bid'
import {
  columnsDataBID,
} from 'views/admin/bidStastics/variables/columnsData'
import tableDataBID from 'views/admin/bidStastics/variables/tableDataBID.json'
import MiniCalendar from 'components/calendar/MiniCalendar'
export default function NftMarketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorBrand = useColorModeValue('brand.500', 'white')
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
            <MiniCalendar h='100%' minW='100%' selectRange={false} />
            <Card mt='20px' mb='20px'>
              <TeamMemmbers
                tableData={(tableDataTeamMembers as unknown) as TableData[]}
                columnsData={tableColumnsTeamMembers}
                cardTitle={'Team members'}
              />
            </Card>
          </Flex>
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 2 / 4 / 5' }}
          >
            <ColumnsTableBID
              columnsData={columnsDataBID}
              tableData={(tableDataBID as unknown) as TableData[]}
              cardTitle={`Today's BID Table`}
            />
          </Flex>
        </Grid>
        {/* Delete Product */}
      </Box>
    </AdminLayout>
  )
}
