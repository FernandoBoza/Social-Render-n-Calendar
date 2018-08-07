import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/clientActions';

class NavBar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-primary" to="/create-client">
            Create Client
          </Link>
        </li>
        <li className="nav-item active mx-5">
          <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
            <i className="fa fa-hand-peace text-primary" style={{ fontSize: '1.2rem' }} />
            Bye {user.name}
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/login">
            Login <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
    return (
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
          <Link className="navbar-brand" to="/">
            Social Stream
          </Link>
          {/* <span className="lead mini-intro mr-auto">
            <a href="http://thr33fold.com" rel="noopener noreferrer" target="_blank">
              A THR33FOLD Company
            </a>
          </span> */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isAuthenticated ? authLinks : guestLinks}
            {/* // Login Form here */}
          </div>
        </nav>
      </div>
    );
  }
}

// Component propTypes
NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth // Comes from the root reducer
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(NavBar);

/*  Future LOGIN FORM FROM HOME
  <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form> */
