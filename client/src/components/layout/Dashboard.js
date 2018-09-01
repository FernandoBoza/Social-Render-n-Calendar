import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getAllClients } from '../../actions/clientActions'; // Fed the client model
import Clients from '../clients/Clients';
import WOW from 'wowjs';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAllClients();
    new WOW.WOW({
      live: false
    }).init();
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
            <Link to="/create-client" className="btn btn-info w-50 wow animated fadeInLeft" data-wow-duration="2s" data-wow-delay=".9s">
              <i className="fa fa-user-plus mr-2" style={{ fontSize: '1.2rem' }} /> <b>Create Client</b>
            </Link>
          </div>
        );
      } else {
        // User if logged In But Has No Profile
        dashboardContent = (
          <div>
            <p>Would you like to create a new client profile</p>
            <Link to="/create-client" className="btn btn-info w-50">
              <b>Create Client</b> <i className="fa fa-user" style={{ fontSize: '1.2rem' }} />
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
                <Link to="/social-render" className="btn btn-info mt-4 w-50 wow animated fadeInLeft" data-wow-duration="1s" data-wow-delay=".2s">
                  <i className="fa fa-columns mr-2" style={{ fontSize: '1.2rem' }} />
                  <b>Social Render</b>
                </Link>
              </div>
              <div>
                <Link to="/content-calendar" className="btn btn-info mt-4 w-50 wow animated fadeInLeft" data-wow-duration="1s" data-wow-delay=".3s">
                  <i className="fa fa-calendar mr-2" style={{ fontSize: '1.2rem' }} />
                  <b>Content Calendar</b>
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
