import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Pranav Waghanna - Portfolio</title>
      <link rel="icon" href="/favicon2.png" />
    </Head>
    <Component {...pageProps} />
    </>
  )
}
