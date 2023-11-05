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
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {API, InterfacesAPI} from "../api/API";
import {useTranslation} from 'react-i18next';
import {FormProvider, SubmitHandler, useForm,} from "react-hook-form"
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import {ReCaptcha} from "../components/Captcha";
import {ConfigState} from "../states/Config";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {ErrorState, IError} from "../states/error";
import {ValidationErrors} from "../api/Client";
import ReCAPTCHA from "react-google-recaptcha";
import {Loader} from "./Loader";

interface ILoginForm {
  email: string
  password: string
  captcha?: string
}

export const SignIn = () => {
  const {t} = useTranslation();
  const [config] = useRecoilState<InterfacesAPI.Config>(ConfigState)
  const navigate = useNavigate();

  const form = useForm<ILoginForm>()
  const [, setError] = useRecoilState<IError>(ErrorState);

  const [show, setShow] = useState(false)
  const [isLoader, setIsLoader] = useState(false)

  const handleClick = () => setShow(!show)

  const recaptchaRef = React.createRef<ReCAPTCHA>()

  // const [, setError] = useRecoilState<IError>(ErrorState);

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    const api = new API()

    form.clearErrors()
    recaptchaRef.current?.reset()
    setIsLoader(true)

    api.SignIn({
      email: data.email,
      password: data.password,
      captcha: data.captcha}
    ).then(response => {

      const access_token = response.access_token
      const refresh_token = response.refresh_token
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      navigate('/')

    }).catch((error: AxiosError) => {
      api.ErrorMessage(error, t, setError)

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
      }
    })
  }

  useEffect(() => {
    document.title = t('sign_in')
    form.setFocus('email')
  }, [form, t])

  const bgMode1 = useColorModeValue('gray.50', 'gray.800')
  const bgMode2 = useColorModeValue('white', 'gray.700')

  if(isLoader) {
      return <Loader/>
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={bgMode1}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={3}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>{t('sign_in_account')}</Heading>
          <Text color="fg.muted">
            {t('dont_have_account')}&nbsp;
            <Link
              color={"brand.500"}
              as={RouterLink}
              to={'/signup/'}
            >{t('sign_up')}</Link>
          </Text>

        </Stack>
        <Box minW={'350px'} rounded={'lg'} bg={bgMode2} boxShadow={'lg'} p={8}>

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
                      {...form.register(
                        "password",
                        {required: t('password_required')},
                      )}
                    />
                    <InputRightElement>
                      <Button variant={'ghost'} onClick={handleClick}>
                        {show ? <ViewIcon/> : <ViewOffIcon/>}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {form.formState.errors.password &&
                    <Text fontSize='sm' color={'red.500'}>{form.formState.errors.password.message}</Text>}
                </FormControl>

                <Stack spacing={10}>
                  <Stack
                    direction={{base: 'column', sm: 'row'}}
                    align={'start'}
                    justify={'space-between'}>
                    <Text color={'brand.400'}>{t('forgot_password')}</Text>
                  </Stack>

                  {config.captcha === InterfacesAPI.CaptchaType.recaptcha &&
                    config.recaptcha_site_key &&
                    config.captcha_usage.includes('signin') &&
                    <ReCaptcha siteKey={config.recaptcha_site_key} tabIndex={3} recaptchaRef={recaptchaRef}/>
                  }

                  <Button
                    type={'submit'}
                    colorScheme={"brand"}
                    tabIndex={4}
                  >{t('sign_in')}</Button>

                </Stack>

                {/*<Divider pb={10}/>*/}
                {/*<Text align={"center"}>{t('dont_have_account')}</Text>*/}
                {/*<Text align={"center"}>*/}
                {/*  <Link as={RouterLink} to={'/signup/'}>{t('sign_up')}</Link>*/}
                {/*</Text>*/}


              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Stack>
    </Flex>
  )
}

