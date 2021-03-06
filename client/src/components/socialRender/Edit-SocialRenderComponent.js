import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateClientContent, getContentbyClient } from '../../actions/socialRenderActions';
import FacebookDesktop from './Facebook/FacebookDesktop';
import FacebookMobile from './Facebook/FacebookMobile';
import Instagram from './Instagram/Instagram';
import TwitterDesktop from './Twitter/TwitterDesktop';
import LinkedIn from './LinkedIn/LinkedIn';
import AccordianCards from './Layout/AccordianCards';
import InputGroup from './Layout/InputGroup';
import TextArea from './Layout/TextArea';
import moment from 'moment';
import DateTimePicker from 'react-datetime';
import WOW from 'wowjs';
import isEmpty from '../../validation/is-empty';

class EditSocialRenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      clientInitials: '',
      contentCopy: ``,
      contentTwitterCopy: ``,
      contentInstagramCopy: ``,
      contentLinkedInCopy: ``,
      imgLink: '',
      imgLinkInstagram: '',
      dateGoingLive: null,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClientSelect = this.handleClientSelect.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getContentbyClient(this.props.match.params.id);
      new WOW.WOW({
        live: false
      }).init();
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.socialRenderContent.socialRenderContent) {
      const socialContent = nextProps.socialRenderContent.socialRenderContent;
      this.setState({
        clientName: isEmpty(socialContent.clientName && socialContent.clientName)
          ? ''
          : socialContent.clientName,
        clientInitials: isEmpty(socialContent.clientInitials && socialContent.clientInitials)
          ? ''
          : socialContent.clientInitials,
        contentCopy: isEmpty(socialContent.contentCopy && socialContent.contentCopy)
          ? ''
          : socialContent.contentCopy,
        contentTwitterCopy: isEmpty(socialContent.contentTwitterCopy && socialContent.contentTwitterCopy)
          ? ''
          : socialContent.contentTwitterCopy,
        contentInstagramCopy: isEmpty(
          socialContent.contentInstagramCopy && socialContent.contentInstagramCopy
        )
          ? ''
          : socialContent.contentInstagramCopy,
        contentLinkedInCopy: isEmpty(
          socialContent.contentLinkedInCopy && socialContent.contentLinkedInCopy
        )
          ? ''
          : socialContent.contentLinkedInCopy,
        imgLink: isEmpty(socialContent.imgLink && socialContent.imgLink) ? '' : socialContent.imgLink,
        imgLinkInstagram: isEmpty(socialContent.imgLinkInstagram && socialContent.imgLinkInstagram)
          ? ''
          : socialContent.imgLinkInstagram,
        dateGoingLive: isEmpty(
          moment(socialContent.dateGoingLive) && moment(socialContent.dateGoingLive)
        )
          ? ''
          : moment(socialContent.dateGoingLive)
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
    });
  };

  handleClientSelect = e => {
    e.preventDefault();
  };

  handleSubmit = e => {
    e.preventDefault();

    const socialRenderContentData = {
      clientName: this.state.clientName,
      clientInitials: this.state.clientInitials,
      contentCopy: this.state.contentCopy,
      contentTwitterCopy: this.state.contentTwitterCopy,
      contentInstagramCopy: this.state.contentInstagramCopy,
      contentLinkedInCopy: this.state.contentLinkedInCopy,
      imgLink: this.state.imgLink,
      imgLinkInstagram: this.state.imgLinkInstagram,
      dateGoingLive: moment(this.state.dateGoingLive).format()
    };
    this.props.updateClientContent(
      this.props.match.params.id,
      socialRenderContentData,
      this.props.history
    );
  };

  render() {
    const fb = this.state.contentCopy ? this.state.contentCopy : false;
    const tw = this.state.contentTwitterCopy ? this.state.contentTwitterCopy : false;
    const ig = this.state.contentInstagramCopy ? this.state.contentInstagramCopy : false;
    const ln = this.state.contentLinkedInCopy ? this.state.contentLinkedInCopy : false;

    return (
      <div id="social-render">
        <section className="container-fluid">
          <div className="row">
            <div id="left-panel" className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <div
                  className="input-group my-3 wow animated fadeInLeft datePickerDiv"
                  data-wow-duration="1.5s"
                >
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">
                      <i className="fa fa-clock-o text-primary pl-0 " aria-hidden="true" />
                      Update date
                    </span>
                  </div>
                  <DateTimePicker
                    className="form-control"
                    value={this.state.dateGoingLive}
                    inputProps={{ placeholder: 'Pick a date' }}
                    onChange={dateGoingLive => this.setState({ dateGoingLive })}
                  />
                </div>
                <InputGroup
                  duration="1.5s"
                  animation="fadeInLeft"
                  label={'Dropbox Image Share Link'}
                  name={'imgLink'}
                  icon={'dropbox'}
                  onChange={this.handleChange}
                  value={this.state.imgLink}
                  placeholder="Img link or Dropbox share link here"
                />
                <InputGroup
                  duration="1.5s"
                  delay=".1s"
                  animation="fadeInLeft"
                  label={'Instagram Share Link'}
                  name={'imgLinkInstagram'}
                  icon={'instagram'}
                  onChange={this.handleChange}
                  value={this.state.imgLinkInstagram}
                  placeholder="Instagram img link or Dropbox share link here"
                />
                <div
                  className="input-group my-3 wow animated fadeInLeft selectClient"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="input-group-prepend">
                    <span className="input-group-text">Client Name and Initials</span>
                  </div>
                  <input
                    name="clientName"
                    onChange={this.handleClientSelect}
                    value={this.state.clientName}
                    className="form-control"
                  />
                  <input
                    name="clientInitials"
                    onChange={this.handleClientSelect}
                    value={this.state.clientInitials}
                    className="form-control"
                  />
                </div>
                <TextArea
                  duration="1.5s"
                  delay=".3s"
                  animation="fadeInLeft"
                  name="contentCopy"
                  value={this.state.contentCopy}
                  onChange={this.handleChange}
                />
                <TextArea
                  duration="1.5s"
                  delay=".4s"
                  animation="fadeInLeft"
                  name="contentInstagramCopy"
                  channel="Instagram"
                  value={this.state.contentInstagramCopy}
                  onChange={this.handleChange}
                />
                <TextArea
                  duration="1.5s"
                  delay=".5s"
                  animation="fadeInLeft"
                  name="contentTwitterCopy"
                  channel="Twitter"
                  value={this.state.contentTwitterCopy}
                  onChange={this.handleChange}
                />
                <TextArea
                  duration="1.5s"
                  delay=".6s"
                  animation="fadeInLeft"
                  name="contentLinkedInCopy"
                  channel="Linkedin"
                  value={this.state.contentLinkedInCopy}
                  onChange={this.handleChange}
                />
                <button
                  className="btn btn-lg btn-outline-primary btn-block mt-5 w-100 mx-auto wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay=".8s"
                  type="submit"
                >
                  Update and Go to Content Calendar
                </button>
              </form>
            </div>

            <div id="right-panel" className="col-sm-6">
              <div className="accordion" id="accordionParent">
                <AccordianCards
                  hidOrShow={fb ? '' : 'hide'}
                  expandCollapse={'show'}
                  target={'facebookDesktop'}
                  cardName={'Facebook Desktop'}
                  componentName={
                    <FacebookDesktop
                      className="mb-5"
                      clientInitials={this.state.clientInitials}
                      clientName={this.state.clientName}
                      contentCopy={this.state.contentCopy}
                      imgLink={this.state.imgLink}
                      date={
                        this.state.dateGoingLive
                          ? moment(this.state.dateGoingLive).format('MMM Do')
                          : 'Pick a date'
                      }
                    />
                  }
                />
                <AccordianCards
                  hidOrShow={fb ? '' : 'hide'}
                  target={'facebookMobile'}
                  cardName={'Facebook Mobile'}
                  componentName={
                    <FacebookMobile
                      clientInitials={this.state.clientInitials}
                      clientName={this.state.clientName}
                      contentCopy={this.state.contentCopy}
                      imgLink={this.state.imgLink}
                      date={
                        this.state.dateGoingLive
                          ? moment(this.state.dateGoingLive).format('MMM Do')
                          : 'Pick a date'
                      }
                    />
                  }
                />
                <AccordianCards
                  hidOrShow={ig ? '' : 'hide'}
                  target={'instagram'}
                  cardName={'Instagram'}
                  componentName={
                    <Instagram
                      clientInitials={this.state.clientInitials}
                      clientName={this.state.clientName}
                      contentCopy={this.state.contentInstagramCopy}
                      imgLink={
                        this.state.imgLinkInstagram ? this.state.imgLinkInstagram : this.state.imgLink
                      }
                    />
                  }
                />
                <AccordianCards
                  hidOrShow={tw ? '' : 'hide'}
                  target={'twitter'}
                  cardName={'Twitter'}
                  componentName={
                    <TwitterDesktop
                      className="mb-5"
                      clientInitials={this.state.clientInitials}
                      clientName={this.state.clientName}
                      contentCopy={this.state.contentTwitterCopy}
                      imgLink={this.state.imgLink}
                      twtHandle={this.state.clientName.replace(/ /g, '')}
                    />
                  }
                />
                <AccordianCards
                  hidOrShow={ln ? '' : 'hide'}
                  target={'linkedin'}
                  cardName={'Linkedin'}
                  componentName={
                    <LinkedIn
                      className="mb-5"
                      clientInitials={this.state.clientInitials}
                      clientName={this.state.clientName}
                      contentCopy={this.state.contentLinkedInCopy}
                      imgLink={this.state.imgLink}
                    />
                  }
                />
              </div>
            </div>
          </div>
          {/* Row ^^ */}
        </section>
      </div>
    );
  }
}

EditSocialRenderComponent.propTypes = {
  socialRenderContent: PropTypes.object,
  clients: PropTypes.object.isRequired,
  updateClientContent: PropTypes.func.isRequired,
  getContentbyClient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  socialRenderContent: state.socialRenderContent,
  clients: state.clients
});

export default connect(
  mapStateToProps,
  { updateClientContent, getContentbyClient }
)(EditSocialRenderComponent);
