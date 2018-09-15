import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllSocialRender, deleteContent, deleteComment } from '../../../actions/socialRenderActions'; // Fed the client model
import { getAllUsers } from '../../../actions/authActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FacebookDesktop from '../Facebook/FacebookDesktop';
import FacebookMobile from '../Facebook/FacebookMobile';
import Instagram from '../Instagram/Instagram';
import TwitterDesktop from '../Twitter/TwitterDesktop';
import LinkedInDesktop from '../LinkedIn/LinkedIn';
import AccordianCards from '../Layout/AccordianCards';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';
import CommentFeeds from './CommentFeedComp';
import CommentForm from './CommentFormPost';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class ContentCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      commentOpen: false,
      commentData: [],
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

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.socialRenderContent.socialRenderContent == null ||
      nextProps.socialRenderContent.loading
    ) {
    } else {
      nextProps.socialRenderContent.socialRenderContent.map(
        // eslint-disable-next-line
        x => (x._id == this.state._id ? this.setState({ commentData: x.comments }) : 'nope')
      );
    }
  };

  componentDidMount() {
    this.props.getAllSocialRender();
    this.props.getAllUsers();
    document.title = 'Content Calendar';
  }

  onDeleteClick = e => {
    this.props.deleteContent(this.state._id, this.props.history);
    this.setState({
      modal: !this.state.modal
    });
  };

  deleteComment = (post_id, comment_id) => {
    this.props.deleteComment(post_id, comment_id);
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
      start: e.start,
      commentData: e.commentData
    });
  };

  onCommentClick = e => {
    this.setState(prevState => ({
      commentOpen: !prevState.commentOpen
    }));
  };

  render() {
    const { user } = this.props.auth;
    const usersDataLoading = this.props.auth.loading;
    const { socialRenderContent, loading } = this.props.socialRenderContent;
    const fb = this.state.contentCopy ? this.state.contentCopy : false;
    const tw = this.state.contentTwitterCopy ? this.state.contentTwitterCopy : false;
    const ig = this.state.contentInstagramCopy ? this.state.contentInstagramCopy : false;
    const ln = this.state.contentLinkedInCopy ? this.state.contentLinkedInCopy : false;
    const month = this.props.match.params.m;
    const year = this.props.match.params.y;
    let comments;
    let currentUserId;
    let commentLiked;
    let PostDate = [];

    if (socialRenderContent == null || loading) {
      PostDate = [];
    } else {
      if (socialRenderContent.length > 0) {
        PostDate = socialRenderContent.map(x => ({
          start: x.dateGoingLive,
          end: x.dateGoingLive,
          title: x.clientName,
          twtHandle: x.clientName !== undefined ? x.clientName.replace(/ /g, '') : x.clientName,
          clientInitials: x.clientInitials,
          contentCopy: x.contentCopy,
          contentTwitterCopy: x.contentTwitterCopy,
          contentInstagramCopy: x.contentInstagramCopy,
          contentLinkedInCopy: x.contentLinkedInCopy,
          imgLink: x.imgLink,
          imgLinkInstagram: x.imgLinkInstagram,
          _id: x._id,
          commentData: x.comments
        }));
      } else {
        PostDate = [];
      }
    }

    // ********************************************
    // Setting Up fir dates in URL
    // ********************************************
    // eslint-disable-next-line
    if (month == undefined || year == undefined) {
      var dateString = new Date();
    } else {
      dateString = `20${year}-${month}-01T20:02:40-04:00`;
    }

    if (user == null || usersDataLoading) {
    } else {
      currentUserId = user.id;
    }
    // ********************************************
    // Bringing In Comment Data
    // ********************************************
    // eslint-disable-next-line
    if (this.state.commentData == null || this.state.commentData == undefined) {
      comments = this.state.commentData;
    } else {
      this.state.commentData.map(x =>
        x.likes.filter(t => (t.user === currentUserId ? (commentLiked = x._id) : (commentLiked = null)))
      );
      comments = this.state.commentData.map(x => (
        <CommentFeeds
          key={x._id}
          id={x._id}
          name={x.name}
          commentDate={x.date}
          comment={x.comment}
          likeNumber={x.likes.length}
          commentLiked={commentLiked}
          deleteComment={this.deleteComment}
          post_id={this.state._id}
        />
      ));
    }

    return (
      <div className="ContentCalendar col-sm-10 offset-sm-1 animated fadeIn">
        <Calendar
          selectable
          defaultDate={new Date(dateString)} // Current Month
          views={['month']}
          defaultView="month"
          events={PostDate} // Feed in Redux Props
          style={{ height: '85vh' }}
          onSelectEvent={event => this.toggle(event)} // Work on Modal Open
        />

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.state.commentOpen ? 'modal-comment-click' : ''}
          size="lg"
        >
          <ModalHeader toggle={this.toggle}>
            <b>Date Going Live:</b> {moment(this.state.start).format('MMM Do YY, h:mm A')}
          </ModalHeader>
          <ModalBody className="row" id="social-render">
            <div className={!this.state.commentOpen ? 'col-sm-12' : 'col-md-6'}>
              <div className="accordion" id="accordionParent">
                <AccordianCards
                  // expandCollapse={fb ? 'show' : tw ? 'show' : ig ? 'show' : ln ? 'show' : ''}
                  hidOrShow={fb ? '' : 'hide'}
                  target={'facebookDesktop'}
                  cardName={'Facebook Desktop'}
                  componentName={
                    <FacebookDesktop
                      className="mb-5"
                      clientInitials={this.state.clientInitials}
                      clientName={this.state.title}
                      contentCopy={this.state.contentCopy}
                      imgLink={this.state.imgLink}
                      date={moment(this.state.start).format('MMM Do')}
                    />
                  }
                />
                <AccordianCards
                  // expandCollapse={fb ? 'show' : tw ? 'show' : ig ? 'show' : ln ? 'show' : ''}
                  hidOrShow={fb ? '' : 'hide'}
                  target={'facebookMobile'}
                  cardName={'Facebook Mobile'}
                  componentName={
                    <FacebookMobile
                      clientInitials={this.state.clientInitials}
                      clientName={this.state.title}
                      contentCopy={this.state.contentCopy}
                      imgLink={this.state.imgLink}
                      date={moment(this.state.dateGoingLive).format('MMM Do')}
                    />
                  }
                />
                <AccordianCards
                  // expandCollapse={fb ? 'show' : tw ? 'show' : ig ? 'show' : ln ? 'show' : ''}
                  hidOrShow={ig ? '' : 'hide'}
                  target={'instagram'}
                  cardName={'Instagram'}
                  componentName={
                    <Instagram
                      clientInitials={this.state.clientInitials}
                      clientName={this.state.title}
                      contentCopy={this.state.contentInstagramCopy}
                      imgLink={
                        this.state.imgLinkInstagram ? this.state.imgLinkInstagram : this.state.imgLink
                      }
                    />
                  }
                />
                <AccordianCards
                  // expandCollapse={fb ? 'show' : tw ? 'show' : ig ? 'show' : ln ? 'show' : ''}
                  hidOrShow={tw ? '' : 'hide'}
                  target={'twitter'}
                  cardName={'Twitter Desktop'}
                  componentName={
                    <TwitterDesktop
                      className="mb-5"
                      clientInitials={this.state.clientInitials}
                      clientName={this.state.title}
                      contentCopy={this.state.contentTwitterCopy}
                      imgLink={this.state.imgLink}
                      twtHandle={this.state.twtHandle}
                    />
                  }
                />
                <AccordianCards
                  // expandCollapse={fb ? 'show' : tw ? 'show' : ig ? 'show' : ln ? 'show' : ''}
                  hidOrShow={ln ? '' : 'hide'}
                  target={'linkedin'}
                  cardName={'Linkedin'}
                  componentName={
                    <LinkedInDesktop
                      lnFollowers="1,000"
                      className="mb-5"
                      clientInitials={this.state.clientInitials}
                      clientName={this.state.title}
                      contentCopy={this.state.contentLinkedInCopy}
                      imgLink={this.state.imgLink}
                    />
                  }
                />
              </div>
            </div>
            <div
              className={!this.state.commentOpen ? 'hide ' : 'commentSection col-md-6 animated fadeInUp'}
            >
              <div className="commentFeed">{comments}</div>
              <CommentForm social_id={this.state._id} comments={this.state.commentData} />
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
  getAllSocialRender: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deleteContent: PropTypes.func.isRequired,
  socialRenderContent: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  socialRenderContent: state.socialRenderContent,
  auth: state.auth,
  getAllUsers: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  {
    getAllSocialRender,
    deleteComment,
    deleteContent,
    getAllUsers
  }
)(ContentCalendar);
