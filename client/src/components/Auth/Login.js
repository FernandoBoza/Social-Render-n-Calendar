import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="loginComponent container">
        <div className="row">
          <div className="col-sm-12">
            <div className="text-center">
              <h1 className="mt-5 mb-3 display-4">Login</h1>
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <TextFieldGroup placeholder="Email Address" name="email" type="email" value={this.state.email} onChange={this.handleChange} error={errors.email} />

                <TextFieldGroup placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleChange} error={errors.password} />
                <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Component propTypes
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, // Comes from the root reducer
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
