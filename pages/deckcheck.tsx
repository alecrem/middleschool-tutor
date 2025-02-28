import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Container, Heading, Text, Link } from '@chakra-ui/react'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { DeckCheck } from '@/components/DeckCheck'
import type { CardsProps, LegalCards } from '@/utils/dataTypes'

const DeckCheckPage: NextPage = (props) => {
  const legalCards = (props as CardsProps).legalCards
  const { t } = useTranslation('common')

  return (
    <>
      <NavBar />
      <Container maxW="2xl" mt="2em">
        <Heading as="h1" size="5xl">
          {t('deckcheck.title')}
        </Heading>
        <Text mt="1em">
          {t('deckcheck.desc1')}
          <Link href="https://www.eternalcentral.com/middleschoolrules/">
            {t('deckcheck.desc2')}
          </Link>
          {t('deckcheck.desc3')}
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
    'https://alecrem-middleschool.hf.space/app/static/middleschool.json'
  )
  const legalCards: LegalCards = await res.json()

  return {
    props: {
      legalCards
    }
  }
}

export default DeckCheckPage
