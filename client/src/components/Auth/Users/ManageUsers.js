import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers } from '../../../actions/authActions'; // Fed the client model
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody } from 'reactstrap';
import RegisterClientUser from './RegisterClientUser';

class ManageUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    // this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    this.props.getAllUsers();
  }

  toggle = e => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { users, loading } = this.props.auth;
    let editBoard;

    //eslint-disable-next-line
    if (users == null || loading) {
      editBoard = (
        <tr>
          <td className="h1">Refresh Page</td>
        </tr>
      );
    } else {
      if (users.length > 0) {
        editBoard = users.map(user => (
          <tr key={user._id}>
            <td
              className={
                // eslint-disable-next-line
                user.role == 'admin' ? 'text-capitalize adminGuard' : 'text-capitalize tableHover' // eslint-disable-next-line
              }
            >
              {user.name}
              <Link
                to={
                  // eslint-disable-next-line
                  user.role == 'admin' ? '' : `/users/manage/${user._id}`
                }
                className="mx-2 hide_opacity"
              >
                Edit
              </Link>
              <Link to={`/users/manage/${user._id}`} className=" hide_opacity">
                Delete
              </Link>
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
        <Button color="primary" onClick={this.toggle}>
          Add A Client User
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalBody id="manage-user">
            <div className="accordion" id="accordionParent">
              <RegisterClientUser />
            </div>
          </ModalBody>
        </Modal>
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
