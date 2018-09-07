import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';
import moment from 'moment';

const CommentFeedComp = ({
  name,
  commentDate,
  comment,
  likeNumber,
  commentLiked,
  id,
  post_id,
  deleteComment
}) => {
  const this_id = id;
  return (
    <div>
      <Media className="mb-3">
        <Media left href="#">
          <div className="commentProfileImage bg-primary mr-3">{name.charAt(0)}</div>
        </Media>
        <Media body>
          <Media heading>
            <ul className="commentHeader">
              <li>
                {name} <i className="fa fa-circle text-primary ml-1 mr-2" />
                {moment(commentDate).calendar()}
              </li>
              <li className="commentLike float-right">
                <p>
                  {// eslint-disable-next-line
                  likeNumber == 0 ? '' : likeNumber}
                </p>
                <button className="btn btn-link pl-0 pt-0">
                  <i
                    className={
                      // eslint-disable-next-line
                      commentLiked == id ? 'fa fa-thumbs-up ml-2' : 'fa fa-thumbs-o-up ml-2'
                    }
                  />
                </button>
              </li>
            </ul>
          </Media>
          <p>{comment}</p>
          <button
            onClick={this_id ? this_id => deleteComment(post_id, id) : 'nope'}
            className="btn btn-danger "
          >
            Delete Comment
          </button>
        </Media>
      </Media>
    </div>
  );
};

CommentFeedComp.propTypes = {
  name: PropTypes.string,
  commentDate: PropTypes.string,
  comment: PropTypes.string,
  likeNumber: PropTypes.number,
  commentLiked: PropTypes.string,
  id: PropTypes.string,
  post_id: PropTypes.string,
  deleteComment: PropTypes.func
};

export default CommentFeedComp;
