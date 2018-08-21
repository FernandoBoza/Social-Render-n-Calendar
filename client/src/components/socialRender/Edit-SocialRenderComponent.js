import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateClientContent, getContentbyClient } from '../../actions/socialRenderActions';
import FacebookDesktop from './Facebook/FacebookDesktop';
import FacebookMobile from './Facebook/FacebookMobile';
import Instagram from './Instagram/Instagram';
import TwitterDesktop from './Twitter/TwitterDesktop';
import AccordianCards from './Layout/AccordianCards';
import InputGroup from './Layout/InputGroup';
import TextArea from './Layout/TextArea';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
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
      console.log(this.props.match.params.id);
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.socialRenderContent) {
      const socialContent = nextProps.socialRenderContent.socialRenderContent;
      this.setState({
        clientName: isEmpty(socialContent.clientName && socialContent.clientName) ? '' : socialContent.clientName,
        clientInitials: isEmpty(socialContent.clientInitials && socialContent.clientInitials) ? '' : socialContent.clientInitials,
        contentCopy: isEmpty(socialContent.contentCopy && socialContent.contentCopy) ? '' : socialContent.contentCopy,
        contentTwitterCopy: isEmpty(socialContent.contentTwitterCopy && socialContent.contentTwitterCopy) ? '' : socialContent.contentTwitterCopy,
        contentInstagramCopy: isEmpty(socialContent.contentInstagramCopy && socialContent.contentInstagramCopy) ? '' : socialContent.contentInstagramCopy,
        imgLink: isEmpty(socialContent.imgLink && socialContent.imgLink) ? '' : socialContent.imgLink,
        imgLinkInstagram: isEmpty(socialContent.imgLinkInstagram && socialContent.imgLinkInstagram) ? '' : socialContent.imgLinkInstagram
        // dateGoingLive: isEmpty(socialContent.dateGoingLive && socialContent.dateGoingLive) ? '' : socialContent.dateGoingLive
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
      imgLink: this.state.imgLink,
      imgLinkInstagram: this.state.imgLinkInstagram,
      dateGoingLive: moment(this.state.dateGoingLive).format()
    };
    console.log(socialRenderContentData);
    this.props.updateClientContent(this.props.match.params.id, socialRenderContentData, this.props.history);
  };

  render() {
    const fb = this.state.contentCopy ? this.state.contentCopy : false;
    const tw = this.state.contentTwitterCopy ? this.state.contentTwitterCopy : false;
    const ig = this.state.contentInstagramCopy ? this.state.contentInstagramCopy : false;

    // let date = this.state.dateGoingLive;

    return (
      <div id="social-render">
        <section className="container-fluid">
          <div className="row">
            <div id="left-panel" className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <InputGroup label={'Dropbox Image Share Link'} name={'imgLink'} icon={'dropbox'} onChange={this.handleChange} value={this.state.imgLink} placeholder="Img link or Dropbox share link here" />
                <InputGroup label={'Instagram Share Link'} name={'imgLinkInstagram'} icon={'instagram'} onChange={this.handleChange} value={this.state.imgLinkInstagram} placeholder="Instagram img link or Dropbox share link here" />
                <div className="input-group my-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Client Name and Initials</span>
                  </div>
                  {/* <input name="clientName" onChange={this.handleClientSelect} value={this.state.clientName} className="form-control" /> */}
                  <input name="clientInitials" onChange={this.handleClientSelect} value={this.state.clientInitials} className="form-control" />
                </div>
                <TextArea name="contentCopy" value={this.state.contentCopy} onChange={this.handleChange} />
                <TextArea name="contentInstagramCopy" channel="Instagram" value={this.state.contentInstagramCopy} onChange={this.handleChange} />
                <TextArea name="contentTwitterCopy" channel="Twitter" value={this.state.contentTwitterCopy} onChange={this.handleChange} />
                <SingleDatePicker id={moment(this.state.dateGoingLive).format('L')} date={moment()} hideKeyboardShortcutsPanel={true} block={true} focused={this.state.focused} onDateChange={dateGoingLive => this.setState({ dateGoingLive })} onFocusChange={({ focused }) => this.setState({ focused })} />
                <button className="btn btn-lg btn-outline-primary btn-block mt-5 w-100 mx-auto" type="submit">
                  Update and Go to Content Calendar
                </button>
              </form>
            </div>

            <div id="right-panel" className="col-sm-6">
              <div className="accordion" id="accordionParent">
                <AccordianCards hidOrShow={fb ? '' : 'hide'} expandCollapse={'show'} target={'facebookDesktop'} cardName={'Facebook Desktop'} componentName={<FacebookDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={this.state.dateGoingLive ? moment(this.state.dateGoingLive).format('MMM Do') : 'Pick a date'} />} />
                <AccordianCards hidOrShow={fb ? '' : 'hide'} target={'facebookMobile'} cardName={'Facebook Mobile'} componentName={<FacebookMobile clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={this.state.dateGoingLive ? moment(this.state.dateGoingLive).format('MMM Do') : 'Pick a date'} />} />
                <AccordianCards hidOrShow={ig ? '' : 'hide'} target={'instagram'} cardName={'Instagram'} componentName={<Instagram clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentInstagramCopy} imgLink={this.state.imgLinkInstagram ? this.state.imgLinkInstagram : this.state.imgLink} />} />
                <AccordianCards hidOrShow={tw ? '' : 'hide'} target={'twitter'} cardName={'Twitter Desktop'} componentName={<TwitterDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentTwitterCopy} imgLink={this.state.imgLink} twtHandle={this.state.clientName.replace(/ /g, '')} />} />
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
)(withRouter(EditSocialRenderComponent));
