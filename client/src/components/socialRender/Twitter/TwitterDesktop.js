import React from 'react';
import PropTypes from 'prop-types';

const TwitterDesktop = ({ clientInitials, clientName, twtHandle, contentCopy, imgLink }) => {
  return (
    <div className="offset-md-2 col-md-9 card tw-desktop">
      <div className="card-body">
        <div className="d-inline-block fb-title">
          <p className="d-inline-block company bg-primary mb-0">{clientInitials}</p>
          <h5 className="d-inline-block card-title pl-3">
            {clientName}
            <small className="text-muted twitterHandle">
              <span>@</span>
              {/* {clientName.replace(/ /g, '')} */}
              {twtHandle}
            </small>
          </h5>
        </div>

        <p className="contentCopy">{contentCopy}</p>

        <img className="card-img mt-2 mb-4" src={imgLink} alt="Twitter Style Render" />
        <a href="" onClick={e => e.preventDefault()}>
          <span>
            <i className="fa fa-comment-o text-primary" />10
          </span>
          <span>
            <i className="fa fa-retweet text-primary" />20
          </span>
          <span>
            <i className="fa fa-heart-o text-primary" />30
          </span>
          <span>
            <i className="fa fa-envelope-o text-primary" />
          </span>
        </a>
      </div>
    </div>
  );
};

TwitterDesktop.propTypes = {
  clientInitials: PropTypes.string,
  clientName: PropTypes.string,
  contentCopy: PropTypes.string,
  imgLink: PropTypes.string
};

TwitterDesktop.defaultProps = {};

export default TwitterDesktop;
