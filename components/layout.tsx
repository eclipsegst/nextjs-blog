import Image from 'next/image'
import styles from './layout.module.css'
import Header from './NavBar'
import Footer from './Footer'
import styled from 'styled-components'

import { DEFAULT_MAX_VERSION } from 'tls'

export const siteTitle = 'Next.js Sample Website'

const Wrapper = styled.section`
  padding: 0em;
  background: papayawhip;
  /* height: 100%; */
  min-height: calc(100vh - 60px);
`;

const ContentWrapper = styled.main`
  /* background: #deeefb; */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
          <Header/>
          
          <ContentWrapper>{children}</ContentWrapper>

        </div>
      </Wrapper>
      <div className='absolute bottom-0rem'>
        <Footer/>
      </div>
    </div>
  )
}
