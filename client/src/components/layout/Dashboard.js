import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getAllClients } from '../../actions/clientActions'; // Fed the client model
import Clients from '../clients/Clients';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAllClients();
  }

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
            <Link to="/create-client" className="btn btn-info w-50">
              Create Client <i className="fa fa-user-plus" style={{ fontSize: '1.2rem' }} />
            </Link>
          </div>
        );
      } else {
        // User if logged In But Has No Profile
        dashboardContent = (
          <div>
            <p>Would you like to create a new client profile</p>
            <Link to="/create-client" className="btn btn-info w-50">
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
            <div className="col-md-6">
              <h1 className="display-4">Dashboard</h1>
              <p className="lead text-muted mb-5">Welcome {user.name}</p>
              {dashboardContent}

              <div>
                <Link to="/social-render" className="btn btn-info mt-4 w-50">
                  Social Render
                  <i className="fa fa-columns ml-2" style={{ fontSize: '1.2rem' }} />
                </Link>
              </div>
              <div>
                <Link to="/content-calendar" className="btn btn-info mt-4 w-50">
                  Content Calendar
                  <i className="fa fa-calendar ml-2" style={{ fontSize: '1.2rem' }} />
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <Clients />
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
