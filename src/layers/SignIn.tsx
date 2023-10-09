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
import {ISettings, ISettingsCaptcha} from "../api/settings";
import {useTranslation} from 'react-i18next';
import {FormProvider, SubmitHandler, useForm,} from "react-hook-form"
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import {ReCaptcha} from "../components/Captcha";
import {SettingsState} from "../states/settings";
import {ErrorState, IError} from "../states/error";
import {Authentication} from "../api/authentication";
import {AxiosError} from "axios";
import {IValidationError} from "../api/client";
import {Link as RouterLink} from "react-router-dom";

interface ILoginForm {
  email: string
  password: string
  captcha?: string
}

export default function SignIn() {
  const {t} = useTranslation();
  const [settings] = useRecoilState<ISettings>(SettingsState)

  const form = useForm<ILoginForm>()

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [, setError] = useRecoilState<IError>(ErrorState);

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    // form.setError('email', { type: 'custom', message: 'Ошибка валидации' })
    Authentication({
      email: data.email,
      password: data.password,
      captcha: data.captcha,
    }).then((response) => {
      setError({title: 'Not implemented'})
      console.log(response)
    }).catch((err: Error | AxiosError<IValidationError>)=>{

      // if (isAxiosError(err) && err.response) {
      //   console.log(err)
      //
      //   if (err.response && err.response.data.error) {
      //     setError({title: t(err.response.data.error.key, err.response.data.error.params)})
      //   }
      //   else {
      //     // setError({title: t(err.message, err.message)})
      //   }
      // } else if (isAxiosError(err) && err.request) {
      //   console.log(err)
      // } else {
      //   console.log(err)
      // }
      console.log(err)
      setError({title: 'Not implemented'})

    })

  }

  useEffect(() => {
    document.title = t('sign_in')
    form.setFocus('email')
  }, [form, t])

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
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
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>

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
                  <Text fontSize='xs' color={'red.500'}>{form.formState.errors.email.message}</Text>}
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
                      {show ?  <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {form.formState.errors.password &&
                  <Text fontSize='xs' color={'red.500'}>{form.formState.errors.password.message}</Text>}
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{base: 'column', sm: 'row'}}
                  align={'start'}
                  justify={'space-between'}>
                  <Text color={'blue.400'}>{t('forgot_password')}</Text>
                </Stack>

                {settings.captcha === ISettingsCaptcha.recaptcha &&
                  settings.recaptcha_site_key &&
                  settings.captcha_usage.includes('signin') &&
                  <ReCaptcha siteKey={settings.recaptcha_site_key} tabIndex={3}/>
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

