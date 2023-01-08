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
import Banner from 'views/admin/marketplace/components/Banner'
import TableTopCreators from 'views/admin/marketplace/components/TableTopCreators'
import HistoryItem from 'views/admin/marketplace/components/HistoryItem'
import NFT from 'components/card/NFT'
import Card from 'components/card/Card'

// Assets
import Nft1 from 'img/nfts/Nft1.png'
import Nft2 from 'img/nfts/Nft2.png'
import Nft3 from 'img/nfts/Nft3.png'
import Nft4 from 'img/nfts/Nft4.png'
import Nft5 from 'img/nfts/Nft5.png'
import Nft6 from 'img/nfts/Nft6.png'
import Avatar1 from 'img/avatars/avatar1.png'
import Avatar2 from 'img/avatars/avatar2.png'
import Avatar3 from 'img/avatars/avatar3.png'
import Avatar4 from 'img/avatars/avatar4.png'
import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators.json'
import { tableColumnsTopCreators } from 'views/admin/marketplace/variables/tableColumnsTopCreators'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import NextLink from 'next/link'

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
          gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
          gap={{ base: '20px', xl: '20px' }}
          display={{ base: 'block', xl: 'grid' }}
        >
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 3 / 1 / 4', '2xl': '1 / 1 / 2 / 2' }}
          >
            <Card px='0px' mb='20px'>
              <TableTopCreators
                tableData={(tableDataTopCreators as unknown) as TableData[]}
                columnsData={tableColumnsTopCreators}
              />
            </Card>
          </Flex>
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 2 / 2 / 3' }}
          >
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'start', md: 'center' }}
            >
              <Text
                color={textColor}
                fontSize='2xl'
                ms='24px'
                fontWeight='700'
              >
                Trending NFTs
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: '24px', md: '0px' }}
                mt={{ base: '20px', md: '0px' }}
              >
                <NextLink href='#art' passHref>
                  <Link
                    color={textColorBrand}
                    fontWeight='500'
                    me={{ base: '34px', md: '44px' }}
                  >
                    Art
                  </Link>
                </NextLink>
                <NextLink href='#music' passHref>
                  <Link
                    color={textColorBrand}
                    fontWeight='500'
                    me={{ base: '34px', md: '44px' }}
                  >
                    Music
                  </Link>
                </NextLink>
                <NextLink href='#collectibles' passHref>
                  <Link
                    color={textColorBrand}
                    fontWeight='500'
                    me={{ base: '34px', md: '44px' }}
                  >
                    Collectibles
                  </Link>
                </NextLink>
                <NextLink href='#sports' passHref>
                  <Link color={textColorBrand} fontWeight='500'>
                    Sports
                  </Link>
                </NextLink>
              </Flex>
            </Flex>
          </Flex>
        </Grid>
        {/* Delete Product */}
      </Box>
    </AdminLayout>
  )
}
