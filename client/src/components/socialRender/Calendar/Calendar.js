import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllSocialRender, deleteContent } from '../../../actions/socialRenderActions'; // Fed the client model
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FacebookDesktop from '../Facebook/FacebookDesktop';
import FacebookMobile from '../Facebook/FacebookMobile';
import Instagram from '../Instagram/Instagram';
import TwitterDesktop from '../Twitter/TwitterDesktop';
import LinkedInDesktop from '../LinkedIn/LinkedIn';
import AccordianCards from '../Layout/AccordianCards';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class ContentCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      commentOpen: false,
      comment: '',
      title: '',
      clientInitials: '',
      contentCopy: '',
      contentTwitterCopy: '',
      contentInstagramCopy: '',
      contentLinkedInCopy: '',
      imgLink: '',
      imgLinkInstagram: '',
      twtHandle: '',
      start: null,
      _id: ''
    };
    this.toggle = this.toggle.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    this.props.getAllSocialRender();
  }

  onDeleteClick = e => {
    this.props.deleteContent(this.state._id, this.props.history);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      contentLinkedInCopy: e.contentLinkedInCopy,
      imgLink: e.imgLink,
      imgLinkInstagram: e.imgLinkInstagram,
      twtHandle: e.twtHandle,
      start: e.start
    });
  };

  onCommentClick = e => {
    this.setState(prevState => ({
      commentOpen: !prevState.commentOpen
    }));
  };

  render() {
    const { user } = this.props.auth;
    const { socialRenderContent, loading } = this.props.socialRenderContent;
    const fb = this.state.contentCopy ? this.state.contentCopy : false;
    const tw = this.state.contentTwitterCopy ? this.state.contentTwitterCopy : false;
    const ig = this.state.contentInstagramCopy ? this.state.contentInstagramCopy : false;
    const ln = this.state.contentLinkedInCopy ? this.state.contentLinkedInCopy : false;
    const month = this.props.match.params.m;
    const year = this.props.match.params.y;
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
          contentLinkedInCopy: contentInfo.contentLinkedInCopy,
          imgLink: contentInfo.imgLink,
          imgLinkInstagram: contentInfo.imgLinkInstagram,
          _id: contentInfo._id
        }));
      } else {
        PostDate = [];
      }
    }

    // eslint-disable-next-line
    if (month == undefined || year == undefined) {
      var dateString = new Date();
    } else {
      dateString = `20${year}-${month}-01T20:02:40-04:00`;
    }

    console.log(this.state.commentOpen);

    return (
      <div className="CtrlContentCalendar animated fadeIn">
        <Calendar
          selectable
          defaultDate={new Date(dateString)} // Current Month
          views={['month', 'agenda']}
          defaultView="month"
          events={PostDate} // Feed in Redux Props
          style={{ height: '91vh' }}
          onSelectEvent={event => this.toggle(event)} // Work on Modal Open
        />

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.commentOpen ? 'modal-comment-click' : ''} size="lg">
          <ModalHeader toggle={this.toggle}>Date Going Live: {moment(this.state.start).format('ddd MMM Do')}</ModalHeader>
          <ModalBody className="row" id="social-render">
            <div className={!this.state.commentOpen ? 'col-sm-12' : 'col-md-6'}>
              <div className="accordion" id="accordionParent">
                <AccordianCards hidOrShow={fb ? '' : 'hide'} target={'facebookDesktop'} cardName={'Facebook Desktop'} componentName={<FacebookDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.title} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={moment(this.state.start).format('MMM Do')} />} />
                <AccordianCards hidOrShow={fb ? '' : 'hide'} target={'facebookMobile'} cardName={'Facebook Mobile'} componentName={<FacebookMobile clientInitials={this.state.clientInitials} clientName={this.state.title} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={moment(this.state.dateGoingLive).format('MMM Do')} />} />
                <AccordianCards hidOrShow={ig ? '' : 'hide'} target={'instagram'} cardName={'Instagram'} componentName={<Instagram clientInitials={this.state.clientInitials} clientName={this.state.title} contentCopy={this.state.contentInstagramCopy} imgLink={this.state.imgLinkInstagram ? this.state.imgLinkInstagram : this.state.imgLink} />} />
                <AccordianCards hidOrShow={tw ? '' : 'hide'} target={'twitter'} cardName={'Twitter Desktop'} componentName={<TwitterDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.title} contentCopy={this.state.contentTwitterCopy} imgLink={this.state.imgLink} twtHandle={this.state.twtHandle} />} />
                <AccordianCards hidOrShow={ln ? '' : 'hide'} target={'linkedin'} cardName={'Linkedin'} componentName={<LinkedInDesktop lnFollowers="1,000" className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.title} contentCopy={this.state.contentLinkedInCopy} imgLink={this.state.imgLink} />} />
              </div>
            </div>
            <div className={!this.state.commentOpen ? 'hide ' : 'col-md-6 animated fadeInRight'}>
              <textarea name="comment" className="form-control card-text pt-1" placeholder="Comment Section Here " aria-label="With textarea" type="text" value={this.state.comment} onChange={this.handleChange} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Hide
            </Button>

            <Link to={`/social-render/${this.state._id}/edit-content`} className="btn btn-success mx-3">
              Edit Post
            </Link>

            <a href="/content-calendar" onClick={this.onDeleteClick} className="btn btn-danger">
              Delete Post Content
            </a>
            <Button onClick={this.onCommentClick} className="btn btn-warning ml-3">
              Comment
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ContentCalendar.propTypes = {
  getAllSocialRender: PropTypes.func.isRequired, // from client actions
  deleteContent: PropTypes.func.isRequired, // from client actions
  socialRenderContent: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  socialRenderContent: state.socialRenderContent,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllSocialRender, deleteContent }
)(ContentCalendar);

/* <div className="input-group mb-4 animated">
                <div className="input-group-prepend">
                  <span className="input-group-text commentName">
                    <i className="fa fa-pencil-square-o text-primary pl-0" aria-hidden="true" />
                    {`${user.name}`}
                  </span>
                </div>
              </div> */
