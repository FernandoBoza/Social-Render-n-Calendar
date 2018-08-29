import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers } from '../../../actions/authActions'; // Fed the client model
import UserItem from './UserItem';

class ManageUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    const { user, users, loading } = this.props.auth;
    let editBoard;

    if (users == null || loading || user.role !== 'admin') {
      editBoard = <h4>Sorry You're Now Allowed Here</h4>;
    } else {
      if (users.length > 0) {
        editBoard = users.map(user => <UserItem key={user._id} users={user} />);
      } else {
        editBoard = <h4>Hello {user.name}</h4>;
      }
    }
    return (
      <div>
        <h1>Users</h1>
        {editBoard}
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
