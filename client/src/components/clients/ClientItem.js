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
              <b>{clients.name}: </b> Updated by {clients.lastUpdatedBy}
            </p>
            <Link to={`/clients/${clients.handle}`} className="btn btn-primary">
              <b>View Client</b> <i className="fa fa-user" />
            </Link>

            <Link to={`/content-calendar/${clients.handle}`} className="btn btn-success mx-3">
              <b>View Client Calendar</b> <i className="fa fa-calendar-plus-o" />
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
