import React from "react"
import styled from "styled-components"
import Link from 'next/link'
import rem from '../utils/rem';
import SignInSignOut from "./SignInSignOut"
import { useSession } from "next-auth/react"

const Wrapper = styled.nav`
  padding: 0.25em 1em;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-right: ${rem(0)};
  background-color: #ffffff;
  position: sticky;
  justify-content: space-between;
`;

const EndNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

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

export const StyledNavLink = styled(styled.a``)`
  // margin: 20px 0 10px;
  padding: 1em;
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
  const links = [
    { path: "/", title: "Home" },
    { path: "/blogs", title: "Blogs" },
    { path: "/about", title: "About" },
  ]

  const { data: session, status } = useSession()
  // After login
  if (session) {
    [{ path: "/client", title: "Client" },
    { path: "/server", title: "Server" },
    { path: "/api-example", title: "api-example" },
    ].forEach(element => {
      links.push(element)
    });
  }

  return (
    <Wrapper>
      <Link href='/'>
        <StyledNavLink>Brand</StyledNavLink>
      </Link>

      <EndNav>
        {links.map((item: { path: string, title: string }, index: number) => (
          <NavLink href={`${item.path}`} key={index}><StyledNavLink>{item.title}</StyledNavLink></NavLink>
        ))}
        <SignInSignOut />
      </EndNav>
    </Wrapper>
  )
}

export default Navbar
