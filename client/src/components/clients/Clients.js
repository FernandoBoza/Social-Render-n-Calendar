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
    const { clients, loading } = this.props.clients;
    let clientItems;
    if (clients == null || loading) {
      clientItems = <Spinner />;
    } else {
      if (clients.length > 0) {
        clientItems = clients.map(client => (
          <ClientItem key={client._id} clients={client} />
        ));
      } else {
        clientItems = <h4>No Clients Found</h4>;
      }
    }
    return (
      <div className="clients">
        <section className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Client Profiles</h1>
              <p className="lead text-center">Browser Clients</p>
              {clientItems}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ClientsComponent.propTypes = {
  getAllClients: PropTypes.func.isRequired,
  clients: PropTypes.object.isRequired // from Client Reducer
};

const mapStateToProps = state => ({
  clients: state.clients // Feed state to root reducer
});

export default connect(
  mapStateToProps,
  { getAllClients }
)(ClientsComponent);
