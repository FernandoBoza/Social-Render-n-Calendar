import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Social Goal Tracker!</h1>
        {/* <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p> */}
        <hr className="my-4" />
        {/* <p>Testing for Boca, and Guzman</p> */}
        <p className="lead">
          <Link
            className="btn btn-success btn-lg px-5 mr-3"
            to="/register"
            role="button"
          >
            Sign Up
          </Link>
          <Link
            className="btn btn-primary btn-lg px-5 mx-3"
            to="/login"
            role="button"
          >
            Login
          </Link>
        </p>
      </div>
    );
  }
}

// Component propTypes
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth // Comes from the root reducer
});

export default connect(mapStateToProps)(Landing);
