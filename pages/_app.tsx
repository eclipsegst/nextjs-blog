import '../styles/global.css'
import { AppProps } from 'next/app'
import Head from 'next/head';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />

          <meta name="theme-color" content="#da936a" />
        </Head>
      <Component {...pageProps} />
    </>
  )
}
