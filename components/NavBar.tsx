import Link from 'next/link'
import React from "react"
import { useState } from "react";
import styled from "styled-components"
import styles from "../styles/Layout.module.css";
import styles2 from '../styles/Home.module.css'


export const links = [
  { path: "employee", title: "For Employees" },
  { path: "job-seekers", title: "For Job Seekers" },
  { path: "entrepreneurs", title: "For Entrepreneurs" },
  { path: "blog", title: "Blog" },
]
const Header = () => {
  const [isOpen,setIsOpen] = useState(false);
  const openMenu= ()=> setIsOpen(!isOpen);
  return (
    // <HeaderContainer>
    //   <LogoWrap>
    //     <Link href="/" >
    //       <H2>
    //         <Logo href="/">earner</Logo>
    //       </H2>
    //     </Link>
    //   </LogoWrap>

    //   <Links>
    //     {links.map((item: any, index: any) => (
    //       <Li key={index}>
    //         {/* <MenuLink to={`/${item.path}`}>{item.title}</MenuLink> */}
    //         <Link href={`/posts/${item.path}`}>
    //               <a>{item.title}</a>
    //             </Link>
    //       </Li>
    //     ))}
    //   </Links>
    //   {/* <SideMenu /> */}
    // </HeaderContainer>
          
    <header className={styles2.header}>
    <nav className={styles.navbar}>
        <Link href='/'>
         <a className={styles.navlogo}>[BrandLogo]</a>
        </Link>
    <ul className={isOpen === false ? 
            styles.navmenu : styles.navmenu +' '+ styles.active}>
        <li className={styles.navitem}>
           <Link href='/'>
             <a className={isOpen === false ? 
                        styles.navlink : styles.navlink+' '+styles.active}
                        onClick={openMenu}>Home</a>
            </Link>
        </li>
        <li className={styles.navitem}>
            <Link href='/blogs'>
              <a className={isOpen === false ? 
                        styles.navlink : styles.navlink+' '+styles.active}
                        onClick={openMenu}>Blogs</a>
            </Link>
        </li>
        <li className={styles.navitem}>
            <Link href='/about'>
              <a className={isOpen === false ? 
                        styles.navlink : styles.navlink+' '+styles.active}
                        onClick={openMenu}>About</a>
            </Link>
        </li>
        <li className={styles.navitem}>
            <Link href='/contact'>
             <a className={isOpen === false ? 
                        styles.navlink : styles.navlink+' '+styles.active}
                        onClick={openMenu}>Contact</a>
            </Link>
        </li>
    </ul>
    <button className={isOpen === false ? 
                        styles.hamburger : styles.hamburger+' '+styles.active}
                        onClick={openMenu}
                        >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
    </button>
    </nav>
</header>
  )
}

export default Header

