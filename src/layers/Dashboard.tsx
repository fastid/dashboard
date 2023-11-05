import {Box, Button, Flex} from '@chakra-ui/react'
import React, {useEffect} from "react";
import {CommonMenu, NavigationMenuUpper} from "../components/Navigation";
import {useTranslation} from "react-i18next";
import {API} from "../api/API";
import {AxiosError} from "axios";


export const Dashboard = () => {
  const {t} = useTranslation();

    const GetConfig = () => {
      const api = new API()

      api.Info().then(response => {
        console.log(response)
      }).catch((error: AxiosError) => {
        console.log(error)
      })
    }

    useEffect(() => {
      document.title = t('dashboard')
    }, [t])

    return (
      <>
        <Flex borderBottom={'1px'} borderBottomColor={'gray.200'}>
          <NavigationMenuUpper/>
        </Flex>

        <Flex w={'100%'}>
          <CommonMenu/>
          <Box p={5} w={'100%'}>
            <Button onClick={GetConfig}>dddd</Button>
          </Box>

        </Flex>
      </>
    )
  }

