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
import AccordianCards from './Layout/AccordianCards';
import InputGroup from './Layout/InputGroup';
import ClientInputGroup from './Layout/ClientInputGroup';
import TextArea from './Layout/TextArea';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Spinner from '../common/Spinner';

class SocialRenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: 'THR33FOLD',
      clientInitials: '3F',
      contentCopy: `Happy National Ice Cream Day! 🍦The sun’s out, and pastels are in. We’re melting over this hot #MillennialPink, especially when it’s color blocked with #Cerulean blue & #Butterscotch yellow. Check out all the bright content our Ad team is dishing out!`,
      contentTwitterCopy: `Happy National Ice Cream Day! 🍦The sun’s out, and pastels are in. We’re melting over this hot #MillennialPink, especially when it’s color blocked with #Cerulean blue & #Butterscotch yellow. Check out all the bright content our Ad team is dishing out! http://bit.ly/2mi5NTk `,
      contentInstagramCopy: `Happy National Ice Cream Day! 🍦 The sun’s out, and pastels are in. We’re melting over this hot #MillennialPink, especially when it’s color blocked with #Cerulean blue & #Butterscotch yellow. Check out THR33FOLD’s Pinterest for all the bright content our Ad team is dishing out!
      .
      .
      .
      .
      
      #NationalIceCreamDay #SundayFunday`,
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

  componentDidMount() {
    this.props.getAllClients();
  }

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
      contentTwitterCopy: this.state.contentTwitterCopy,
      contentInstagramCopy: this.state.contentInstagramCopy,
      imgLink: this.state.imgLink,
      imgLinkInstagram: this.state.imgLinkInstagram,
      dateGoingLive: moment(this.state.dateGoingLive).format()
    };
    console.log(socialRenderContent);
    this.props.createSocialRender(socialRenderContent, this.props.history);
  };

  render() {
    const fb = this.state.contentCopy ? this.state.contentCopy : false;
    const tw = this.state.contentTwitterCopy ? this.state.contentTwitterCopy : false;
    const ig = this.state.contentInstagramCopy ? this.state.contentInstagramCopy : false;
    const { clients, loading } = this.props.clients;
    let clientItems;
    if (clients == null || loading) {
      clientItems = <Spinner />;
    } else {
      clientItems = clients.map(client => client.name);
      console.log(clientItems);
    }

    return (
      <div id="social-render">
        <section className="container-fluid">
          <div className="row">
            <div id="left-panel" className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <InputGroup label={'Dropbox Image Share Link'} name={'imgLink'} icon={'dropbox'} onChange={this.handleChange} value={this.state.imgLink} placeholder="Img link or Dropbox share link here" />
                <InputGroup label={'Instagram Share Link'} name={'imgLinkInstagram'} icon={'instagram'} onChange={this.handleChange} value={this.state.imgLinkInstagram} placeholder="Instagram img link or Dropbox share link here" />
                <ClientInputGroup onChange={this.handleChange} value={this.state.clientName} value2={this.state.clientInitials} placeholder="Client Name" placeholder2="Client Initials" />
                <TextArea name="contentCopy" value={this.state.contentCopy} onChange={this.handleChange} />
                <TextArea name="contentInstagramCopy" channel="Instagram" value={this.state.contentInstagramCopy} onChange={this.handleChange} />
                <TextArea name="contentTwitterCopy" channel="Twitter" value={this.state.contentTwitterCopy} onChange={this.handleChange} />
                <SingleDatePicker id={moment(this.state.dateGoingLive).format('L')} date={this.state.dateGoingLive} hideKeyboardShortcutsPanel={true} block={true} focused={this.state.focused} onDateChange={dateGoingLive => this.setState({ dateGoingLive })} onFocusChange={({ focused }) => this.setState({ focused })} />
                <button className="btn btn-lg btn-outline-primary btn-block mt-5 w-100 mx-auto" type="submit">
                  Add To Content Calendar
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
