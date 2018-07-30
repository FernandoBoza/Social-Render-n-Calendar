import React from 'react';
import PropTypes from 'prop-types';

const TwitterDesktop = ({ clientInitials, clientName, contentCopy, imgLink }) => {
  //   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //   const today = new Date();
  //   {today.toLocaleDateString('en-US', options)
  return (
    <div className="offset-md-2 col-md-9 card tw-desktop">
      <div className="card-body">
        <div className="d-inline-block fb-title">
          <p className="d-inline-block company bg-primary mb-0">{clientInitials}</p>
          <h5 className="d-inline-block card-title pl-2">
            {clientName} <small className="text-muted">@{clientName}</small>
          </h5>
        </div>

        <p className="contentCopy">{contentCopy}</p>

        <img className="card-img mt-2 mb-4" src={imgLink} alt="Twitter Style Render" />
        <hr />
        <a href="" onClick={e => e.preventDefault()}>
          <span>
            <i className="fa fa-thumbs-o-up text-primary" /> Like
          </span>
          <span>
            <i className="fa fa-comment-o text-primary" />Comment
          </span>
          <span>
            <i className="fa fa-share  text-primary" />Share
          </span>
        </a>
        <hr />
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
