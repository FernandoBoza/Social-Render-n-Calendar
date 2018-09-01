import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getAllClients } from '../../actions/clientActions';
import ClientItem from './ClientItem';

export class ClientsComponent extends Component {
  componentDidMount = e => {
    this.props.getAllClients();
  };

  render() {
    const { user } = this.props.auth;
    const userClientAccess = user.clientRoleAccess;
    const { clients, loading } = this.props.clients;
    let clientItems;
    if (clients == null || loading) {
      clientItems = <Spinner />;
    } else {
      // eslint-disable-next-line
      if (user.role == 'client') {
        // eslint-disable-next-line
        clientItems = clients.map(client => (client.name == userClientAccess ? <ClientItem key={client._id} clients={client} /> : ''));
      } else if (clients.length > 0) {
        clientItems = clients.map(client => <ClientItem key={client._id} clients={client} />);
      } else {
        clientItems = <h4>No Clients Found</h4>;
      }
    }
    return (
      <div className="clients">
        <section className="container p-0">
          <div className="row">
            <div className="col-md-12">
              <h1
                className={
                  // eslint-disable-next-line
                  user.role == 'client' ? 'hide' : 'display-4'
                }
              >
                Client Profiles
              </h1>
              <p
                className={
                  // eslint-disable-next-line
                  user.role == 'client' ? 'hide' : 'lead'
                }
              >
                Browser Clients
              </p>
              {clientItems}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ClientsComponent.propTypes = {
  auth: PropTypes.object.isRequired,

  getAllClients: PropTypes.func.isRequired,
  clients: PropTypes.object.isRequired // from Client Reducer
};

const mapStateToProps = state => ({
  auth: state.auth,
  clients: state.clients // Feed state to root reducer
});

export default connect(
  mapStateToProps,
  { getAllClients }
)(ClientsComponent);
