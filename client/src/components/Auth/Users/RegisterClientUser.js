import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerClientUser } from '../../../actions/authActions';
import { getAllClients } from '../../../actions/clientActions';
import TextFieldGroup from '../../common/TextFieldGroup';
import Select from 'react-select';

class RegisterClientUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      clientRoleAccess: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllClients();
  }

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
      password: this.state.password,
      clientRoleAccess: this.state.clientRoleAccess
    };
    this.props.registerClientUser(newUser, this.props.history);
    console.log(newUser);
  };

  handleClientSelect = e => {
    this.setState({
      clientRoleAccess: e.label
    });
  };

  render() {
    const customStyles = {
      option: (base, state) => ({
        ...base,
        color: state.isFullscreen ? 'red' : 'blue',
        padding: 20
      }),
      control: () => ({
        width: '100%',
        borderRight: 'none'
      }),
      singleValue: (base, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...base, opacity, transition };
      }
    };
    const { clients, loading } = this.props.clients;
    const { errors } = this.state;
    var clientItems;
    if (clients == null || loading) {
    } else {
      clientItems = clients.map(client => ({
        label: client.name,
        value: client.handle
      }));
    }
    return (
      <div className="registerComponent container">
        <div className="row">
          <div className="col-sm-12">
            <div className="text-center">
              <h1 className="mt-5 mb-3 display-4">Register A Client</h1>
              <form noValidate className="form-signin" onSubmit={this.handleSubmit}>
                <TextFieldGroup name="name" placeholder="Client Name" value={this.state.name} onChange={this.handleChange} error={errors.name} />
                <TextFieldGroup name="email" placeholder="Client Email address" value={this.state.email} onChange={this.handleChange} type="email" error={errors.email} />
                <TextFieldGroup name="password" placeholder="Client Password" value={this.state.password} onChange={this.handleChange} type="password" error={errors.password} />
                {/* <TextFieldGroup name="clientRoleAccess" placeholder="Clients" value={this.state.clientRoleAccess} onChange={this.handleChange} type="text" error={errors.clientRoleAccess} /> */}
                <Select options={clientItems} name="clientName" onChange={this.handleClientSelect} placeholder="Choose A Client" defaultValue={this.state.clientRoleAccess} styles={customStyles} />
                <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
                  Register Client User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegisterClientUser.propTypes = {
  registerClientUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clients: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  clients: state.clients
});

export default connect(
  mapStateToProps,
  { registerClientUser, getAllClients }
)(withRouter(RegisterClientUser));
