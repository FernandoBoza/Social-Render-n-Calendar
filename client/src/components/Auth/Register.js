import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="registerComponent container">
        <div className="row">
          <div className="col-sm-12">
            <div className="text-center">
              <h1 className="mt-5 mb-3 display-4">Sign Up</h1>
              <form noValidate className="form-signin" onSubmit={this.handleSubmit}>
                <TextFieldGroup placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} error={errors.name} />
                <TextFieldGroup name="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange} type="email" error={errors.email} />
                <TextFieldGroup name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} type="password" error={errors.password} />
                <button className="btn btn-lg btn-outline-primary btn-block mt-3" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, // Comes from the root reducer
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
