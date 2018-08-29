import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers } from '../../../actions/authActions'; // Fed the client model

class ManageUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    const { user, users, loading } = this.props.auth;
    let editBoard;
    console.log(user);
    console.log(users);

    if (users == null || loading || user.role !== 'admin') {
      editBoard = <h1>Sorry You're Now Allowed Here</h1>;
    } else {
      if (users.length > 0) {
        editBoard = users.map(user => <h1 key={user._id}>{user.name}</h1>);
      } else {
        editBoard = <h1>Hello {user.name}</h1>;
      }
    }
    return (
      <div>
        {/* <h1>Hello</h1> */}
        {editBoard}
        {/* <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
          <label className="form-check-label" for="inlineRadio1">
            Admin
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
          <label className="form-check-label" for="inlineRadio2">
            User
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
          <label className="form-check-label" for="inlineRadio3">
            Client
          </label>
        </div> */}
      </div>
    );
  }
}

ManageUsers.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllUsers }
)(ManageUsers);
