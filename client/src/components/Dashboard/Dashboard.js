import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getAllClients } from '../../actions/clientActions'; // Fed the client model
// import ClientActions from './ClientActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAllClients();
  }

  buildClientList = (clients, user) => {
    // var arrayOfClients = [];
    for (let i = 0; i <= clients.length; i++) {
      return (
        <li key={clients[1].handle}>
          <Link to={`/clients/${clients[1].handle}`}>{clients[1].name}</Link> last updated by {user.name}
        </li>
      );
    }
  };

  render() {
    const { user } = this.props.auth;
    const { clients, loading } = this.props.clients; // Comoes from IntialState in reducer
    let dashboardContent;

    if (clients === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check To See If User Has Already Created A Client
      if (Object.keys(clients).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">{this.buildClientList(clients, user)}</p>

            <Link to="/create-client" className="btn btn-lg btn-info mr-3">
              Create Client <i className="fa fa-user" style={{ fontSize: '1.2rem' }} />
            </Link>

            <Link to="/clients" className="btn btn-lg btn-primary">
              All Clients <i className="fa fa-users" style={{ fontSize: '1.2rem' }} />
            </Link>
          </div>
        );
      } else {
        // User if logged In But Has No Profile
        dashboardContent = (
          <div>
            <p>Would you like to create a new client profile</p>
            <Link to="/create-client" className="btn btn-lg btn-info">
              Create Client <i className="fa fa-user" />
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <p className="lead text-muted">Welcome {user.name}</p>
              <ul>{dashboardContent}</ul>
              {/* <ClientActions /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Component propTypes
// Props Load from Store
Dashboard.propTypes = {
  getAllClients: PropTypes.func.isRequired, // from client actions
  auth: PropTypes.object.isRequired,
  clients: PropTypes.object.isRequired // from Client Reducer
};

const mapStateToProps = state => ({
  clients: state.clients, // Feed state to root reducer
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllClients }
)(Dashboard);
