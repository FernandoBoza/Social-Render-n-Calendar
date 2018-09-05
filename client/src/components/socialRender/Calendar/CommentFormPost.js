import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../../actions/socialRenderActions';

class CommentFormPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      errors: {}
    };
  }

  componentDidMount() {}

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const commentPost = {
      comment: this.state.comment
    };
    this.props.addComment(this.props.social_id, commentPost);
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
  socialRenderContent: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  user: PropTypes.string
};

const mapStateToProps = state => ({
  socialRenderContent: state.socialRenderContent,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentFormPost);
