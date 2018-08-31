import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserByID, updateUserRole } from '../../../actions/authActions';
import { Button, ButtonGroup } from 'reactstrap';
import isEmpty from '../../../validation/is-empty';

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = { role: '' };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onRadioBtnClick(role) {
    this.setState({ role });
  }

  handleSubmit = e => {
    e.preventDefault();
    const roleData = { role: this.state.role };
    console.log(roleData);
    this.props.updateUserRole(this.props.match.params.id, roleData, this.props.history);
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getUserByID(this.props.match.params.id);
    }
  }

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
    return (
      <div className="col-md-4 offset-md-1 row mb-3 wow animated fadeIn" data-wow-duration="2s" data-wow-delay="1s">
        <h1 className="display-4 text-capitalize my-5">Edit {users.name}</h1>
        <div className="userInfo form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className="input-icon fa fa-user" />
            </span>
          </div>
          <p className=" form-control text-capitalize">{users.name}</p>
        </div>
        <div className="userInfo form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className="input-icon fa fa-envelope" />
            </span>
          </div>
          <p className=" form-control text-capitalize">{users.email}</p>
        </div>
        <div className="userInfo form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className="input-icon fa fa-pencil" />
            </span>
          </div>
          <p className=" form-control text-capitalize">{this.state.role}</p>
        </div>

        <form className="mt-4" onSubmit={this.handleSubmit}>
          <ButtonGroup>
            <Button color="primary" onClick={() => this.onRadioBtnClick('admin')} active={this.state.role === 'admin'}>
              Admin
            </Button>
            <Button color="primary" onClick={() => this.onRadioBtnClick('user')} active={this.state.role === 'user'}>
              User
            </Button>
            <Button color="primary" onClick={() => this.onRadioBtnClick('client')} active={this.state.role === 'client'}>
              Client
            </Button>
          </ButtonGroup>
          <button className="btn btn-lg btn-primary btn-block mt-5 mx-auto" type="submit">
            Update User Role
          </button>
        </form>
      </div>
    );
  }
}

UserItem.propTypes = {
  auth: PropTypes.object.isRequired,
  getUserByID: PropTypes.func.isRequired,
  updateUserRole: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserByID, updateUserRole }
)(UserItem);

/* <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name={users.name + '_inlineRadioOptions'} id={users.name + '_1'} value="option1" />
          <label className="form-check-label" htmlFor={users.name + '_1'}>
            Admin
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name={users.name + '_inlineRadioOptions'} id={users.name + '_2'} value="option2" />
          <label className="form-check-label" htmlFor={users.name + '_2'}>
            User
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name={users.name + '_inlineRadioOptions'} id={users.name + '_3'} value="option3" />
          <label className="form-check-label" htmlFor={users.name + '_3'}>
            Client
          </label>
        </div> */
