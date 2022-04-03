import React from "react"
import Link from 'next/link'
import styled from "styled-components"
import styles from "./layout.module.css";
import rem from '../utils/rem';
import { grey, paleGrey, red } from '../utils/colors';

const Wrapper = styled.footer`
  bottom : 0;
  height : 40px;
  min-height: 10vh;
  width: 100%;
  padding: 0 0.5rem;
  margin-top: ${rem(50)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* color: grey;
  background: #efefef; */
  color: ${grey};
  background: ${paleGrey};
`;

const Footer = () => {
  return (
    <Wrapper>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        >
        Powered by{' '}
        <img src="/favicon.ico" alt="Logo" className={styles.logo} />
        </a>
      <p> Copy Right 2022</p>
    </Wrapper>
  )
}

export default Footer
