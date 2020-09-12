import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #3d3d3d;
    display: flex;
    justify-content: center;
    align-items: center;
`;


function CenteredContainer(props) {
    return (
        <Container>
            <div>
            {props.children}
            </div>
        </Container>
    )
}

export default CenteredContainer
