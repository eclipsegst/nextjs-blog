import React from "react"
import styled from "styled-components"
import rem from '../utils/rem';
import { grey } from '../utils/colors';

const Wrapper = styled.footer`
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${grey};
  background: #ffffff;
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
