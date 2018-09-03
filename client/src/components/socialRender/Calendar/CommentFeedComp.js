import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Media } from 'reactstrap';

export class CommentFeedComp extends Component {
  render() {
    return (
      <div>
        <Media>
          <Media left href="#">
            <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />
          </Media>
          <Media body>
            <Media heading>Media heading</Media>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
            sollicitudin commodo. Cras purus odio, vestibulum
          </Media>
        </Media>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CommentFeedComp);
