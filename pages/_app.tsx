import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { theme } from '../components/layouts/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Middle School Tutor</title>
      </Head>{' '}
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
