import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ value, onChange }) => {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          Copy Goes Here
          <i className="fa fa-pencil-square-o text-primary" aria-hidden="true" />
        </span>
      </div>
      <textarea name="contentCopy" className="form-control card-text" aria-label="With textarea" type="text" value={value} onChange={onChange} />
    </div>
  );
};

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default TextArea;
