import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Middle School Tutor</title>
      </Head>{' '}
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
