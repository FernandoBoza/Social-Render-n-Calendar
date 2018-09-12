import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserByID, updateUserRole, deleteUser } from '../../../actions/authActions';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import isEmpty from '../../../validation/is-empty';

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: '',
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  onRadioBtnClick(role) {
    this.setState({ role });
  }

  handleSubmit = e => {
    e.preventDefault();
    const roleData = { role: this.state.role };
    this.props.updateUserRole(this.props.match.params.id, roleData, this.props.history);
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getUserByID(this.props.match.params.id);
    }
  }

  onDeleteClick = e => {
    this.props.deleteUser(this.props.match.params.id, this.props.history);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.auth.user) {
      const user = nextProps.auth.users;
      this.setState({
        role: isEmpty(user.role && user.role) ? '' : user.role
      });
    }
  };
  render() {
    const { users } = this.props.auth;

    const clientAccess = (
      <div className="userInfo form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <i className="input-icon fa fa-id-card text-info" />
          </span>
        </div>
        <p className=" form-control text-capitalize">{users.clientRoleAccess}</p>
      </div>
    );
    return (
      <div
        className="col-md-4 offset-md-1 mb-3 wow animated fadeIn"
        data-wow-duration="2s"
        data-wow-delay="1s"
      >
        <h1 className="display-4 text-capitalize my-5">Edit {users.name}</h1>
        <div className="userInfo form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className="input-icon fa fa-user text-primary" />
            </span>
          </div>
          <p className=" form-control text-capitalize">{users.name}</p>
        </div>
        <div className="userInfo form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className="input-icon fa fa-envelope text-success" />
            </span>
          </div>
          <p className=" form-control text-capitalize">{users.email}</p>
        </div>
        <div className="userInfo form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className="input-icon fa fa-pencil text-warning" />
            </span>
          </div>
          <p className=" form-control text-capitalize">{this.state.role}</p>
        </div>

        {// eslint-disable-next-line
        users.role == 'client' ? clientAccess : ''}

        <form className="mt-4" onSubmit={this.handleSubmit}>
          <ButtonGroup>
            <Button
              color="primary"
              onClick={() => this.onRadioBtnClick('admin')}
              active={this.state.role === 'admin'}
            >
              Admin
            </Button>
            <Button
              color="primary"
              onClick={() => this.onRadioBtnClick('user')}
              active={this.state.role === 'user'}
            >
              User
            </Button>
            <Button
              color="primary"
              onClick={() => this.onRadioBtnClick('client')}
              active={this.state.role === 'client'}
            >
              Client
            </Button>
          </ButtonGroup>
          <button className="btn btn-lg btn-primary btn-block mt-5 mx-auto" type="submit">
            Update User Role
          </button>
        </form>
        <button
          onClick={this.toggle}
          type="button"
          className="btn btn-lg btn-danger btn-block mt-5 mx-auto"
        >
          Delete {users.name}
        </button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            <p className="h1">
              Think About It
              <span role="img" aria-label="think about it emoji">
                🤔
              </span>
            </p>
          </ModalHeader>
          <ModalBody>Are you sure you want to do this? </ModalBody>
          <ModalFooter>
            <Button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete {this.state.name}
            </Button>
            <Button color="primary" onClick={this.toggle}>
              No, I don't know what I was thinking
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

UserItem.propTypes = {
  auth: PropTypes.object.isRequired,
  getUserByID: PropTypes.func.isRequired,
  updateUserRole: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserByID, updateUserRole, deleteUser }
)(UserItem);
