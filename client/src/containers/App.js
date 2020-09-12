import React from 'react';
import PropTypes from 'prop-types';

const App = (props) => {
    return (
      <div>
        {props.children}
      </div>
    );
}


App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App;
