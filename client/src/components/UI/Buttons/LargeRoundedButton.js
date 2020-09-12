import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
        outline: none;
        background-color: #3d3d3d;
        color: white;
        font-size: 40px;
        border-radius: 50px;
        border: 1px solid white;
        height: 140px;
        width: 260px;
        font-weight: 400;
        &:hover {
            background-color: white;
            color: #3d3d3d;
        }
    `;

const LargeRoundedButton = props => {

    return (
        <Button onClick={props.onClick}>
            {props.children}
        </Button>
    )
}


export default LargeRoundedButton;
