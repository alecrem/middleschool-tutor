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
  List,
  ListItem,
  Link,
  Flex,
  Spacer,
  Icon,
  Image
} from '@chakra-ui/react'
import {
  CheckCircleIcon,
  NotAllowedIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons'
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'

const Home: NextPage = (props) => {
  const [searchBox, setSearchBox] = useState('')
  const [exactMatch, setExactMatch] = useState('')
  const [cardIsLegal, setCardIsLegal] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExactMatch('')
    const { value } = event.target
    const newSearchBox = value.trim().toLowerCase()
    setSearchBox(newSearchBox)
    if (newSearchBox.length < 1) {
      setSuggestions([])
      return
    }
    if (typeof newSearchBox == 'string') setCardIsLegal(isLegal(newSearchBox))
    setSuggestions(suggestCards(newSearchBox))
  }

  const isLegal = (newSearchBox: string) => {
    const englishMatch = inObject(newSearchBox, legalCards.name)
    if (englishMatch.length > 0) {
      setExactMatch(englishMatch)
      return true
    }
    const japaneseMatch = inObject(newSearchBox, legalCards.name_ja)
    if (japaneseMatch.length > 0) {
      setExactMatch(japaneseMatch)
      return true
    }
    return false
  }

  const inObject = (needleTerm: string, hayObject: listAsProps) => {
    const keys = Object.keys(hayObject)
    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i]
      let cardWeAreChecking = hayObject[key]
      if (cardWeAreChecking === null) {
        continue
      }
      if (needleTerm == cardWeAreChecking.toLowerCase()) {
        return cardWeAreChecking
      }
    }
    return ''
  }

  const findOccurrences = (
    needleTerm: string,
    hayObject: listAsProps,
    limit: number = 40
  ) => {
    let occurrences: string[] = []
    const keys = Object.keys(hayObject)
    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i]
      let cardWeAreChecking = hayObject[key]
      if (cardWeAreChecking === null) {
        continue
      }
      if (cardWeAreChecking.toLowerCase().indexOf(needleTerm) != -1) {
        occurrences.push(cardWeAreChecking)
        if (occurrences.length >= limit) break
      }
    }
    return occurrences
  }

  const suggestCards = (searchTerm: string, limit: number = 40) => {
    let occurences = findOccurrences(searchTerm, legalCards.name, limit)
    if (occurences.length > 0) return occurences
    return findOccurrences(searchTerm, legalCards.name_ja, limit)
  }

  const legalCards = (props as cardsProps).legalCards
  const placeholderIndex = ~~(
    Math.random() * Object.keys(legalCards.name).length
  )
  const placeholder = legalCards.name[placeholderIndex]

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
      <Container maxW="container.sm" mt="2em">
        <Heading as="h1" size="2xl">
          Card Search
        </Heading>
        <Text mt="1em">Enter a card name in English or Japanese</Text>
        <InputGroup mt="2em">
          <Input
            name="searchBox"
            placeholder={placeholder}
            onChange={handleChange}
          />
          <InputRightElement>
            {cardIsLegal ? (
              <>
                <Link
                  href={
                    'https://scryfall.com/search?q=' +
                    encodeURIComponent('prefer:oldest !"' + exactMatch + '"')
                  }
                  isExternal
                >
                  <CheckCircleIcon color="green.500" />
                  <ExternalLinkIcon mx="2px" />
                </Link>
              </>
            ) : (
              <NotAllowedIcon color="red.500" />
            )}
          </InputRightElement>
        </InputGroup>
        <List spacing={3} mt="1em">
          {suggestions.map((e) => {
            return (
              <ListItem key={e}>
                <CheckCircleIcon color="green.500" /> &nbsp;
                <Link
                  href={
                    'https://scryfall.com/search?q=' +
                    encodeURIComponent('prefer:oldest !"' + e + '"')
                  }
                  isExternal
                >
                  {e} <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
            )
          })}
        </List>
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
