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
  const customStyles = {
    option: (base, state) => ({
      ...base,
      color: state.isFullscreen ? 'red' : 'blue',
      padding: 20
    }),
    control: () => ({
      // none of react-selects styles are passed to <View />
      width: 200
    }),
    singleValue: (base, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...base, opacity, transition };
    }
  };
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
        styles={customStyles}
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
