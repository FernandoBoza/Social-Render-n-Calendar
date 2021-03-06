import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ClientItem extends Component {
  render() {
    const { clients } = this.props;
    return (
      <div className="card card-body bg-light mb-3 wow animated fadeInDown" data-wow-duration="2s" data-wow-delay="1s">
        <div className="row">
          <div className="col-md-12">
            <p>
              <b>{clients.name}: </b> Updated by {clients.lastUpdatedBy}
            </p>
            <Link to={`/clients/${clients.handle}`} className="btn btn-primary wow animated fadeInUp" data-wow-duration="2s" data-wow-delay="1.5s">
              <i className="fa fa-user " /> <b>View Client</b>
            </Link>

            <Link to={`/content-calendar/${clients.handle}`} className="btn btn-success mx-3 wow animated fadeInUp" data-wow-duration="2s" data-wow-delay="1.5s">
              <i className="fa fa-calendar-plus-o " /> <b>View Client Calendar</b>
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
