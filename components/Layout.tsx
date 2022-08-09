import Navbar from './Navbar'
import Footer from './Footer'
import styled, { css } from 'styled-components';
import rem from '../utils/rem';
import { mobile } from '../utils/media';
import { sidebarWidth } from '../utils/sizes';
import { bodyFont, headerFont } from '../utils/fonts';
import { blmMetal, paleGrey } from '../utils/colors';

// Whole page container
const Container = styled.div`
  padding: 0em;
  background-color: ${paleGrey};
  min-height: calc(100vh + 60px); // Footer will be not visible on loading.
  // min-height: 100vh;

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

// Page content
const ContentWrapper = styled.div`
  // background: #deeefb;
  margin: 0;
  padding: ${rem(60)} ${rem(60)} 0 ${rem(60)};
  box-sizing: border-box;
  font-family: ${bodyFont};
  transition: transform 150ms ease-out;

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  p,
  li {
    max-width: 80ch;
  }

  ${mobile(css`
    padding: ${rem(100)} ${rem(20)} ${rem(30)} ${rem(20)};
    transform: translateX(${(p) => (p.moveRight ? rem(sidebarWidth) : 0)});
  `)};

  ${(p) =>
    p.hero &&
    css`
      font-family: ${headerFont};
      width: 75rem;
    `};
`

export default function Layout({
  children
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <Container>
      <Navbar />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </Container>
  )
}

export const Title = styled.h1`
  text-align: left;
  width: 100%;
  color: ${blmMetal};
  font-size: ${rem(42)};
  font-weight: bold;
  font-family: ${headerFont};
`;

export const Header2 = styled.h2`
  font-size: ${rem(32)};
  font-weight: 600;
  font-family: ${headerFont};
  margin: 1.5em 0 0.5em;
`;

export const SubHeader = styled.h3`
  margin: 1.5em 0 0.5em;
  font-size: ${rem(24)};
  font-weight: 600;
  font-family: ${headerFont};
`;

export const TertiaryHeader = styled.h4`
  margin: 1.5em 0 0.5em;
  font-size: ${rem(18)};
  font-weight: 600;
  font-family: ${headerFont};
`;
