import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSocialRender } from '../../actions/socialRenderActions';
import { getAllClients } from '../../actions/clientActions';
import FacebookDesktop from './Facebook/FacebookDesktop';
import FacebookMobile from './Facebook/FacebookMobile';
import Instagram from './Instagram/Instagram';
import TwitterDesktop from './Twitter/TwitterDesktop';
import LinkedInDesktop from './LinkedIn/LinkedIn';
import AccordianCards from './Layout/AccordianCards';
import InputGroup from './Layout/InputGroup';
import ClientInputGroup from './Layout/ClientInputGroup';
import TextArea from './Layout/TextArea';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import WOW from 'wowjs';

class SocialRenderComponent extends Component {
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

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  componentDidMount() {
    this.props.getAllClients();
    new WOW.WOW({
      live: false
    }).init();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
    });
  };

  handleClientSelect = e => {
    this.setState({
      clientName: e.label
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const socialRenderContent = {
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
    console.log(socialRenderContent);
    this.props.createSocialRender(socialRenderContent, this.props.history);
  };

  render() {
    // ***************
    // Variables
    // ***************
    const fb = this.state.contentCopy ? this.state.contentCopy : false;
    const tw = this.state.contentTwitterCopy ? this.state.contentTwitterCopy : false;
    const ig = this.state.contentInstagramCopy ? this.state.contentInstagramCopy : false;
    const ln = this.state.contentLinkedInCopy ? this.state.contentLinkedInCopy : false;
    const { clients, loading } = this.props.clients;
    var clientItems;
    let lnFollowers;
    let currentFollower;

    if (clients == null || loading) {
    } else {
      clientItems = clients.map(client => ({
        label: client.name,
        value: client.handle
      }));

      lnFollowers = clients.map(x => ({
        clientName: x.name,
        pageFollower: x.pageFollowers.ln_x
      }));

      lnFollowers.forEach(x => {
        // eslint-disable-next-line
        if (x.clientName == this.state.clientName) {
          currentFollower = x.pageFollower;
        }
      });
    }

    return (
      <div id="social-render">
        <section className="container-fluid">
          <div className="row">
            <div id="left-panel" className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <InputGroup duration="1.5s" animation="fadeInLeft" label={'Dropbox Image Share Link'} name={'imgLink'} icon={'dropbox'} onChange={this.handleChange} value={this.state.imgLink} placeholder="Img link or Dropbox share link here" />
                <InputGroup duration="1.5s" delay=".1s" animation="fadeInLeft" label={'Instagram Share Link'} name={'imgLinkInstagram'} icon={'instagram'} onChange={this.handleChange} value={this.state.imgLinkInstagram} placeholder="Instagram img link or Dropbox share link here" />
                <ClientInputGroup options={clientItems} onChange={this.handleClientSelect} onChange2={this.handleChange} value={this.state.clientName} value2={this.state.clientInitials} placeholder="Choose Client" placeholder2="Client Initials" />
                <TextArea duration="1.5s" delay=".3s" animation="fadeInLeft" name="contentCopy" channel="Facebook" value={this.state.contentCopy} onChange={this.handleChange} />
                <TextArea duration="1.5s" delay=".4s" animation="fadeInLeft" name="contentInstagramCopy" channel="Instagram" value={this.state.contentInstagramCopy} onChange={this.handleChange} />
                <TextArea duration="1.5s" delay=".5s" animation="fadeInLeft" name="contentTwitterCopy" channel="Twitter" value={this.state.contentTwitterCopy} onChange={this.handleChange} />
                <TextArea duration="1.5s" delay=".6s" animation="fadeInLeft" name="contentLinkedInCopy" channel="LinkedIn" value={this.state.contentLinkedInCopy} onChange={this.handleChange} />
                <div className="wow animated fadeInLeft datePickerDiv" data-wow-duration="1.5s" data-wow-delay=".7s">
                  <SingleDatePicker date={this.state.dateGoingLive} hideKeyboardShortcutsPanel={true} block={true} focused={this.state.focused} onDateChange={dateGoingLive => this.setState({ dateGoingLive })} onFocusChange={({ focused }) => this.setState({ focused })} />
                </div>
                <button className="btn btn-lg btn-outline-primary btn-block mt-5 w-100 mx-auto wow animated fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".8s" type="submit">
                  Add To Content Calendar
                </button>
              </form>
            </div>

            <div id="right-panel" className="col-sm-6">
              <div className="accordion" id="accordionParent">
                <AccordianCards hidOrShow={fb ? '' : 'hide'} expandCollapse={fb ? 'show' : ''} target={'facebookDesktop'} cardName={'Facebook Desktop'} componentName={<FacebookDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={this.state.dateGoingLive ? moment(this.state.dateGoingLive).format('MMM Do') : 'Pick a date'} />} />
                <AccordianCards hidOrShow={fb ? '' : 'hide'} expandCollapse={fb ? 'show' : ''} target={'facebookMobile'} cardName={'Facebook Mobile'} componentName={<FacebookMobile clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={this.state.dateGoingLive ? moment(this.state.dateGoingLive).format('MMM Do') : 'Pick a date'} />} />
                <AccordianCards hidOrShow={ig ? '' : 'hide'} expandCollapse={ig ? 'show' : ''} target={'instagram'} cardName={'Instagram'} componentName={<Instagram clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentInstagramCopy} imgLink={this.state.imgLinkInstagram ? this.state.imgLinkInstagram : this.state.imgLink} />} />
                <AccordianCards hidOrShow={tw ? '' : 'hide'} expandCollapse={tw ? 'show' : ''} target={'twitter'} cardName={'Twitter'} componentName={<TwitterDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentTwitterCopy} imgLink={this.state.imgLink} twtHandle={this.state.clientName.replace(/ /g, '')} />} />
                <AccordianCards hidOrShow={ln ? '' : 'hide'} expandCollapse={ln ? 'show' : ''} target={'linkedin'} cardName={'Linkedin'} componentName={<LinkedInDesktop lnFollowers={currentFollower} className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentLinkedInCopy} imgLink={this.state.imgLink} />} />
              </div>
            </div>
          </div>
          {/* Row ^^ */}
        </section>
      </div>
    );
  }
}

SocialRenderComponent.propTypes = {
  socialRenderContent: PropTypes.object,
  clients: PropTypes.object.isRequired,
  createSocialRender: PropTypes.func.isRequired,
  getAllClients: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  socialRenderContent: state.socialRenderContent,
  clients: state.clients,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createSocialRender, getAllClients }
)(withRouter(SocialRenderComponent));
