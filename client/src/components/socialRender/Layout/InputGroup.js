import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({ label, icon, name, onChange, value, placeholder, duration, delay, animation }) => {
  return (
    <div className={`input-group my-3 wow animated ${animation}`} data-wow-duration={duration} data-wow-delay={delay}>
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-default">
          {label}
          <i className={`fa fa-${icon} text-primary`} aria-hidden="true" />
        </span>
      </div>
      <input type="text" name={name} className="form-control" onChange={onChange} value={value} placeholder={placeholder} />
    </div>
  );
};

InputGroup.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  duration: PropTypes.string,
  delay: PropTypes.string,
  animation: PropTypes.string
};

export default InputGroup;
