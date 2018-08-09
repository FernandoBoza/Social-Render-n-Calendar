import React from 'react';
import PropTypes from 'prop-types';

const ClientInputGroup = ({ onChange, value, value2 }) => {
  return (
    <div className="input-group my-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Client Name and Initials</span>
      </div>
      <input type="text" name="clientName" onChange={onChange} value={value} className="form-control" />
      <input type="text" name="clientInitials" onChange={onChange} value={value2} className="form-control" />
    </div>
  );
};

ClientInputGroup.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  value2: PropTypes.string
};

export default ClientInputGroup;
