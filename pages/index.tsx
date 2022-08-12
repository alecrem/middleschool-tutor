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
  Text
} from '@chakra-ui/react'
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons'

const Home: NextPage = (props) => {
  const [cardName, setCardName] = useState('')
  const [cardIsLegal, setCardIsLegal] = useState(false)

  const handleChange = (event: any) => {
    const { value } = event.target
    const newCardName = value.trim()
    setCardName(newCardName)
    if (typeof newCardName == 'string') setCardIsLegal(isLegal(newCardName))
  }

  const isLegal = (newCardName: string) => {
    let keys = Object.keys(legalCards.name)
    let legal = false
    for (let i = 0; i < keys.length; i++) {
      const key: any = keys[i]
      let cardWeAreChecking = legalCards.name[key]
      if (newCardName == cardWeAreChecking) {
        legal = true
        console.log('Found', i, newCardName)
        break
      }
    }
    if (legal) {
      return true
    }
    keys = Object.keys(legalCards.name_ja)
    for (let i = 0; i < keys.length; i++) {
      const key: any = keys[i]
      let cardWeAreChecking = legalCards.name_ja[key]
      if (newCardName == cardWeAreChecking) {
        legal = true
        console.log('Found', i, newCardName)
        break
      }
    }
    return legal
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
        <Text>Enter card name in English or Japanese</Text>
        <InputGroup mt="2em">
          <Input
            name="cardName"
            placeholder={placeholder}
            onChange={handleChange}
          />
          <InputRightElement>
            {cardIsLegal ? <CheckCircleIcon /> : <NotAllowedIcon />}
          </InputRightElement>
        </InputGroup>
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
