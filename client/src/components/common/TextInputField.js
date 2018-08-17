import React from 'react';
import PropTypes from 'prop-types';

const TextInputField = ({ type, classname, name, value, errors, onChange, placeholder, icon, divClassName }) => {
  return (
    <div className={divClassName + ' clientInputs form-group input-group'}>
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          <i className={`input-icon fa fa-${icon}`} />
        </span>
      </div>
      <input placeholder={placeholder} className={classname + ' form-control'} name={name} value={value} error={errors} onChange={onChange} type={type} />
    </div>
  );
};

TextInputField.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  errors: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  divClassName: PropTypes.string,
  onChange: PropTypes.func
};

TextInputField.defaultProps = {
  type: 'text',
  divClassName: ''
};

export default TextInputField;
