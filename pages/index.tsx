import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Container, Heading, Text, Link } from '@chakra-ui/react'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Search } from '@/components/Search'
import type { CardsProps, LegalCards } from '@/utils/dataTypes'

const Home: NextPage = (props) => {
  const legalCards = (props as CardsProps).legalCards
  const { t } = useTranslation('common')

  return (
    <>
      <NavBar />
      <Container maxW="2xl" mt="2em">
        <Heading as="h1" size="5xl">
          {t('search.title')}
        </Heading>
        <Text mt="1em">
          {t('search.desc1')}{' '}
          <Link href="https://www.eternalcentral.com/middleschoolrules/">
            {t('search.desc2')}
          </Link>{' '}
          {t('search.desc3')}
        </Text>
        <Search legalcards={legalCards} />
      </Container>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    // For offline builds, on the `middleschool-cardlist` repo directory:
    // python3 -m http.server
    // 'http://127.0.0.1:8000/static/middleschool_with_banned.json'
    'https://alecrem-middleschool.hf.space/app/static/middleschool_with_banned.json'
  )
  const legalCards: LegalCards = await res.json()

  return {
    props: {
      legalCards
    }
  }
}

export default Home
