import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const LogoLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        cursor: pointer;
    }
`;

const LogoText = styled.h1`
  color: #f6f6f6;
  font-size: ${(props) => (props.size ? props.size : 71)}px;
  font-family: "Pacifico", cursive, sans-serif;
  font-weight: 400;
`;

const Logo = props => {
    return (
      <LogoLink to="/" >
        <LogoText size={props.size}>RemoteConference</LogoText>
      </LogoLink>
    );
}



export default Logo;

