import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserItem extends Component {
  render() {
    const { users } = this.props;
    console.log(users);
    return (
      <div className="card card-body bg-light mb-3 wow animated fadeInRight" data-wow-duration="2s" data-wow-delay="1s">
        <div className="row">
          <div className="col-md-12">
            <p>
              <b>{users.name}: </b>
            </p>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name={users.name + '_inlineRadioOptions'} id={users.name + '_1'} value="option1" />
              <label className="form-check-label" htmlFor={users.name + '_1'}>
                {users.role}
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
        </div>
      </div>
    );
  }
}

UserItem.propTypes = {
  users: PropTypes.any.isRequired
};
