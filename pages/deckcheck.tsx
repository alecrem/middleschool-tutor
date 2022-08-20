import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  Flex,
  Spacer,
  Icon,
  Image
} from '@chakra-ui/react'
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'

const Home: NextPage = (props) => {
  const [url, setUrl] = useState('')
  const [exactMatch, setExactMatch] = useState('')
  const [urlIsSupported, setUrlIsSupported] = useState(false)
  const [actualDeckUri, setActualDeckUri] = useState('')
  const [urlError, setUrlError] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExactMatch('')
    setUrlError('')
    const { value } = event.target
    const newUrl = value.trim()
    setUrl(newUrl)
    if (newUrl.length < 1) {
      return
    }
    if (typeof newUrl == 'string')
      setUrlIsSupported(getServiceFromUrl(newUrl) != 'unsupported')
  }

  const getServiceFromUrl = (newUrl: string): string => {
    setActualDeckUri('')
    let service = 'unsupported'
    const hasHttp =
      newUrl.indexOf('http://') != -1 || newUrl.indexOf('https://') != -1
    if (!hasHttp) {
      setUrlError('The URL needs to start with "http://" or "https://".')
      return 'unsupported'
    }
    if (
      newUrl.indexOf('/decks/') != -1 &&
      newUrl.indexOf('scryfall.com/') != -1
    ) {
      service = 'scryfall'
      setActualDeckUri(getActualDeckUri(newUrl, service))
    }
    return service
  }

  const getActualDeckUri = (deckPageUrl: string, service: string): string => {
    // https://scryfall.com/@karawapo/decks/9cd7f631-10ab-4c68-8a9a-63909ecb9e58
    // https://api.scryfall.com/decks/9cd7f631-10ab-4c68-8a9a-63909ecb9e58/export/text
    if ((service = 'scryfall')) {
      const pattern = /.*scryfall.com\/(.*)\/decks\/(.*)/
      const deckUri = deckPageUrl.replace(
        pattern,
        'https://api.scryfall.com/decks/$2/export/text'
      )
      return deckUri
    }
    return deckPageUrl
  }

  const legalCards = (props as cardsProps).legalCards

  return (
    <>
      <Container maxW="container.lg" mt="2em">
        <Box mb={4}>
          <Flex>
            <Box mr="1em">
              <Image
                src="favicon.ico"
                alt="Middle School Tutor logo"
                width="3em"
              />
            </Box>
            <Box>
              <Heading size="xl" color="blue.500">
                Middle School Tutor
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <Link href="https://github.com/alecrem/middleschool-tutor/" p={4}>
                <Icon as={AiFillGithub} w={8} h={8} />
              </Link>
              <Link href="https://twitter.com/KarawapoM" p={4}>
                <Icon as={AiFillTwitterCircle} w={8} h={8} />
              </Link>
            </Box>
          </Flex>
          <Flex>
            <Box pr="2em">
              <Link href="/">
                <Heading size="md">Card Search</Heading>
              </Link>
            </Box>
            <Box pr="2em">
              <Heading size="md">Deck Check</Heading>
            </Box>
          </Flex>
        </Box>
      </Container>
      <Container maxW="container.sm" mt="2em">
        <Heading as="h1" size="2xl">
          Deck Check
        </Heading>
        <Text mt="1em">Paste a deck list URL</Text>
        <InputGroup mt="2em">
          <Input
            name="url"
            placeholder="https://scryfall.com/@{username}/decks/{uuid}"
            onChange={handleChange}
          />
          <InputRightElement>
            {urlIsSupported ? (
              <CheckCircleIcon color="green.500" />
            ) : (
              <NotAllowedIcon color="red.500" />
            )}
          </InputRightElement>
        </InputGroup>
        {urlError && (
          <Text mt="1em">
            <NotAllowedIcon color="red.500" /> &nbsp;
            {urlError}
          </Text>
        )}
        {actualDeckUri && (
          <Text mt="1em">
            actualDeckUri:
            <br />
            {actualDeckUri}
          </Text>
        )}
      </Container>
    </>
  )
}

interface cardsProps {
  legalCards: LegalCards
}
interface LegalCards {
  oracle_id: listAsProps
  name: listAsProps
  name_ja: listAsProps
}
interface listAsProps {
  [x: string]: string
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    'https://alecrem.github.io/middleschool-cardlist/output/middleschool.json'
  )
  const legalCards: LegalCards = await res.json()

  return {
    props: {
      legalCards
    }
  }
}

export default Home
