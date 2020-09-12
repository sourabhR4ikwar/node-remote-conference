import React from 'react';
import { Link } from 'react-router';
import { FaRegUserCircle } from 'react-icons/fa';
import styled from 'styled-components';

const BtnContainer = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    cursor: pointer;
  }
`;

const IconContainer = styled.span`
  font-size: 35px;
`;

const TextContainer = styled.span`
  font-size: 18px;
  margin-right: 0.5rem;
`;


const RightIconBtn = (props) => {
    return (
      <BtnContainer to={props.link}>
        <TextContainer>{props.name}</TextContainer>
        <IconContainer>
          <FaRegUserCircle />
        </IconContainer>
      </BtnContainer>
    );
}

export default RightIconBtn;
