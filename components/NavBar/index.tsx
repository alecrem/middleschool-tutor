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
  Stack
} from '@chakra-ui/react'
import { LuMenu, LuX } from 'react-icons/lu'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'
import {
  ColorModeButton,
  useColorMode,
  useColorModeValue
} from '@/components/ui/color-mode'

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <NextLink href={href}>
    <Button size="sm" variant="subtle" px={2} py={1} rounded={'md'}>
      {children}
    </Button>
  </NextLink>
)

const NavBar = () => {
  const { open, onOpen, onClose } = useDisclosure()
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
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={open ? onClose : onOpen}
          >
            {open ? <LuX /> : <LuMenu />}
          </IconButton>
          <HStack gap={8} alignItems={'center'}>
            <Box mr="1em">
              <Image
                src="/favicon.ico"
                alt="Middle School Tutor logo"
                width="3em"
              />
            </Box>
            <HStack as={'nav'} gap={4} display={{ base: 'none', md: 'flex' }}>
              <Heading size="md" color="blue.500">
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
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={async () => await setLanguage('en')}
                >
                  English
                </Button>
              )}
              {lang !== 'ja' && (
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={async () => await setLanguage('ja')}
                >
                  日本語
                </Button>
              )}
            </Box>
            <ColorModeButton />
          </Flex>
        </Flex>

        {open ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} gap={4}>
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
