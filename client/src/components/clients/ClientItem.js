import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import isEmpty from '../../validation/is-empty';

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
            <Link to={`/clients/${clients.handle}`} className="btn btn-info mr-3">
              View Client <i className="fa fa-user" />
            </Link>

            <Link to={'/'} className="btn btn-primary">
              Dashboard <i className="fa fa-tachometer" />
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
