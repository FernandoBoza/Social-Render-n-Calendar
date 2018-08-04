import React, { Component } from 'react';
import FacebookDesktop from './Facebook/FacebookDesktop';
import FacebookMobile from './Facebook/FacebookMobile';
import Instagram from './Instagram/Instagram';
import TwitterDesktop from './Twitter/TwitterDesktop';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllClients } from '../../actions/clientActions';
import Spinner from '../common/Spinner';
import AccordianCards from './Layout/AccordianCards';
import InputGroup from './Layout/InputGroup';
import ClientInputGroup from './Layout/ClientInputGroup';
import TextArea from './Layout/TextArea';
import '../../styles/SocialRender.css';

class SocialRenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: 'THR33FOLD',
      clientInitials: '3F',
      imgLink: 'https://dl.dropboxusercontent.com/s/mmi9gj5y21vhnar/BB_August_BaseContentFull_Ceramic_%232.jpg?dl=0',
      imgLinkInstagram: 'https://dl.dropboxusercontent.com/s/6cbl8am2p4z379q/BB_August_BaseContentFull_Ceramic_%232_IG.jpg?dl=0',
      contentCopy: `The Adrienne Arsht Center is looking for a new social media agency and we are auditioning! Should the ArshtCenter & THR33FOLD dance the social tango? Help us upstage the competition by tagging the @arshtcenter & commenting #BreakALeg3F on this post.`
    };

    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleCopyChange = this.handleCopyChange.bind(this);
    this.handleClient = this.handleClient.bind(this);
  }

  componentDidMount = e => {
    this.props.getAllClients();
  };

  changeDBLinkToImgLink = link => {
    link = link.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    return link;
  };

  handleClient = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImgChange = e => {
    let dbLink = this.changeDBLinkToImgLink(e.target.value);
    this.setState({
      imgLink: dbLink
    });
  };

  handleInstagramImgChange = e => {
    let dbLink = this.changeDBLinkToImgLink(e.target.value);
    this.setState({
      imgLinkInstagram: dbLink
    });
  };

  handleCopyChange = e => {
    this.setState({
      contentCopy: e.target.value
    });
  };

  render() {
    const { clients, loading } = this.props.clients;
    let clientItems = clients;
    let clientNameArray = [];

    if (clientItems == null || loading) {
      clientItems = <Spinner />;
    } else {
      if (clients.length > 0) {
        clientItems = clients.map(client => clientNameArray.push(client.name));
      } else {
        clientItems = <h4>No Clients Found</h4>;
      }
    }

    return (
      <div id="social-render">
        <section className="container-fluid">
          <div className="row">
            <div id="left-panel" className="col-md-6">
              <InputGroup label={'Dropbox Image Share Link'} icon={'dropbox'} onChange={this.handleImgChange} value={this.state.imgLink} />
              <InputGroup label={'Instagram Share Link'} icon={'instagram'} onChange={this.handleInstagramImgChange} value={this.state.imgLinkInstagram} />
              <ClientInputGroup onChange={this.handleClient} value={this.state.clientName} value2={this.state.clientInitials} />
              <TextArea value={this.state.contentCopy} onChange={this.handleCopyChange} />
            </div>

            <div id="right-panel" className="col-sm-6">
              <div className="accordion" id="accordionParent">
                <AccordianCards target={'facebookDesktop'} cardName={'Facebook Desktop'} componentName={<FacebookDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} />} />
                <AccordianCards target={'facebookMobile'} cardName={'Facebook Mobile'} componentName={<FacebookMobile clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} />} />
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
  getAllClients: PropTypes.func.isRequired,
  clients: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  clients: state.clients
});

export default connect(
  mapStateToProps,
  { getAllClients }
)(SocialRenderComponent);
