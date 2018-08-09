import React from 'react';
import PropTypes from 'prop-types';

const AccordianCards = ({ target, cardName, componentName, expandCollapse }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">
          <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${target}`}>
            {cardName}
          </button>
        </h5>
      </div>
      <div id={target} className={`collapse ${expandCollapse}`} data-parent="#accordionParent">
        <div className="card-body">{componentName}</div>
      </div>
    </div>
  );
};

AccordianCards.propTypes = {
  target: PropTypes.string,
  cardName: PropTypes.string,
  expandCollapse: PropTypes.string,
  componentName: PropTypes.any
};

export default AccordianCards;
