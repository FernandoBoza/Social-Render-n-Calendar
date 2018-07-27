import React, { Component } from 'react';
import '../../styles/SocialRender.css';

export default class SocialRenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgLink:
        'http://thr33fold.com/wp-content/uploads/2018/04/3F_SITE_INTRO_2.gif',
      contentCopy:
        "Pssst ... Click me to past in the copy ... Some quick example text to build on the card title and make up the bulk of the card's content",
      height: 44
    };

    this.handleImgChange = this.handleImgChange.bind(this);
  }

  componentDidMount = () => {
    let height = document.querySelector('textarea.card-text').clientHeight;
    this.setState({ height });
  };

  changeDBLinkToImgLink = link => {
    link = link.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    return link;
  };

  handleImgChange = e => {
    let dbLink = this.changeDBLinkToImgLink(e.target.value);
    this.setState({
      imgLink: dbLink
    });
  };

  handleCopyChange = e => {
    this.setState({
      contentCopy: e.target.value,
      height: this.height * 2 + 'px'
    });
    console.log(this.state.height);
  };

  render() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const today = new Date();
    var height = {
      height: this.state.height
    };

    return (
      <div id="social-render">
        <section className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h1 className="display-4">Social Form </h1>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Dropbox Image Share Link{' '}
                    <i
                      className="fa fa-dropbox text-primary"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleImgChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="d-inline-block fb-title">
                      <p className="d-inline-block company bg-primary">BB</p>
                      <ul>
                        <li>
                          <h5 className="d-inline-block card-title">
                            Boca Bearings Company
                          </h5>
                        </li>
                        <li>{today.toLocaleDateString('en-US', options)}</li>
                      </ul>
                    </div>

                    <textarea
                      type="text"
                      className="card-text"
                      style={height}
                      value={this.state.contentCopy}
                      onChange={this.handleCopyChange}
                    />

                    <img
                      className="card-img mt-2 mb-4"
                      src={this.state.imgLink}
                      alt="Facebook Style Render"
                    />
                    <a href="" onClick={e => e.preventDefault()}>
                      <i className="fa fa-thumbs-o-up text-primary" />
                      <i className="fa fa-comment-o text-primary" />
                      <i className="fa fa-share  text-primary" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="d-inline-block fb-title">
                      <p className="d-inline-block company bg-primary">BB</p>{' '}
                      <h5 className="d-inline-block card-title ml-2">
                        Boca Bearings Company
                      </h5>
                    </div>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <img
                      className="card-img mt-2 mb-4"
                      src={this.state.imgLink}
                      alt="Facebook Style Render"
                    />
                    <a href="" onClick={e => e.preventDefault()}>
                      <i className="fa fa-thumbs-o-up text-primary" />
                      <i className="fa fa-comment-o text-primary" />
                      <i className="fa fa-share  text-primary" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
