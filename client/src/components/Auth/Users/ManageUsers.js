import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers } from '../../../actions/authActions'; // Fed the client model
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class ManageUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { users, loading } = this.props.auth;
    let editBoard;

    //eslint-disable-next-line
    if (users == null || loading) {
      editBoard = (
        <tr>
          <td className="h1">No users</td>
        </tr>
      );
    } else {
      if (users.length > 0) {
        editBoard = users.map(user => (
          <tr key={user._id}>
            <td className={user.role == 'admin' ? 'text-capitalize adminGuard' : 'text-capitalize tableHover'}>
              {user.name}
              <Link to={user.role == 'admin' ? '' : `/users/manage/${user._id}`} className="mx-2 hide_opacity">
                Edit
              </Link>
              {/* <Link to={`/users/manage/${user._id}`} className=" hide_opacity">
                Delete
              </Link> */}
            </td>
            <td className="text-capitalize">{user.email}</td>
            <td className="text-capitalize">{user.role}</td>
          </tr>
        ));
      } else {
        editBoard = (
          <tr>
            <td className="h1">No users</td>
          </tr>
        );
      }
    }
    return (
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>{editBoard}</tbody>
        </Table>
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
