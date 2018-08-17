import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSocialRender } from '../../actions/socialRenderActions';
import FacebookDesktop from './Facebook/FacebookDesktop';
import FacebookMobile from './Facebook/FacebookMobile';
import Instagram from './Instagram/Instagram';
import TwitterDesktop from './Twitter/TwitterDesktop';
import AccordianCards from './Layout/AccordianCards';
import InputGroup from './Layout/InputGroup';
import ClientInputGroup from './Layout/ClientInputGroup';
import TextArea from './Layout/TextArea';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class SocialRenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: 'THR33FOLD',
      clientInitials: '3F',
      contentCopy: ``,
      imgLink: 'https://scontent-mia3-1.xx.fbcdn.net/v/t39.2147-6/p540x282/37128188_194335607927365_3856798091126505472_n.jpg?_nc_cat=0&oh=f82e5c9685709d72eecb2c3893d915ad&oe=5BFADBCB',
      imgLinkInstagram: 'http://bit.ly/2MuFO9M',
      dateGoingLive: null,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const socialRenderContent = {
      clientName: this.state.clientName,
      clientInitials: this.state.clientInitials,
      contentCopy: this.state.contentCopy,
      imgLink: this.state.imgLink,
      imgLinkInstagram: this.state.imgLinkInstagram,
      dateGoingLive: moment(this.state.dateGoingLive).format()
    };
    console.log(socialRenderContent);
    this.props.createSocialRender(socialRenderContent, this.props.history);
  };

  render() {
    return (
      <div id="social-render">
        <section className="container-fluid">
          <div className="row">
            <div id="left-panel" className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <InputGroup label={'Dropbox Image Share Link'} name={'imgLink'} icon={'dropbox'} onChange={this.handleChange} value={this.state.imgLink} placeholder="Img link or Dropbox share link here" />
                <InputGroup label={'Instagram Share Link'} name={'imgLinkInstagram'} icon={'instagram'} onChange={this.handleChange} value={this.state.imgLinkInstagram} placeholder="Instagram img link or Dropbox share link here" />
                <ClientInputGroup onChange={this.handleChange} value={this.state.clientName} value2={this.state.clientInitials} placeholder="Client Name" placeholder2="Client Initials" />
                <TextArea value={this.state.contentCopy} onChange={this.handleChange} />
                <SingleDatePicker
                  id={moment(this.state.dateGoingLive).format('L')}
                  date={this.state.dateGoingLive}
                  hideKeyboardShortcutsPanel={true}
                  // showDefaultInputIcon={true}
                  block={true}
                  focused={this.state.focused}
                  onDateChange={dateGoingLive => this.setState({ dateGoingLive })}
                  onFocusChange={({ focused }) => this.setState({ focused })}
                />
                <button className="btn btn-lg btn-outline-primary btn-block mt-5 w-100 mx-auto" type="submit">
                  Add To Content Calendar
                </button>
              </form>
            </div>

            <div id="right-panel" className="col-sm-6">
              <div className="accordion" id="accordionParent">
                <AccordianCards expandCollapse={'show'} target={'facebookDesktop'} cardName={'Facebook Desktop'} componentName={<FacebookDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={this.state.dateGoingLive ? moment(this.state.dateGoingLive).format('MMM Do') : 'Pick a date'} />} />
                <AccordianCards target={'facebookMobile'} cardName={'Facebook Mobile'} componentName={<FacebookMobile clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={this.state.dateGoingLive ? moment(this.state.dateGoingLive).format('MMM Do') : 'Pick a date'} />} />
                <AccordianCards target={'instagram'} cardName={'Instagram'} componentName={<Instagram clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLinkInstagram ? this.state.imgLinkInstagram : this.state.imgLink} />} />
                <AccordianCards target={'twitter'} cardName={'Twitter Desktop'} componentName={<TwitterDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} twtHandle={this.state.clientName.replace(/ /g, '')} />} />
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
  createSocialRender: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  socialRenderContent: state.socialRenderContent,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createSocialRender }
)(withRouter(SocialRenderComponent));
