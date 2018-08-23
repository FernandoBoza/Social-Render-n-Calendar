import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ name, channel, value, onChange }) => {
  return (
    <div className="input-group mb-4">
      <div className="input-group-prepend">
        <span className="input-group-text">
          {`${channel} Copy Goes Here`}
          <i className="fa fa-pencil-square-o text-primary" aria-hidden="true" />
        </span>
      </div>
      <textarea name={name} className="form-control card-text pt-1" placeholder="Leave Empty To Remove Social Network " aria-label="With textarea" type="text" value={value} onChange={onChange} />
    </div>
  );
};

TextArea.propTypes = {
  value: PropTypes.string,
  channel: PropTypes.string,
  onChange: PropTypes.func
};

TextArea.defaultProps = {
  channel: ''
};

export default TextArea;
