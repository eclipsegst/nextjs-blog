import '../styles/global.css'
import { AppProps } from 'next/app'
import Head from 'next/head';
import React from 'react';

import { SessionProvider } from "next-auth/react"

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
      <SessionProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        session={pageProps.session}
      >
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
