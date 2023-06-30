import { FC } from 'react'
import {
  Box,
  Container,
  Heading,
  Link,
  Button,
  Flex,
  Spacer,
  Icon,
  Image
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'
import useTranslation from 'next-translate/useTranslation'

const Header: FC = () => {
  const { t } = useTranslation('common')

  return (
    <Container maxW="container.lg" mt="2em">
      <Box mb={4}>
        <Flex>
          <Box mr="1em">
            <Image
              src="/favicon.ico"
              alt="Middle School Tutor logo"
              width="3em"
            />
          </Box>
          <Box p={4}>
            <Heading size="sm" color="blue.500">
              {t('site-title')}
            </Heading>
          </Box>
          <Box p={2}>
            <NextLink href="/">
              <Button variant="ghost" size="sm">
                {t('nav.search')}
              </Button>
            </NextLink>
            <NextLink href="/deckcheck">
              <Button variant="ghost" size="sm">
                {t('nav.list')}
              </Button>
            </NextLink>
          </Box>
          <Spacer />
          <Box p={2}>
            <Link href="https://github.com/alecrem/middleschool-tutor/" p={4}>
              <Icon as={AiFillGithub} w={8} h={8} />
            </Link>
            <Link href="https://twitter.com/KarawapoM" p={4}>
              <Icon as={AiFillTwitterCircle} w={8} h={8} />
            </Link>
          </Box>
        </Flex>
        <Flex>
          <Box p={2}>
            <Link href="/">
              {/* <Heading size="md">Card Search</Heading> */}
            </Link>
          </Box>
        </Flex>
      </Box>
    </Container>
  )
}

export { Header }
