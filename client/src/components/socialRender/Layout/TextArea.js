import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ name, channel, value, onChange, duration, delay, animation }) => {
  return (
    <div className={`input-group mb-4  wow animated ${animation}`} data-wow-duration={duration} data-wow-delay={delay}>
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="fa fa-pencil-square-o text-primary pl-0" aria-hidden="true" />
          {`${channel} Copy Goes Here`}
        </span>
      </div>
      <textarea name={name} className="form-control card-text pt-1" placeholder="Leave Empty To Remove Social Network " aria-label="With textarea" type="text" value={value} onChange={onChange} />
    </div>
  );
};

TextArea.propTypes = {
  value: PropTypes.string,
  channel: PropTypes.string,
  onChange: PropTypes.func,
  duration: PropTypes.string,
  delay: PropTypes.string,
  animation: PropTypes.string
};

TextArea.defaultProps = {
  channel: ''
};

export default TextArea;
