import {Box, Button, Flex} from '@chakra-ui/react'
import React, {useEffect} from "react";
import {CommonMenu, NavigationMenuUpper} from "../components/Navigation";
import {useTranslation} from "react-i18next";
import {useRecoilState} from "recoil";
import {API, InterfacesAPI} from "../api/API";
import {TokenState} from "../states/Token";
import {AxiosError} from "axios";


export const Dashboard = () => {
  const {t} = useTranslation();
  const [token] = useRecoilState<InterfacesAPI.Token>(TokenState)

    const GetConfig = () => {
      const api = new API()
      const access_token = localStorage.getItem('access_token')

      // if (access_token) {
      //   api.token = access_token
      //   console.log(`save api token ${access_token}`)
      // }

      api.UserInfo().then(response => {
        console.log(response)
      }).catch((error: AxiosError) => {
        console.log(error)
      })


      // const token = localStorage.getItem('access_token')
      //
      // const api = new API()
      // if(token) {
      //   console.log(token)
      //   api.token = token
      // }
      //
      // api.UserInfo().then(response=> {
      //   console.log(response)
      // }).catch((error: AxiosError) => {
      //   console.log(error)
      // })
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
            access_token - {token.access_token}<br/>
            refresh_token - {token.refresh_token}<br/>
            <Button onClick={GetConfig}>dddd</Button>
          </Box>

        </Flex>
      </>
    )
  }

