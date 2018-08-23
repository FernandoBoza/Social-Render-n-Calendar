import React from 'react';
import PropTypes from 'prop-types';

const FacebookDesktop = ({ clientInitials, clientName, contentCopy, imgLink, date }) => {
  return (
    <div className="col-md-9 card fb-desktop">
      <div className="card-body">
        <div className="d-inline-block fb-title">
          <p className="d-inline-block company bg-primary">{clientInitials}</p>
          <ul>
            <li>
              <h5 className="d-inline-block card-title">{clientName}</h5>
            </li>
            <li>{date}</li>
          </ul>
        </div>

        <p className="my-3 contentCopy">{contentCopy}</p>

        <img className="card-img mt-2 mb-4" src={imgLink} alt="Facebook Style Render" />
        <hr />
        <a href="" onClick={e => e.preventDefault()}>
          <span>
            <i className="fa fa-thumbs-o-up text-primary" /> Like
          </span>
          <span>
            <i className="fa fa-comment-o text-primary" />
            Comment
          </span>
          <span>
            <i className="fa fa-share  text-primary" />
            Share
          </span>
        </a>
        <hr />
      </div>
    </div>
  );
};

FacebookDesktop.propTypes = {
  clientInitials: PropTypes.string,
  clientName: PropTypes.string,
  contentCopy: PropTypes.string,
  imgLink: PropTypes.string,
  date: PropTypes.string
};

FacebookDesktop.defaultProps = {};

export default FacebookDesktop;
