import React from 'react';
import PropTypes from 'prop-types';

const FacebookMobile = ({ clientInitials, clientName, contentCopy, imgLink }) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const today = new Date();
  return (
    <div className="col-xs-12  offset-md-2  col-md-7 card fb-mobile">
      <div className="card-body">
        <div className="d-inline-block fb-title">
          <p className="d-inline-block company bg-primary">{clientInitials}</p>
          <ul>
            <li>
              <h5 className="d-inline-block card-title">{clientName}</h5>
            </li>
            <li>{today.toLocaleDateString('en-US', options)}</li>
          </ul>
        </div>

        <p className="my-3 contentCopy">{contentCopy}</p>

        <img className="card-img mt-2 mb-4" src={imgLink} alt="Facebook Style Render" />
        <hr />
        <a className="text-center" href="" onClick={e => e.preventDefault()}>
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

FacebookMobile.propTypes = {
  clientInitials: PropTypes.string,
  clientName: PropTypes.string,
  contentCopy: PropTypes.string,
  imgLink: PropTypes.string
};

FacebookMobile.defaultProps = {};

export default FacebookMobile;
