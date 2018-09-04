import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';

const CommentFeedComp = ({ name, commentDate, comment }) => {
  return (
    <div className="commentFeed">
      <Media>
        <Media left href="#">
          <div className="commentProfileImage bg-primary mr-3">{name.charAt(0)}</div>
        </Media>
        <Media body>
          <Media heading>
            {name} <i className="fa fa-circle text-primary mx-2" /> {commentDate}
          </Media>
          {comment}
        </Media>
      </Media>
    </div>
  );
};

CommentFeedComp.propTypes = {
  name: PropTypes.string,
  commentDate: PropTypes.string,
  comment: PropTypes.string
};

export default CommentFeedComp;
