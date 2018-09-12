import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/socialRenderActions';

class CommentFormPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const commentPost = {
      comment: this.state.comment
    };
    this.props.addComment(this.props.social_id, commentPost);
    this.setState({ comment: '' });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="commentPost">
        <form onSubmit={this.handleSubmit}>
          <textarea
            name="comment"
            className="form-control card-text pt-1"
            placeholder="Comment Section Here "
            aria-label="With textarea"
            type="text"
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <button className="btn btn-success mt-3" type="submit">
            Post Comment
          </button>
        </form>
      </div>
    );
  }
}

CommentFormPost.propTypes = {
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  user: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(withRouter(CommentFormPost));
