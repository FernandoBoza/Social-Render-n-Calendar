import React from 'react';
import PropTypes from 'prop-types';

const Instagram = ({ clientInitials, clientName, contentCopy, imgLink }) => {
  return (
    <div className="col-xs-12 col-md-7 card px-0 instagram">
      <div className="card-body pb-0">
        <div className="d-inline-block fb-title">
          <p className="d-inline-block company bg-primary">{clientInitials}</p>
          <ul>
            <li>
              <h5 className="d-inline-block card-title">{clientName}</h5>
            </li>
            <li>Miami, Florida</li>
          </ul>
        </div>
      </div>

      <img className="card-img mb-4" src={imgLink} alt="Facebook Style Render" />

      <div className="card-body pt-0 lower-card-body">
        <i className="fa fa-heart-o text-primary" />
        <i className="fa fa-comment-o fa-flip-horizontal text-primary" />
        <i className="fa fa-bookmark-o text-primary" />

        <p className="my-3 contentCopy">{contentCopy}</p>
      </div>
    </div>
  );
};

Instagram.propTypes = {
  clientInitials: PropTypes.string,
  clientName: PropTypes.string,
  contentCopy: PropTypes.string,
  imgLink: PropTypes.string
};

Instagram.defaultProps = {};

export default Instagram;
