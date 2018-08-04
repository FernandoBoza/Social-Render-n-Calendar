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
import '../../styles/SocialRender.css';

class SocialRenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: 'THR33FOLD',
      clientInitials: '3F',
      contentCopy: `The Adrienne Arsht Center is looking for a new social media agency and we are auditioning! Should the ArshtCenter & THR33FOLD dance the social tango? Help us upstage the competition by tagging the @arshtcenter & commenting #BreakALeg3F on this post.`,
      imgLink: 'https://dl.dropboxusercontent.com/s/mmi9gj5y21vhnar/BB_August_BaseContentFull_Ceramic_%232.jpg?dl=0',
      imgLinkInstagram: 'https://dl.dropboxusercontent.com/s/6cbl8am2p4z379q/BB_August_BaseContentFull_Ceramic_%232_IG.jpg?dl=0',
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
    this.setState({ [e.target.name]: e.target.value.replace('www.dropbox.com', 'dl.dropboxusercontent.com') });
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
                <InputGroup label={'Dropbox Image Share Link'} name={'imgLink'} icon={'dropbox'} onChange={this.handleChange} value={this.state.imgLink} />
                <InputGroup label={'Instagram Share Link'} name={'imgLinkInstagram'} icon={'instagram'} onChange={this.handleChange} value={this.state.imgLinkInstagram} />
                <ClientInputGroup onChange={this.handleChange} value={this.state.clientName} value2={this.state.clientInitials} />
                <TextArea value={this.state.contentCopy} onChange={this.handleChange} />
                <SingleDatePicker date={this.state.dateGoingLive} onDateChange={dateGoingLive => this.setState({ dateGoingLive })} focused={this.state.focused} onFocusChange={({ focused }) => this.setState({ focused })} id={moment(this.state.dateGoingLive).format('L')} />
                <button className="btn btn-lg btn-outline-primary btn-block mt-5 w-100 mx-auto" type="submit">
                  Add To Content Calendar
                </button>
              </form>
            </div>

            <div id="right-panel" className="col-sm-6">
              <div className="accordion" id="accordionParent">
                <AccordianCards target={'facebookDesktop'} cardName={'Facebook Desktop'} componentName={<FacebookDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={moment(this.state.dateGoingLive).format('MMM Do')} />} />
                <AccordianCards target={'facebookMobile'} cardName={'Facebook Mobile'} componentName={<FacebookMobile clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} date={moment(this.state.dateGoingLive).format('MMM Do')} />} />
                <AccordianCards target={'instagram'} cardName={'Instagram'} componentName={<Instagram clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLinkInstagram ? this.state.imgLinkInstagram : this.state.imgLink} />} />
                <AccordianCards target={'twitter'} cardName={'Twitter Desktop'} componentName={<TwitterDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} />} />
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
