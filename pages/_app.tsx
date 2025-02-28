import { Provider } from '@/components/ui/provider'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Head>
        <title>Middle School Tutor</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
