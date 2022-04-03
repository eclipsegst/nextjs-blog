import React from "react"
import Link from 'next/link'
import styled from "styled-components"
import styles from "./layout.module.css";
import rem from '../utils/rem';
import { grey, paleGrey, red } from '../utils/colors';

const Wrapper = styled.footer`
  bottom : 0;
  height : 60px;
  min-height: 5vh;
  width: 100%;
  padding: 0 0.5rem;
  /* margin-top: ${rem(50)}; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* color: grey;
  background: #efefef; */
  color: ${grey};
  background: ${paleGrey};
`;

const SmallText = styled.p`
  font-size: small;
`;

const Footer = () => {
  return (
    <Wrapper>
      <SmallText> ©️ Copy Right 2022</SmallText>
    </Wrapper>
  )
}

export default Footer
