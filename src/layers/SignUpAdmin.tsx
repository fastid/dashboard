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
import {SignUpAdmin as ApiSignUpAdmin} from "../api/Admin";

interface ILoginForm {
  email: string
  password: string
  confirm_password: string
  captcha?: string
}

export default function SignUpAdmin() {
  const {t} = useTranslation();

  const form = useForm<ILoginForm>()

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    form.clearErrors()

    // data.email?.toLowerCase()
    const password = data.password.trim()
    const confirm_password = data.confirm_password.trim()
    const email = data.email.trim()

    if (password !== confirm_password) {
      form.setError(
        'confirm_password',
        { type: 'custom', message: t('password_dont_match_confirmation_password')}
      )
      return
    }

    ApiSignUpAdmin({email: email, password: password}).then(()=>{

    }).catch(()=> [

    ])

    console.log(data)

  }

  useEffect(() => {
    document.title = t('create_an_account')
    form.setFocus('email')
    // console.log(settings)

  }, [form, t])

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={3}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>{t('create_an_administrator')}</Heading>
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
                        {show ?  <ViewIcon /> : <ViewOffIcon />}
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
                      tabIndex={2}
                      {...form.register(
                        "confirm_password",
                        {required: t('confirm_password_required')},
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
                    _hover={{bg: 'brand.500'}}
                  >{t('sign_up')}</Button>

                </Stack>

              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Stack>
    </Flex>
  )
}
