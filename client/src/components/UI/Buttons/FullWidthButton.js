import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
        outline: none;
        background-color: #3d3d3d;
        color: white;
        font-size: 35px;
        border-radius: 50px;
        border: 1px solid white;
        height: 71px;
        width: 100%;
        font-weight: 400;
        display: block;
        margin-top: 3%;
        &:hover {
            background-color: white;
            color: #3d3d3d;
        }
    `;

const FullWidthButton = props => {

    return (
        <Button onClick={props.onClick}>
            {props.children}
        </Button>
    )
}


export default FullWidthButton;