import { ReactNode } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Image,
  Heading,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <NextLink href={href}>
    <Button
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700')
      }}
    >
      {children}
    </Button>
  </NextLink>
)

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const { t, lang } = useTranslation('common')
  const links = [
    { text: t('nav.search'), url: '/' },
    { text: t('nav.list'), url: '/deckcheck' }
  ]

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box mr="1em">
              <Image
                src="/favicon.ico"
                alt="Middle School Tutor logo"
                width="3em"
              />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Heading size="sm" color="blue.500">
                {t('site-title')}
              </Heading>
              {links.map((link) => (
                <NavLink key={link.url} href={link.url}>
                  {link.text}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Box py={2} pr={2}>
              {lang !== 'en' && (
                <Button onClick={async () => await setLanguage('en')}>
                  English
                </Button>
              )}
              {lang !== 'ja' && (
                <Button onClick={async () => await setLanguage('ja')}>
                  日本語
                </Button>
              )}
            </Box>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {links.map((link) => (
                <NavLink key={link.url} href={link.url}>
                  {link.text}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export { NavBar }
