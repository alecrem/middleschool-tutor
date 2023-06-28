import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Container, Heading, Text, Link } from '@chakra-ui/react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DeckCheck } from '@/components/DeckCheck'
import type { CardsProps, LegalCards } from '@/utils/dataTypes'

const DeckCheckPage: NextPage = (props) => {
  const legalCards = (props as CardsProps).legalCards

  return (
    <>
      <Header />
      <Container maxW="container.sm" mt="2em">
        <Heading as="h1" size="2xl">
          List Check
        </Heading>
        <Text mt="1em">
          Paste or type your list here to confirm that every card in it is{' '}
          <Link href="https://www.eternalcentral.com/middleschoolrules/">
            Middle School legal
          </Link>
          .
        </Text>
        <DeckCheck legalcards={legalCards} />
      </Container>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    // For offline builds, on the `middleschool-cardlist` repo directory:
    // python3 -m http.server
    // 'http://127.0.0.1:8000/output/middleschool.json'
    'https://alecrem.github.io/middleschool-cardlist/output/middleschool.json'
  )
  const legalCards: LegalCards = await res.json()

  return {
    props: {
      legalCards
    }
  }
}

export default DeckCheckPage
