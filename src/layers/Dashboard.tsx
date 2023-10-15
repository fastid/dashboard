import {Box, Flex} from '@chakra-ui/react'
import React from "react";
import {CommonMenu, NavigationMenuUpper} from "../components/Navigation";
import {CheckAuth} from "../components/CheckAuth";


const Dashboard = () => {

  return (
    <>
      <CheckAuth />
      <Flex borderBottom={'1px'} borderBottomColor={'gray.200'}>
        <NavigationMenuUpper/>
      </Flex>

      <Flex w={'100%'}>
        <CommonMenu/>
        <Box p={5} w={'100%'}>ddd</Box>

      </Flex>
    </>
  )
}

export default Dashboard
