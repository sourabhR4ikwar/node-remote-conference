import React from 'react';
import { browserHistory as history  } from "react-router";
import styled from 'styled-components';
import CenteredContainer from '../components/Layout/CenteredContainer';
import Logo from '../components/Logo/Logo';
import LargeRoundedButton from '../components/UI/Buttons/LargeRoundedButton';
import OrSeperator from '../components/UI/OrSeperator';
import FullWidthButton from '../components/UI/Buttons/FullWidthButton';


const PartedDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;


const HomePage = (props) => {

    const navigate = (route) => {
        history.push(route);
    }
    
    return (
      <CenteredContainer>
        <Logo />
        <PartedDiv style={{ marginTop: "10%" }}>
          <LargeRoundedButton onClick={() => navigate("/join-conference")}>
            JOIN
          </LargeRoundedButton>
          <LargeRoundedButton onClick={() => navigate("/login")}>
            HOST
          </LargeRoundedButton>
        </PartedDiv>
        <OrSeperator />
        <FullWidthButton onClick={() => navigate("/login")}>
          SIGN IN
        </FullWidthButton>
        <FullWidthButton onClick={() => navigate("/register")}>
          SIGN UP
        </FullWidthButton>
      </CenteredContainer>
    );
}


export default HomePage;