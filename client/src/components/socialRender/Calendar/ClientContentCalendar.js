import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getByClientName, deleteContent } from '../../../actions/socialRenderActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FacebookDesktop from '../Facebook/FacebookDesktop';
import FacebookMobile from '../Facebook/FacebookMobile';
import Instagram from '../Instagram/Instagram';
import TwitterDesktop from '../Twitter/TwitterDesktop';
import AccordianCards from '../Layout/AccordianCards';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export class ClientContentCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      title: '',
      clientInitials: '',
      contentCopy: '',
      contentTwitterCopy: '',
      contentInstagramCopy: '',
      imgLink: '',
      imgLinkInstagram: '',
      twtHandle: '',
      start: null,
      _id: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.clientName) {
      this.props.getByClientName(this.props.match.params.clientName);
    }
  }

  onDeleteClick = e => {
    this.props.deleteContent(this.state._id, this.props.history);
  };

  toggle = e => {
    this.setState({
      modal: !this.state.modal,
      _id: e._id,
      title: e.title,
      clientInitials: e.clientInitials,
      contentCopy: e.contentCopy,
      contentTwitterCopy: e.contentTwitterCopy,
      contentInstagramCopy: e.contentInstagramCopy,
      imgLink: e.imgLink,
      imgLinkInstagram: e.imgLinkInstagram,
      twtHandle: e.twtHandle,
      start: e.start
    });
  };

  render() {
    const { socialRenderContent, loading } = this.props.socialRenderContent;
    let PostDate = [];

    if (socialRenderContent == null || loading) {
      PostDate = [];
    } else {
      if (socialRenderContent.length > 0) {
        PostDate = socialRenderContent.map(contentInfo => ({
          start: contentInfo.dateGoingLive,
          end: contentInfo.dateGoingLive,
          title: contentInfo.clientName,
          twtHandle: contentInfo.clientName.replace(/ /g, ''),
          clientInitials: contentInfo.clientInitials,
          contentCopy: contentInfo.contentCopy,
          contentTwitterCopy: contentInfo.contentTwitterCopy,
          contentInstagramCopy: contentInfo.contentInstagramCopy,
          imgLink: contentInfo.imgLink,
          imgLinkInstagram: contentInfo.imgLinkInstagram,
          _id: contentInfo._id
        }));
      } else {
        PostDate = [];
      }
    }

    const fb = this.state.contentCopy ? this.state.contentCopy : false;
    const tw = this.state.contentTwitterCopy ? this.state.contentTwitterCopy : false;
    const ig = this.state.contentInstagramCopy ? this.state.contentInstagramCopy : false;

    return (
      <div className="ContentCalendar">
        <Calendar
          selectable
          defaultDate={new Date()} // Current Month
          views={['month', 'agenda']}
          defaultView="month"
          events={PostDate} // Feed in Redux Props
          style={{ height: '91vh' }}
          onSelectEvent={event => this.toggle(event)} // Work on Modal Open
        />

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Date Going Live: {moment(this.state.start).format('ddd MMM Do')}</ModalHeader>
          <ModalBody id="social-render">
            <div className="accordion" id="accordionParent">
              <AccordianCards hidOrShow={fb ? '' : 'hide'} expandCollapse={'show'} target={'facebookDesktop'} cardName={'Facebook Desktop'} componentName={<FacebookDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.title} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={moment(this.state.start).format('MMM Do')} />} />
              <AccordianCards hidOrShow={fb ? '' : 'hide'} target={'facebookMobile'} cardName={'Facebook Mobile'} componentName={<FacebookMobile clientInitials={this.state.clientInitials} clientName={this.state.title} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={moment(this.state.dateGoingLive).format('MMM Do')} />} />
              <AccordianCards hidOrShow={ig ? '' : 'hide'} target={'instagram'} cardName={'Instagram'} componentName={<Instagram clientInitials={this.state.clientInitials} clientName={this.state.title} contentCopy={this.state.contentInstagramCopy} imgLink={this.state.imgLinkInstagram ? this.state.imgLinkInstagram : this.state.imgLink} />} />
              <AccordianCards hidOrShow={tw ? '' : 'hide'} target={'twitter'} cardName={'Twitter Desktop'} componentName={<TwitterDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.title} contentCopy={this.state.contentTwitterCopy} imgLink={this.state.imgLink} twtHandle={this.state.twtHandle} />} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Hide
            </Button>

            <Link to={`/social-render/${this.state._id}/edit-content`} className="btn btn-success mx-3">
              Edit Post
            </Link>
            <Button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete Post Content
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ClientContentCalendar.propTypes = {
  getByClientName: PropTypes.func.isRequired,
  deleteContent: PropTypes.func.isRequired, // from client actions
  socialRenderContent: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  socialRenderContent: state.socialRenderContent // Feed state to root reducer
});

export default connect(
  mapStateToProps,
  { getByClientName, deleteContent }
)(ClientContentCalendar);
