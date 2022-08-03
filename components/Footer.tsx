import React from "react"
import Link from 'next/link'
import styled from "styled-components"
import styles from "./layout.module.css";
import rem from '../utils/rem';
import { grey, paleGrey, red } from '../utils/colors';

const Wrapper = styled.footer`
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${grey};
  background: ${paleGrey};
  box-sizing: border-box;
  // margin-top: ${rem(50)};
`;

const SmallText = styled.p`
  font-size: small;
`;

const Footer = () => {
  return (
    <Wrapper>
      <SmallText> ©️ Copyright 2022</SmallText>
    </Wrapper>
  )
}

export default Footer
