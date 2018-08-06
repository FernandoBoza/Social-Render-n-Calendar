import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllSocialRender } from '../../../actions/socialRenderActions'; // Fed the client model
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class ContentCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      title: '',
      events: [
        // feed in from redux props
        {
          start: new Date(moment('2018-08-11T02:26:00+00:00')),
          end: new Date(moment('2018-08-11T02:26:00+00:00')),
          title: 'Post II'
        },
        {
          start: new Date(moment('2018-08-15T02:26:00+00:00')),
          end: new Date(moment('2018-08-15T02:26:00+00:00')),
          title: 'Post III'
        }
      ]
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.getAllSocialRender();
  }

  toggle = e => {
    this.setState({
      modal: !this.state.modal,
      title: e.title
    });
  };

  render() {
    const { socialRenderContent } = this.props.socialRenderContent;
    if (socialRenderContent) {
      socialRenderContent.map(socialContent => console.log(socialContent.dateGoingLive));
    }
    return (
      <div className="ContentCalendar">
        <Calendar
          selectable
          defaultDate={new Date()} // Current Month
          defaultView="month"
          events={this.state.events} // Feed in Redux Props
          style={{ height: '100vh' }}
          onSelectEvent={event => this.toggle(event)} // Work on Modal Open
        />

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          {/* <ModalHeader toggle={this.toggle}>Modal title</ModalHeader> */}
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
          <ModalBody>{this.props.content}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

// Component propTypes
// Props Load from Store
ContentCalendar.propTypes = {
  getAllSocialRender: PropTypes.func.isRequired, // from client actions
  socialRenderContent: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  socialRenderContent: state.socialRenderContent // Feed state to root reducer
});

export default connect(
  mapStateToProps,
  { getAllSocialRender }
)(ContentCalendar);
