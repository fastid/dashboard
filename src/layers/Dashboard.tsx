import {Box, Button, Flex} from '@chakra-ui/react'
import React, {useEffect} from "react";
import {CommonMenu, NavigationMenuUpper} from "../components/Navigation";
import {useTranslation} from "react-i18next";
import {API, InterfacesAPI} from "../api/API";
import {AxiosError} from "axios";
import {useRecoilState} from "recoil";
import {InfoState} from "../states/Info";

export const Dashboard = () => {
  const {t} = useTranslation()
  const [info] = useRecoilState<InterfacesAPI.Info>(InfoState)

  let moment = require('moment-timezone');

    const GetConfig = () => {
      console.log(info.profile)

      // const api = new API()
      // api.Info().then(response => {
      //   console.log(response.profile)
      //
      //   // console.log(response.created_at)
      //   moment.locale('ru')
      //   moment.tz.setDefault('Europe/Moscow');
      //   console.log(moment(response.created_at).tz('Europe/Moscow').format('LLL'))
      //
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
            <Button onClick={GetConfig}>dddd</Button>
          </Box>

        </Flex>
      </>
    )
  }

