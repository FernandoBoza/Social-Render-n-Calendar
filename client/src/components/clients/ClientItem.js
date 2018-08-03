import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ClientItem extends Component {
  render() {
    const { clients } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-md-12">
            <p>
              {clients.name} Last Updated By {clients.lastUpdatedBy}
            </p>
            <Link to={`/clients/${clients.handle}`} className="btn btn-primary">
              View Client <i className="fa fa-user" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ClientItem.propTypes = {
  clients: PropTypes.object.isRequired
};
