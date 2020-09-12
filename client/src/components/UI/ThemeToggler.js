import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
    background: ${({theme}) => theme.background};
    border: 2px solid ${({theme}) => theme.toggleBorder};
    color: ${({theme}) => theme.text};
    border-radius: 30px;
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0.6rem;
`;

const ThemeToggler = ({theme, toggleTheme}) => {
    return (
        <Button onClick={toggleTheme}>
            switch Theme
        </Button>
    );
}

ThemeToggler.propTypes = {
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired
};

export default ThemeToggler;