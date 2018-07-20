import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ message }) => {
  return (
    <h4 className="display-4 text-center">
      {message}
      <br />
      <i className=" mt-5 text-info fa fa-spinner fa-pulse fa-3x fa-fw" />
    </h4>
  );
};

Spinner.propTypes = {
  message: PropTypes.string
};

Spinner.defaultProps = {
  message: "If loading doesn't go away, hit refresh"
};

export default Spinner;
// return <img className="spinner" src="https://gifimage.net/wp-content/uploads/2018/05/spinner-gif-transparent-background-13.gif" alt="loading..." />;
