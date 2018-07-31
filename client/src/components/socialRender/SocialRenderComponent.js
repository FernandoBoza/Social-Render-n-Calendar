import React, { Component } from 'react';
import FacebookDesktop from './Facebook/FacebookDesktop';
import FacebookMobile from './Facebook/FacebookMobile';
import Instagram from './Instagram/Instagram';
import TwitterDesktop from './Twitter/TwitterDesktop';
import '../../styles/SocialRender.css';

export default class SocialRenderComponent extends Component {
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
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-default">
                    Instagram Share Link
                    <i className="fa fa-instagram text-primary" aria-hidden="true" />
                  </span>
                </div>
                <input type="text" className="form-control" onChange={this.handleInstagramImgChange} value={this.state.imgLinkInstagram} />
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
              <div className="accordion" id="accordionExample">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                      <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne">
                        Facebook Desktop
                      </button>
                    </h5>
                  </div>
                  <div id="collapseOne" className="collapse" data-parent="#accordionExample">
                    <div className="card-body">
                      <FacebookDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingTwo">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo">
                        Facebook Mobile
                      </button>
                    </h5>
                  </div>
                  <div id="collapseTwo" className="collapse" data-parent="#accordionExample">
                    <div className="card-body">
                      <FacebookMobile clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree">
                        Instagram
                      </button>
                    </h5>
                  </div>
                  <div id="collapseThree" className="collapse" data-parent="#accordionExample">
                    <div className="card-body">
                      <Instagram clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLinkInstagram ? this.state.imgLinkInstagram : this.state.imgLink} />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingFour">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour">
                        Twitter Desktop
                      </button>
                    </h5>
                  </div>
                  <div id="collapseFour" className="collapse" data-parent="#accordionExample">
                    <div className="card-body">
                      <TwitterDesktop className="mb-5" clientInitials={this.state.clientInitials} clientName={this.state.clientName} contentCopy={this.state.contentCopy} imgLink={this.state.imgLink} />
                    </div>
                  </div>
                </div>
                {/* Accordian  */}
              </div>
              {/* Right Panel */}
            </div>
            {/* Row */}
          </div>
        </section>
      </div>
    );
  }
}
