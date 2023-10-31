import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import {FormProvider, SubmitHandler, useForm,} from "react-hook-form"
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import {API, InterfacesAPI} from "../api/API"
import {useRecoilState} from "recoil"
import {ErrorState, IError} from "../states/error"
import {ConfigState} from "../states/Config"
import {useNavigate} from "react-router-dom"
import axios, {AxiosError} from "axios";
import {ValidationErrors} from "../api/Client";


interface ILoginForm {
  email: string
  password: string
  confirm_password: string
  captcha?: string
}

export default function AdminSignUp() {
  const {t} = useTranslation();

  const form = useForm<ILoginForm>()

  const [show, setShow] = useState(false)
  const [, setError] = useRecoilState<IError>(ErrorState);
  const [config, setConfig] = useRecoilState<InterfacesAPI.Config>(ConfigState)
  const navigate = useNavigate();

  const handleClick = () => setShow(!show)

  const restApi = new API()

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    restApi.t = t
    restApi.setError = setError

    form.clearErrors()

    const password = data.password.trim()
    const confirm_password = data.confirm_password.trim()
    const email = data.email.trim()

    if (password !== confirm_password) {
      form.setError(
        'confirm_password',
        {type: 'custom', message: t('password_dont_match_confirmation_password')}
      )
      return
    }

    restApi.AdminSignUp({email: email, password: password}).then(response=>{

      const access_token = response.access_token
      const refresh_token = response.refresh_token
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      setConfig({...config})
      navigate('/')

    }).catch((error: AxiosError) => {

      if (axios.isAxiosError<ValidationErrors, Record<string, unknown>>(error)) {
        if (error.response?.data.errors && error.response?.data.errors.password) {
          const message = error.response?.data.errors.password.i18n.message
          const param = error.response?.data.errors.password.i18n.params
          form.setError('password',{type: 'custom', message: t(message, param)})
        }

        if (error.response?.data.errors && error.response?.data.errors.email) {
          const message = error.response?.data.errors.email.i18n.message
          const param = error.response?.data.errors.email.i18n.params
          form.setError('email',{type: 'custom', message: t(message, param)}
          )
        }
      } else if (error.request) {
        setError({title: error.message})
      }
    })
  }

  useEffect(() => {
    document.title = t('create_an_administrator')
    form.setFocus('email')
  }, [form, t, config, navigate])


  const styleBgColor1 = useColorModeValue('gray.50', 'gray.800')
  const styleBgColor2 = useColorModeValue('white', 'gray.800')


  return (
    <>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={styleBgColor1}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={3}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>{t('create_an_administrator')}</Heading>
        </Stack>
        <Box minW={'350px'} rounded={'lg'} bg={styleBgColor2} boxShadow={'lg'} p={8}>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Stack spacing={4}>

                {/*Field Email*/}
                <FormControl id="email">
                  <FormLabel>{t('email_address')}</FormLabel>
                  <Input
                    type="text"
                    autoComplete={'on'}
                    tabIndex={1}
                    data-testid='email'
                    {...form.register(
                      "email",
                      {
                        required: t('email_required'),
                        pattern: {
                          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: t('please_enter_valid_email'),
                        },
                      }
                    )}
                  />
                  {form.formState.errors.email &&
                    <Text fontSize='sm' color={'red.500'}>{form.formState.errors.email.message}</Text>}
                </FormControl>

                {/*Field Password*/}
                <FormControl id="password">
                  <FormLabel>{t('password')}</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      // pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      autoComplete={'on'}
                      tabIndex={2}
                      data-testid='password'
                      {...form.register(

                        "password",
                        {
                          required: t('password_required'),
                          maxLength: {
                            value: config.password_policy_max_length,
                            message: t('string_too_long', {max_length: config.password_policy_max_length}),
                          },
                          minLength: {
                            value: config.password_policy_min_length,
                            message: t('string_too_short', {min_length: config.password_policy_min_length}),
                          },
                        },
                      )}
                    />
                    <InputRightElement>
                      <Button tabIndex={-1} variant={'ghost'} onClick={handleClick}>
                        {show ? <ViewIcon/> : <ViewOffIcon/>}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {form.formState.errors.password &&
                    <Text fontSize='sm' color={'red.500'}>{form.formState.errors.password.message}</Text>}
                </FormControl>

                {/*Field Password*/}
                <FormControl id="confirm_password">
                  <FormLabel>{t('confirm_password')}</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      // pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      autoComplete={'on'}
                      tabIndex={3}
                      data-testid='confirm-password'
                      {...form.register(
                        "confirm_password",
                        {
                          required: t('confirm_password_required'),
                          maxLength: {
                            value: config.password_policy_max_length,
                            message: t('string_too_long', {max_length: config.password_policy_max_length}),
                          },
                          minLength: {
                            value: config.password_policy_min_length,
                            message: t('string_too_short', {min_length: config.password_policy_min_length}),
                          },
                        },
                      )}
                    />
                  </InputGroup>
                  {form.formState.errors.confirm_password &&
                    <Text fontSize='sm' color={'red.500'}>{form.formState.errors.confirm_password.message}</Text>}
                </FormControl>

                <Stack spacing={10} pt={10}>
                  <Button
                    type={'submit'}
                    colorScheme={"brand"}
                    tabIndex={4}
                    data-testid='button-sign-up'
                    _hover={{bg: 'brand.500'}}
                  >{t('sign_up')}</Button>
                </Stack>

              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Stack>
    </Flex>
    </>
  )
}
