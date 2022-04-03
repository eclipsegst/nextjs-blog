import Head from 'next/head'
import Image from 'next/image'
// import styles from './layout.module.css'
import styles from "../styles/Layout.module.css";
import styles2 from "../styles/Home.module.css";
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Header from './NavBar'
import Footer from './Footer'
import styled from 'styled-components'

import { DEFAULT_MAX_VERSION } from 'tls'

const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

const Wrapper = styled.section`
  padding: 0em;
  background: papayawhip;
  /* height: 100%; */
  min-height: calc(100vh - 100px);
`;

const ContentWrapper = styled.main`
  background: #deeefb;
  /* display: flex; */
`

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div>
      <Wrapper>
        <div className={styles.container}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="description"
              content="Learn how to build a personal website using Next.js"
            />
            <meta
              property="og:image"
              content={`https://og-image.vercel.app/${encodeURI(
                siteTitle
              )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>

          <Header/>
          
          <ContentWrapper>{children}</ContentWrapper>
          
          {!home && (
            <div className={styles.backToHome}>
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </div>
          )}

        </div>
      </Wrapper>
      <div className='absolute bottom-0rem'>
        <Footer/>
      </div>
    </div>
  )
}
