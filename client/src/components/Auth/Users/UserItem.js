import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserByID } from '../../../actions/authActions'; // Fed the client model

class UserItem extends Component {
  componentDidMount() {
    this.props.getUserByID(this.props.match.params.id);
  }
  render() {
    const { users } = this.props.auth;
    return (
      <div className="col-md-12 row mb-3 wow animated fadeIn" data-wow-duration="2s" data-wow-delay="1s">
        <p>
          <b>{users.name}: </b>
        </p>
        <div className="form-check form-check-inline">
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
        </div>
      </div>
    );
  }
}

UserItem.propTypes = {
  auth: PropTypes.object.isRequired,
  getUserByID: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserByID }
)(UserItem);
