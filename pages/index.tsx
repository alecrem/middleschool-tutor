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
  ListItem
} from '@chakra-ui/react'
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons'

const Home: NextPage = (props) => {
  const [searchBox, setSearchBox] = useState('')
  const [cardIsLegal, setCardIsLegal] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleChange = (event: any) => {
    const { value } = event.target
    const newSearchBox = value.trim().toLowerCase()
    setSearchBox(newSearchBox)
    if (typeof newSearchBox == 'string') setCardIsLegal(isLegal(newSearchBox))
    setSuggestions(suggestCards(newSearchBox))
  }

  const isLegal = (newSearchBox: string) => {
    if (inObject(newSearchBox, legalCards.name)) return true
    return inObject(newSearchBox, legalCards.name_ja)
  }

  const inObject = (needleTerm: string, hayObject: any) => {
    const keys = Object.keys(hayObject)
    for (let i = 0; i < keys.length; i++) {
      const key: any = keys[i]
      let cardWeAreChecking = hayObject[key]
      if (cardWeAreChecking === null) {
        continue
      }
      if (needleTerm == cardWeAreChecking.toLowerCase()) {
        return true
      }
    }
    return false
  }

  const findOccurrences = (
    needleTerm: string,
    hayObject: any,
    limit: number = 20
  ) => {
    let occurrences: string[] = []
    const keys = Object.keys(hayObject)
    for (let i = 0; i < keys.length; i++) {
      const key: any = keys[i]
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

  const suggestCards = (searchTerm: string, limit: number = 20) => {
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
    <Box>
      <Container maxW="container.sm" mt="4em">
        <Heading as="h1" size="4xl">
          Middle School Deck Check
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
              <CheckCircleIcon color="green.500" />
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
                {e}
              </ListItem>
            )
          })}
        </List>
      </Container>
    </Box>
  )
}

type cardsProps = {
  legalCards: LegalCards
}
type LegalCards = {
  oracle_id: any[]
  name: any[]
  name_ja: any[]
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
