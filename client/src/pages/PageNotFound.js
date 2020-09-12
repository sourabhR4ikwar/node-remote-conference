import React, { Component } from 'react';
import CenteredContainer from '../components/Layout/CenteredContainer';
import NavBar from '../components/NavBar/NavBar';

class PageNotFound extends Component{
    render(){
        return (
          <CenteredContainer>
              <NavBar />
            <h1 style={{color: 'white'}}>Page Not Found :(</h1>
          </CenteredContainer>
        );
    }
}

export default PageNotFound;