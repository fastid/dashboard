import {Button, Card, CardBody, CardHeader, Flex, FormControl, Heading, Select, Stack, Text} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {CommonMenu, NavigationMenuUpper} from "../components/Navigation";
import {useTranslation} from "react-i18next";
import {API, InterfacesAPI} from "../api/API";
import {AxiosError} from "axios";
import {useRecoilState} from "recoil";
import {InfoState} from "../states/Info";
import {FormProvider, SubmitHandler, useForm,} from "react-hook-form"
import {ErrorState, IError} from "../states/error";
import {ISuccess, SuccessState} from "../states/Success";

interface LanguageForm {
  locate: string
}

export const Language = () => {
  const {t, i18n} = useTranslation()
  const [, setError] = useRecoilState<IError>(ErrorState);

  const [info, setInfo] = useRecoilState<InterfacesAPI.Info>(InfoState)

  const [language, setLanguage] = useState<InterfacesAPI.Language>()
  const form = useForm<LanguageForm>()
  const [, setSuccess] = useRecoilState<ISuccess>(SuccessState);

  const [selected, setSelected] = useState('')
  const api = new API()

  useEffect(() => {
    setSelected(info.profile.locate)
  }, [info])

  useEffect(() => {
    document.title = t('change_language')
    // setSelected(info.profile.locate)

    api.Language().then(response => {
      setLanguage(response)
    }).catch((error: AxiosError) => {
      console.log(error)
    })
  }, [t])

  const onSubmit: SubmitHandler<LanguageForm> = (data) => {
    console.log('onSubmit')

    const regex = new RegExp('^[a-z]+', 'i')
    const found = data.locate.match(regex)
    if (found){

      api.LanguageSave({language: found[0], locate: data.locate}).then(response=>{
        setInfo({...info, profile: {...info.profile, locate: data.locate, language: found[0]}})
        setSuccess({title: t('language_success_changed')})
      }).catch((error: AxiosError) => {
        api.ErrorMessage(error, t, setError)
        console.log(error)
      })

      i18n.changeLanguage(found[0]).then(response=>response).catch(error=>error)
    }

  }

  return (
    <>
      <Flex borderBottom={'1px'} borderBottomColor={'gray.200'}>
        <NavigationMenuUpper/>
      </Flex>

      <Flex w={'100%'}>
        <CommonMenu/>

        <Flex p={5} w={'70%'} justifyContent={'space-around'}>
          <Card w={'500px'}>
            <CardHeader>
              <Heading size='md'>{t('change_language')}</Heading>
              <Text mt={5}>{t('change_language_description')}</Text>
            </CardHeader>
            <CardBody>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormControl>
                    <Select
                      size='lg'
                      value={selected}
                      {...form.register(
                        "locate",
                        {
                          value: selected,
                          required: t('email_required'),
                        }
                      )}
                      onChange={e => setSelected(e.target.value)}
                    >
                      {language && language.results.map((item, index) =>
                        <option key={index} value={item.value}>{item.name}</option>
                      )}
                    </Select>
                    <Stack spacing={10} pt={10}>
                      <Button
                        type={'submit'}
                        colorScheme={"brand"}
                        tabIndex={4}
                        _hover={{bg: 'brand.500'}}
                      >{t('save')}</Button>
                    </Stack>
                  </FormControl>
                </form>
              </FormProvider>
            </CardBody>
          </Card>


        </Flex>

      </Flex>
    </>
  )
}

