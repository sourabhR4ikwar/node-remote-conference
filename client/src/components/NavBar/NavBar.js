import React from 'react'
import styled from 'styled-components';


// Components
import Logo from '../Logo/Logo';
import RightIconBtn from './RightIconBtn';

const NavContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items center;
    height: 78px;
`;

const Nav = styled.div`
  height: 78px;
  justify-content: space-between;
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-width: 600px;
`;


const NavBar = () => {
    let isAuth;
    let UserProfile = null;
    const expiryDate = localStorage.getItem('expiryDate');
    const token = localStorage.getItem('token');
    if(!expiryDate || !token || new Date(expiryDate) <= new Date()){
      isAuth = false;
    }
    else {
      isAuth = true;
      let displayName = localStorage.getItem('displayName'); 
      UserProfile = <RightIconBtn name={displayName} link="/profile" />;
    }
    if(isAuth){
    }
    return (
      <NavContainer>
        <Nav>
          <Logo size="35" />
          {UserProfile}
        </Nav>
      </NavContainer>
    );
}

export default NavBar
