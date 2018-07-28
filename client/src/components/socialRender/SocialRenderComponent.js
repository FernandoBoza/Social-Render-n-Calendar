import React, { Component } from 'react';
import FacebookDesktop from './Facebook/FacebookDesktop';
import FacebookMobile from './Facebook/FacebookMobile';
import Instagram from './Instagram/Instagram';
import '../../styles/SocialRender.css';

export default class SocialRenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: 'THR33FOLD',
      clientInitials: '3F',
      imgLink: 'http://thr33fold.com/wp-content/uploads/2018/04/3F_SITE_INTRO_2.gif',
      contentCopy: `The Adrienne Arsht Center is looking for a new social media agency and we are auditioning! Should the ArshtCenter & THR33FOLD dance the social tango? Help us upstage the competition by tagging the @arshtcenter & commenting #BreakALeg3F on this post.`
    };

    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleCopyChange = this.handleCopyChange.bind(this);
    this.handleClient = this.handleClient.bind(this);
  }

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

  handleCopyChange = e => {
    this.setState({
      contentCopy: e.target.value
    });
  };

  render() {
    return (
      <div id="social-render">
        <section className="container-fluid">
          <div className="row">
            <div id="left-panel" className="col-md-6">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-default">
                    Dropbox Image Share Link
                    <i className="fa fa-dropbox text-primary" aria-hidden="true" />
                  </span>
                </div>
                <input type="text" className="form-control" onChange={this.handleImgChange} value={this.state.imgLink} />
              </div>
              <div className="input-group my-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Client Name and Initials</span>
                </div>
                <input type="text" name="clientName" onChange={this.handleClient} value={this.state.clientName} className="form-control" />
                <input type="text" name="clientInitials" onChange={this.handleClient} value={this.state.clientInitials} className="form-control" />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text px-5">
                    Copy Goes Here
                    <i className="fa fa-pencil-square-o text-primary" aria-hidden="true" />
                  </span>
                </div>
                <textarea className="form-control card-text" aria-label="With textarea" type="text" value={this.state.contentCopy} onChange={this.handleCopyChange} />
              </div>
            </div>

            <div id="right-panel" className="col-sm-6">
              {/* <FacebookDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} />
              <FacebookMobile clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} /> */}
              <Instagram clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} />
            </div>
            {/* Row */}
          </div>
        </section>
      </div>
    );
  }
}
