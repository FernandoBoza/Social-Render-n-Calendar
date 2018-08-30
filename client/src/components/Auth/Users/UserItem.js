import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserByID } from '../../../actions/authActions';
import { Button, ButtonGroup } from 'reactstrap';

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = { rSelected: 'admin' };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }
  
  componentDidMount() {
    this.props.getUserByID(this.props.match.params.id);
  }
  render() {
    const { users } = this.props.auth;
    console.log(users.role)
    console.log(this.state.rSelected)
    
    return (
      <div className="col-md-12 row mb-3 wow animated fadeIn" data-wow-duration="2s" data-wow-delay="1s">
        <p>
          <b>{users.name}: </b>
        </p>
        {/* <div className="form-check form-check-inline">
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
        </div> */}
        <ButtonGroup>
          <Button color="primary" onClick={() => this.onRadioBtnClick('admin')} active={this.state.rSelected === 'admin'}>Admin</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick('user')} active={this.state.rSelected === 'user'}>User</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick('client')} active={this.state.rSelected === 'client'}>Client</Button>
        </ButtonGroup>
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
