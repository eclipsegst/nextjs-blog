import Link from 'next/link'
import React from "react"
import { useState } from "react";
import styled from "styled-components"
import styles from "./layout.module.css";
import { grey, paleGrey } from '../utils/colors';

export const links = [
  { path: "/", title: "Home" },
  { path: "about", title: "About" },
  { path: "blogs", title: "Blogs" },
  { path: "contact", title: "Contact" },
]

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--bg);
  background-color: ${paleGrey};
  padding: 1rem 2rem;
`

const Links = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0rem 1rem;
  margin: 0px 0px 0px 0px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Li = styled.li`
  list-style: none;
  &:hover {
    border-bottom: 5px solid var(--green);
  }
`

const MenuLink = styled(Link)`
  transition: 0.2s opacity cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    opacity: 0.8;
  }
  color: var(--radiantBlue);
  font-family: var(--semibold);
  &:hover,
  &:active {
    color: var(--radiantBlue);
    border-bottom: 3px solid var(--radiantBlue);
    padding-bottom: 10px;
  }
`

const Header = () => {
  return ( 
    <HeaderContainer>
      <Link href='/'>
        <a className={styles.navlogo}>Brand</a>
      </Link>

      <Links>
        {links.map((item: any, index: any) => (
          <Li className={styles.navitem} key={index}>
            <Link href={`/${item.path}`}>
                  <a className={styles.navlink}>{item.title}</a>
                </Link>
          </Li>
        ))}
      </Links>
    </HeaderContainer>
  )
}

export default Header
