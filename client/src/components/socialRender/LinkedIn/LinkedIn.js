import React from 'react';
import PropTypes from 'prop-types';

const LinkedIn = ({ clientInitials, clientName, contentCopy, imgLink, lnFollowers }) => {
  return (
    <div className="col-md-9 card px-0 linkedIn">
      <div className="card-body pb-0">
        <div className="d-inline-block fb-title">
          <p className="d-inline-block company bg-primary">{clientInitials}</p>
          <ul>
            <li>
              <h4 className="card-title font-weight-bold mb-0">{clientName}</h4>
            </li>
            <li>{lnFollowers ? lnFollowers : '1,000'} followers</li>
            <li>1w</li>
          </ul>
        </div>
      </div>
      {/* <div className="card-body pt-0 lower-card-body"> */}
      <p className="my-3 contentCopy px-4">{contentCopy}</p>
      {/* </div> */}
      <img className="card-img mb-4" src={imgLink} alt="Facebook Style Render" />
      <div className="card-body pt-0 lower-card-body">
        <span>10 Likes</span>
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
      </div>
    </div>
  );
};

LinkedIn.propTypes = {
  clientInitials: PropTypes.string,
  clientName: PropTypes.string,
  contentCopy: PropTypes.string,
  imgLink: PropTypes.string
};

LinkedIn.defaultProps = {};

export default LinkedIn;
