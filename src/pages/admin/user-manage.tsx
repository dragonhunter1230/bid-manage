import { Box, SimpleGrid } from '@chakra-ui/react'
import ColumnsTable from 'views/admin/memberManage/components/ColumnsTable'
import {
  columnsDataColumns,
} from 'views/admin//memberManage/variables/columnsData'
import tableDataColumns from 'views/admin/memberManage/variables/tableDataColumns.json'
import React from 'react'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'

export default function DataTables () {
  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid
          mb='20px'
          spacing={{ base: '20px', xl: '20px' }}
        >
          <ColumnsTable
            columnsData={columnsDataColumns}
            tableData={(tableDataColumns as unknown) as TableData[]}
          />
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
