import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const ClientInputGroup = ({
  onChange,
  onChange2,
  value,
  value2,
  placeholder,
  placeholder2,
  options
}) => {
  return (
    <div className="input-group my-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Client Name and Initials</span>
      </div>
      <Select
        options={options}
        name="clientName"
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={value}
      />
      <input
        type="text"
        name="clientInitials"
        onChange={onChange2}
        value={value2}
        placeholder={placeholder2}
        className="form-control"
      />
    </div>
  );
};

ClientInputGroup.propTypes = {
  options: PropTypes.any,
  onChange: PropTypes.func,
  onChange2: PropTypes.func,
  value: PropTypes.string,
  value2: PropTypes.string,
  placeholder: PropTypes.string,
  placeholder2: PropTypes.string
};

export default ClientInputGroup;

/* <input type="text" name="clientName" onChange={onChange} value={value} placeholder={placeholder} className="form-control" /> */
