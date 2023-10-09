import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Link as ChakraLink,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import {BsGithub, BsList, BsSun, BsSunFill} from "react-icons/bs";
import {MdLogout, MdOutlineLockOpen, MdOutlineVpnKey, MdPortrait, MdSettings} from "react-icons/md";
import React from "react";
import {useTranslation} from "react-i18next";
import {IconType} from "react-icons";
import {Link as ReactRouterLink} from 'react-router-dom'


const AvatarMenuList: { icon: JSX.Element, name: string }[] = [
  { "icon": <MdSettings size={16} />, "name": 'profile' },
  { "icon": <MdPortrait size={16} />, "name": 'avatar' },
  { "icon": <MdOutlineLockOpen size={16} />, "name": 'security' },
  { "icon": <MdOutlineVpnKey size={16} />, "name": 'change_password' },
];


const CommonMenuList: { icon: IconType, name: string, link: string }[] = [
  { "icon": MdSettings, "name": 'profile', link: '/signup' },
  { "icon": MdSettings, "name": 'change_password', link: '/signup' },
];


export const NavigationMenuUpper = () => {
  const {toggleColorMode} = useColorMode()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {t} = useTranslation();

  return (
    <>
      <Image title={'FastID'} ml={3} w={{base: '140px', 'sm': '100px', 'md': '100px', 'lg': '140px'}}
             src='/fastid-logo.svg' alt='Dan Abramov'/>

      <HStack flex={1}>
      </HStack>

      <HStack pl={3} h='80px' p={3}>

        <Link
          isExternal
          href='https://github.com/fastid/fastid'
          display={{base: "none", lg: 'block'}}
          mr={4}
        >
          <Icon
            aria-label='Github'
            color={useColorModeValue('gray.700', 'gray.400')}
            mt={2}
            w={7}
            h={7}
            as={BsGithub}
          />
        </Link>

        {/* Dark && Light */}
        <Icon
          aria-label="Theme"
          onClick={toggleColorMode}
          borderRadius="lg"
          w={7}
          h={7}
          mr={3}
          as={useColorModeValue(BsSunFill, BsSun)}
          title={'ddd'}
          cursor={'pointer'}
        />

        <AvatarMenu/>

        <Icon
          display={{base: "block", lg: 'none'}}
          aria-label='Menu'
          borderRadius="lg"
          w={7}
          h={7}
          mr={3}
          as={useColorModeValue(BsList, BsList)}
          cursor={'pointer'}
          onClick={onOpen}
        />

        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          size={'xs'}
        >
          <DrawerOverlay/>
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader>Меню</DrawerHeader>

            <DrawerBody>
              <List spacing={3}>
                {CommonMenuList.map((item) =>
                  <ListItem>
                    <Link
                      display="block"
                      _focus={{bg: "gray.100"}}
                      _hover={{
                        bg: "brand.200"
                      }}
                      // _activeLink={{ bg: "orange.500", color: "white" }}
                      w="full"
                      borderRadius="lg"
                    >
                      <ChakraLink as={ReactRouterLink} to={item.link}>
                      <Flex alignItems="center" p={2}>
                          <Icon as={item.icon} boxSize="5"/>
                          <Text ml={2}>{t(item.name)}</Text>
                      </Flex>
                      </ChakraLink>
                    </Link>
                  </ListItem>
                )}

              </List>
            </DrawerBody>

            <DrawerFooter>
              <Button colorScheme={'brand'} mr={3} onClick={onClose}>
                {t('close')}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

      </HStack>
    </>
  )

}


const AvatarMenu = () => {
  const {t} = useTranslation();

  return (
    <Menu arrowPadding={100} >
      <MenuButton
        display={{ base: "none", lg: 'block' }}
        as={Avatar}
        _hover={{ bg: useColorModeValue("gray.100", "gray.700")}}
        src='https://1.gravatar.com/avatar/7f43d4a59cc637502c9f903a9ee42a7d3185aa28d3e2d7e31b858f955a65c27b?size=128'
        size={'sm'}
        cursor={'pointer'}
        mr={4}
      />

      <MenuList>
        {AvatarMenuList.map(({icon, name}) =>
          <MenuItem icon={icon} >{t(name.toString())}</MenuItem>
        )}
        <MenuDivider />
        <MenuItem icon={<MdLogout size={16} />}>{t('logout')}</MenuItem>
      </MenuList>
    </Menu>
  )

}

export const CommonMenu = () => {
  const {t} = useTranslation();

  return (
    <>
      <Box p={3} w={350} display={{ base: "none", lg: 'block' }} >
        <List spacing={3} >

          {CommonMenuList.map((item) =>
            <ListItem>
              <Link
                display="block"
                _focus={{ bg: "gray.100" }}
                _hover={{
                  bg: "brand.200"
                }}
                w="full"
                borderRadius="lg"
              >
                <ChakraLink as={ReactRouterLink} to={item.link}>
                  <Flex alignItems="center" p={2}>
                    <Icon as={item.icon} />
                    <Text ml={2} >{t(item.name.toString())}</Text>
                  </Flex>
                </ChakraLink>
              </Link>
            </ListItem>
          )}

        </List>
      </Box>
    </>
  )
}
