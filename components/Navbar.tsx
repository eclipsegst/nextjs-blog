import React from "react"
import styled from "styled-components"
import Link from 'next/link'
import styles from "./layout.module.css";
import { paleGrey } from '../utils/colors';
import rem from '../utils/rem';

export const links = [
  { path: "/", title: "Home" },
  { path: "/blogs", title: "Blogs" },
  { path: "/about", title: "About" },
]

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--bg);
  background-color: ${paleGrey};
  padding: 0rem 0rem 0rem 2rem;
`
const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-right: ${rem(32)};
`;

const NavLink = styled(Link).attrs((/* props */) => ({
  unstyled: true,
}))`
  flex: 0 0 auto;
  display: inline-block;
  line-height: ${rem(50)};
  transition: opacity 0.2s, transform 0.2s;
  cursor: pointer;
  letter-spacing: ${rem(0.4)};
  color: currentColor;
`;

const StyledNavLink = styled(styled.a``)`
  // margin: 20px 0 10px;
  padding: 15px;
  font-weight: bold;
  color: black;
  text-decoration: none;
  &:hover,
  &:focus {
    color: black;
    opacity: 0.6;
  }
  &:active {
    color: red;
    transform: scale(0.95);
    opacity: 0.6;
  }
`;

const Navbar = () => {
  return ( 
    <HeaderContainer>
      <Link href='/'>
        <a className={styles.navlogo}>Brand</a>
      </Link>

      <Wrapper>
      {links.map((item: { path: string, title: string }, index: number) => (
          <NavLink href={`${item.path}`} key={index}><StyledNavLink>{item.title}</StyledNavLink></NavLink>
      ))}
      </Wrapper>
    </HeaderContainer>
  )
}

export default Navbar
