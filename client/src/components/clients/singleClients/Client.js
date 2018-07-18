import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import { getAClient } from '../../../actions/clientActions';
import TextInputField from '../../common/TextInputField';
import isEmpty from '../../../validation/is-empty';

export class Client extends Component {
  componentDidMount = () => {
    if (this.props.match.params.handle) {
      this.props.getAClient(this.props.match.params.handle);
    }
  };

  handleChange = e => {};
  handleSubmit = e => {
    e.preventDefault();
  };

  sortThroughObj = clients => {
    return clients.pageFollowers;
  };

  render() {
    const { clients, loading } = this.props.clients;
    const { isAuthenticated } = this.props.auth;
    let clientContent;

    const authLinks = (
      <Link to={`${this.props.match.params.handle}/edit-client`} className="btn btn-primary mb-3 fload-left">
        Edit Client
      </Link>
    );

    const guestLinks = (
      <Link to={'/clients/'} className="btn btn-primary mb-3 fload-left">
        Back To Clients
      </Link>
    );

    if (clients === null || loading) {
      clientContent = <Spinner />;
    } else {
      clientContent = (
        <div>
          {/* <Link to="/" className="btn btn-primary mb-3 fload-left">
            Back To Clients
          </Link> */}
          {isAuthenticated ? authLinks : guestLinks}

          <div className="col-md-12 m-auto">
            <h1 className="display-4 text-center">{clients.name}</h1>
            <div className="row" />

            <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#pageFollowers" aria-expanded="true" aria-controls="collapseExample">
              <h4 className="font-weight-light m-0">Page Followers</h4>
            </button>

            <div className="collapse show my-3" id="pageFollowers">
              <div className="row">
                <div className="col-sm-3 current">
                  <TextInputField icon="facebook" name="pgf_fb_x" classname="pgf fb" placeholder="Current Facebook Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.fb_x) ? '' : clients.pageFollowers.fb_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" name="pgf_tw_x" classname="pgf tw" placeholder="Current Twitter Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.tw_x) ? '' : clients.pageFollowers.tw_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" name="pgf_ig_x" classname="pgf ig" placeholder="Current Instagram Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.ig_x) ? '' : clients.pageFollowers.ig_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" name="pgf_ln_x" classname="pgf ln" placeholder="Current LinkedIn Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.ln_x) ? '' : clients.pageFollowers.ln_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" name="pgf_pt_x" classname="pgf pn" placeholder="Current Pinterest Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.pt_x) ? '' : clients.pageFollowers.pt_x.toString()} onChange={this.handleChange} />
                </div>
                <div className="col-sm-6 rangeSlider">
                  <div className="range-slider">
                    <i
                      className="fa fa-facebook"
                      style={{
                        left: (isEmpty(clients.pageFollowers && clients.pageFollowers.fb_x) ? '' : clients.pageFollowers.fb_x.toString() / clients.pageFollowers.fb_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-twitter"
                      style={{
                        left: (isEmpty(clients.pageFollowers && clients.pageFollowers.tw_x) ? '' : clients.pageFollowers.tw_x.toString() / clients.pageFollowers.tw_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-linkedin"
                      style={{
                        left: (isEmpty(clients.pageFollowers && clients.pageFollowers.ln_x) ? '' : clients.pageFollowers.ln_x.toString() / clients.pageFollowers.ln_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-pinterest"
                      style={{
                        left: (isEmpty(clients.pageFollowers && clients.pageFollowers.pt_x) ? '' : clients.pageFollowers.pt_x.toString() / clients.pageFollowers.pt_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-instagram"
                      style={{
                        left: (isEmpty(clients.pageFollowers && clients.pageFollowers.ig_x) ? '' : clients.pageFollowers.ig_x.toString() / clients.pageFollowers.ig_y) * 100 + '%'
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-3 goal">
                  <TextInputField icon="facebook" name="pgf_fb_y" classname="pgf fb" placeholder="Goal Facebook Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.fb_y) ? '' : clients.pageFollowers.fb_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" name="pgf_tw_y" classname="pgf tw" placeholder="Goal Twitter Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.tw_y) ? '' : clients.pageFollowers.tw_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" name="pgf_ig_y" classname="pgf ig" placeholder="Goal Instagram Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.ig_y) ? '' : clients.pageFollowers.ig_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" name="pgf_ln_y" classname="pgf ln" placeholder="Goal LinkedIn Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.ln_y) ? '' : clients.pageFollowers.ln_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" name="pgf_pt_y" classname="pgf pn" placeholder="Goal Pinterest Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.pt_y) ? '' : clients.pageFollowers.pt_y.toString()} onChange={this.handleChange} />
                </div>
              </div>
              {/* End of Page Followers*/}
            </div>

            <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#engagement" aria-expanded="false" aria-controls="collapseExample">
              <h4 className="font-weight-light m-0">Engagement</h4>
            </button>

            <div className="collapse  my-3" id="engagement">
              <div className="row">
                <div className="col-sm-3 current">
                  <TextInputField icon="facebook" name="eng_fb_x" classname="eng fb" placeholder="Current Facebook Engagement" value={isEmpty(clients.engagement && clients.engagement.fb_x) ? '' : clients.engagement.fb_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" name="eng_tw_x" classname="eng tw" placeholder="Current Twitter Engagement" value={isEmpty(clients.engagement && clients.engagement.tw_x) ? '' : clients.engagement.tw_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" name="eng_ig_x" classname="eng ig" placeholder="Current Instagram Engagement" value={isEmpty(clients.engagement && clients.engagement.ig_x) ? '' : clients.engagement.ig_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" name="eng_ln_x" classname="eng ln" placeholder="Current LinkedIn Engagement" value={isEmpty(clients.engagement && clients.engagement.ln_x) ? '' : clients.engagement.ln_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" name="eng_pt_x" classname="eng pn" placeholder="Current Pinterest Engagement" value={isEmpty(clients.engagement && clients.engagement.pt_x) ? '' : clients.engagement.pt_x.toString()} onChange={this.handleChange} />
                </div>
                <div className="col-sm-6 rangeSlider">
                  <div className="range-slider">
                    <i
                      className="fa fa-facebook"
                      style={{
                        left: (isEmpty(clients.engagement && clients.engagement.fb_x) ? '' : clients.engagement.fb_x.toString() / clients.engagement.fb_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-twitter"
                      style={{
                        left: (isEmpty(clients.engagement && clients.engagement.tw_x) ? '' : clients.engagement.tw_x.toString() / clients.engagement.tw_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-linkedin"
                      style={{
                        left: (isEmpty(clients.engagement && clients.engagement.ln_x) ? '' : clients.engagement.ln_x.toString() / clients.engagement.ln_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-pinterest"
                      style={{
                        left: (isEmpty(clients.engagement && clients.engagement.pt_x) ? '' : clients.engagement.pt_x.toString() / clients.engagement.pt_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-instagram"
                      style={{
                        left: (isEmpty(clients.engagement && clients.engagement.ig_x) ? '' : clients.engagement.ig_x.toString() / clients.engagement.ig_y) * 100 + '%'
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-3 goal">
                  <TextInputField icon="facebook" name="eng_fb_y" classname="eng fb" placeholder="Goal Facebook Engagement" value={isEmpty(clients.engagement && clients.engagement.fb_y) ? '' : clients.engagement.fb_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" name="eng_tw_y" classname="eng tw" placeholder="Goal Twitter Engagement" value={isEmpty(clients.engagement && clients.engagement.tw_y) ? '' : clients.engagement.tw_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" name="eng_ig_y" classname="eng ig" placeholder="Goal Instagram Engagement" value={isEmpty(clients.engagement && clients.engagement.ig_y) ? '' : clients.engagement.ig_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" name="eng_ln_y" classname="eng ln" placeholder="Goal LinkedIn Engagement" value={isEmpty(clients.engagement && clients.engagement.ln_y) ? '' : clients.engagement.ln_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" name="eng_pt_y" classname="eng pn" placeholder="Goal Pinterest Engagement" value={isEmpty(clients.engagement && clients.engagement.pt_y) ? '' : clients.engagement.pt_y.toString()} onChange={this.handleChange} />
                </div>
              </div>
            </div>
            {/* End of Engagement*/}

            <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#impressions" aria-expanded="false" aria-controls="collapseExample">
              <h4 className="font-weight-light m-0">Impressions</h4>
            </button>

            <div className="collapse my-3" id="impressions">
              <div className="row">
                <div className="col-sm-3 current">
                  <TextInputField icon="facebook" name="imp_fb_x" classname="imp fb" placeholder="Current Facebook Impressions" value={isEmpty(clients.impressions && clients.impressions.fb_x) ? '' : clients.impressions.fb_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" name="imp_tw_x" classname="imp tw" placeholder="Current Twitter Impressions" value={isEmpty(clients.impressions && clients.impressions.tw_x) ? '' : clients.impressions.tw_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" name="imp_ig_x" classname="imp ig" placeholder="Current Instagram Impressions" value={isEmpty(clients.impressions && clients.impressions.ig_x) ? '' : clients.impressions.ig_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" name="imp_ln_x" classname="imp ln" placeholder="Current LinkedIn Impressions" value={isEmpty(clients.impressions && clients.impressions.ln_x) ? '' : clients.impressions.ln_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" name="imp_pt_x" classname="imp pn" placeholder="Current Pinterest Impressions" value={isEmpty(clients.impressions && clients.impressions.pt_x) ? '' : clients.impressions.pt_x.toString()} onChange={this.handleChange} />
                </div>
                <div className="col-sm-6 rangeSlider">
                  <div className="range-slider">
                    <i
                      className="fa fa-facebook"
                      style={{
                        left: (isEmpty(clients.impressions && clients.impressions.fb_x) ? '' : clients.impressions.fb_x.toString() / clients.impressions.fb_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-twitter"
                      style={{
                        left: (isEmpty(clients.impressions && clients.impressions.tw_x) ? '' : clients.impressions.tw_x.toString() / clients.impressions.tw_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-linkedin"
                      style={{
                        left: (isEmpty(clients.impressions && clients.impressions.ln_x) ? '' : clients.impressions.ln_x.toString() / clients.impressions.ln_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-pinterest"
                      style={{
                        left: (isEmpty(clients.impressions && clients.impressions.pt_x) ? '' : clients.impressions.pt_x.toString() / clients.impressions.pt_y) * 100 + '%'
                      }}
                    />
                    <i
                      className="fa fa-instagram"
                      style={{
                        left: (isEmpty(clients.impressions && clients.impressions.ig_x) ? '' : clients.impressions.ig_x.toString() / clients.impressions.ig_y) * 100 + '%'
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-3 goal">
                  <TextInputField icon="facebook" name="imp_fb_y" classname="imp fb" placeholder="Goal Facebook Impressions" value={isEmpty(clients.impressions && clients.impressions.fb_y) ? '' : clients.impressions.fb_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" name="imp_tw_y" classname="imp tw" placeholder="Goal Twitter Impressions" value={isEmpty(clients.impressions && clients.impressions.tw_y) ? '' : clients.impressions.tw_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" name="imp_ig_y" classname="imp ig" placeholder="Goal Instagram Impressions" value={isEmpty(clients.impressions && clients.impressions.ig_y) ? '' : clients.impressions.ig_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" name="imp_ln_y" classname="imp ln" placeholder="Goal LinkedIn Impressions" value={isEmpty(clients.impressions && clients.impressions.ln_y) ? '' : clients.impressions.ln_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" name="imp_pt_y" classname="imp pn" placeholder="Goal Pinterest Impressions" value={isEmpty(clients.impressions && clients.impressions.pt_y) ? '' : clients.impressions.pt_y.toString()} onChange={this.handleChange} />
                </div>
              </div>
              {/* End of Impressions*/}
            </div>

            <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#site_traffic" aria-expanded="false" aria-controls="collapseExample">
              <h4 className="font-weight-light m-0">Site Traffic</h4>
            </button>

            <div className="collapse my-3" id="site_traffic">
              <div className="row">
                <div className="col-sm-3 current">
                  <TextInputField icon="laptop" name="web_x" classname="web" placeholder="Current Web Traffic" value={isEmpty(clients.siteTraffic && clients.siteTraffic.x) ? '' : clients.siteTraffic.x.toString()} onChange={this.handleChange} />
                </div>
                <div className="col-sm-6 rangeSlider">
                  <div className="range-slider client">
                    <i
                      className="fa fa-code"
                      style={{
                        left: (isEmpty(clients.siteTraffic && clients.siteTraffic.x) ? '' : clients.siteTraffic.x.toString() / clients.siteTraffic.y) * 100 + '%'
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-3 goal">
                  <TextInputField icon="laptop" name="web_y" classname="web" placeholder="Goal Web Traffic" value={isEmpty(clients.siteTraffic && clients.siteTraffic.y) ? '' : clients.siteTraffic.y.toString()} onChange={this.handleChange} />
                </div>
              </div>
              {/* End of Site Traffic*/}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="client">
        <section className="container">
          <div className="row">
            <div className="col-md-12 m-auto">{clientContent}</div>
          </div>
        </section>
      </div>
    );
  }
}

Client.propTypes = {
  clients: PropTypes.object.isRequired,
  getAClient: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  clients: state.clients,
  auth: state.auth // Comes from the root reducer
});

export default connect(
  mapStateToProps,
  { getAClient }
)(Client);
