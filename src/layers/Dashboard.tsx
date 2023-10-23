import {Box, Flex} from '@chakra-ui/react'
import React, {useEffect} from "react";
import {CommonMenu, NavigationMenuUpper} from "../components/Navigation";
import {CheckAuth} from "../components/CheckAuth";
import {useTranslation} from "react-i18next";


const Dashboard = () => {
  const {t} = useTranslation();

  useEffect(() => {
    document.title = t('dashboard')
  }, [t])

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
