import React from 'react';
import styled from 'styled-components';

const Seperator = styled.div`
    font-family: 'Pacifico', cursive, sans-serif;
    font-size: 26px;
    color: white;
    display: flex;
    align-items: center;
    text-align: center;

    &::before, &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #fff;
    }
    &::before {
        margin-right: 0.4em;
    }
    &::after {
        margin-left:  0.4em;
    }
`;

const OrSeperator = () => {
    return (
        <Seperator>
            OR
        </Seperator>
    )
}

export default OrSeperator
