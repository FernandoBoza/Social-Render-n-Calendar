import React from 'react';
import PropTypes from 'prop-types';

const TextInputField = ({ type, classname, objective, name, channel, value, errors, onChange, placeholder, icon, divClassName }) => {
  return (
    <div className={divClassName + ' clientInputs form-group input-group'}>
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          <i className={`input-icon fa fa-${icon}`} />
        </span>
      </div>
      <input placeholder={placeholder} className={classname + ' form-control'} objective={objective} name={name} channel={channel} value={value} error={errors} onChange={onChange} type={type} />
    </div>
  );
};

TextInputField.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  objective: PropTypes.string,
  name: PropTypes.string,
  channel: PropTypes.string,
  value: PropTypes.any,
  errors: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  divClassName: PropTypes.string,
  onChange: PropTypes.func
};

TextInputField.defaultProps = {
  type: 'number',
  divClassName: ''
};

export default TextInputField;
