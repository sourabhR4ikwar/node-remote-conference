import React from 'react';
import { browserHistory as history } from 'react-router'; 
import CenteredContainer from '../components/Layout/CenteredContainer';
import NavBar from '../components/NavBar/NavBar';
import OrSeperator from '../components/UI/OrSeperator';
import FullWidthButton from '../components/UI/Buttons/FullWidthButton';
import styled from 'styled-components';

const Container = styled.div`
    width: 536px;
`;

const navigate = (url) => {
  history.push(url);
}

const Dashboard = () => {
    return (
      <CenteredContainer>
        <NavBar />
        <Container>
          <FullWidthButton onClick={() => navigate('/join-conference')}>JOIN</FullWidthButton>
          <OrSeperator />
          <FullWidthButton onClick={() => navigate('/host-conference')}>HOST</FullWidthButton>
        </Container>
      </CenteredContainer>
    );
}

export default Dashboard;
