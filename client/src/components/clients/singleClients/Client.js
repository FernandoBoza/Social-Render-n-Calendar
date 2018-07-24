import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import { getAClient } from '../../../actions/clientActions';
import TextInputField from '../../common/TextInputField';
import isEmpty from '../../../validation/is-empty';

export class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pgf_fb: true,
      pgf_ig: true,
      pgf_tw: true,
      pgf_ln: true,
      pgf_pt: true,
      eng_fb: true,
      eng_ig: true,
      eng_tw: true,
      eng_ln: true,
      eng_pt: true,
      imp_fb: true,
      imp_ig: true,
      imp_tw: true,
      imp_ln: true,
      imp_pt: true,
      reach_fb: true,
      reach_ig: true,
      reach_tw: true,
      reach_ln: true,
      reach_pt: true,
      web: true
    };

    this.toggleShowBtn = this.toggleShowBtn.bind(this);
  }

  componentDidMount = () => {
    if (this.props.match.params.handle) {
      this.props.getAClient(this.props.match.params.handle);
    }
  };

  handleChange = e => {
    alert('Please Login To Make Changes');
  };
  handleSubmit = e => {
    e.preventDefault();
  };

  toggleShowBtn = e => {
    const target = e.target;
    const name = target.name;

    this.setState({ [name]: target.checked });
    console.log(e.target.name + ' : ' + e.target.checked);
  };

  render() {
    const { clients, loading } = this.props.clients;
    const { isAuthenticated } = this.props.auth;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
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
          {isAuthenticated ? authLinks : guestLinks}

          <div className="col-md-12 m-auto mt-5">
            <h1 className="display-4 text-center">
              {clients.name} <span className="lead">{today.toLocaleDateString('en-US', options)}</span>
            </h1>
            <div className="row" />
            <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#pageFollowers" aria-expanded="true" aria-controls="collapseExample">
              <h4 className="font-weight-light m-0">Page Followers</h4>
            </button>
            <div className="collapse show my-3" id="pageFollowers">
              <div className="row">
                <div className="col-sm-12 d-flex justify-content-around mb-4 hide-btn-col">
                  <div className="form-check">
                    <input name="pgf_fb" checked={this.state.pgf_fb} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheck1" />
                    <label className="form-check-label" htmlFor="btnCheck1">
                      <i className="fa fa-facebook" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="pgf_tw" checked={this.state.pgf_tw} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheck2" />
                    <label className="form-check-label" htmlFor="btnCheck2">
                      <i className="fa fa-twitter" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="pgf_ig" checked={this.state.pgf_ig} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheck3" />
                    <label className="form-check-label" htmlFor="btnCheck3">
                      <i className="fa fa-instagram" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="pgf_ln" checked={this.state.pgf_ln} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheck4" />
                    <label className="form-check-label" htmlFor="btnCheck4">
                      <i className="fa fa-linkedin" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="pgf_pt" checked={this.state.pgf_pt} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheck5" />
                    <label className="form-check-label" htmlFor="btnCheck5">
                      <i className="fa fa-pinterest" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 current">
                  <TextInputField icon="facebook" divClassName={this.state.pgf_fb ? '' : 'hide'} classname="pgf fb" placeholder="Current Facebook Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.fb_x) ? '' : clients.pageFollowers.fb_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" divClassName={this.state.pgf_tw ? '' : 'hide'} classname="pgf tw" placeholder="Current Twitter Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.tw_x) ? '' : clients.pageFollowers.tw_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" divClassName={this.state.pgf_ig ? '' : 'hide'} classname="pgf ig" placeholder="Current Instagram Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.ig_x) ? '' : clients.pageFollowers.ig_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" divClassName={this.state.pgf_ln ? '' : 'hide'} classname="pgf ln" placeholder="Current LinkedIn Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.ln_x) ? '' : clients.pageFollowers.ln_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" divClassName={this.state.pgf_pt ? '' : 'hide'} classname="pgf pn" placeholder="Current Pinterest Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.pt_x) ? '' : clients.pageFollowers.pt_x.toString()} onChange={this.handleChange} />
                </div>
                <div className="col-sm-6 rangeSlider">
                  <div className="range-slider">
                    <i
                      className={this.state.pgf_fb ? 'fa fa-facebook' : 'hide'}
                      style={{
                        left: (isEmpty(clients.pageFollowers && clients.pageFollowers.fb_x) ? '' : clients.pageFollowers.fb_x.toString() / clients.pageFollowers.fb_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.pgf_tw ? 'fa fa-twitter' : 'hide'}
                      tabIndex="0"
                      style={{
                        left: (isEmpty(clients.pageFollowers && clients.pageFollowers.tw_x) ? '' : clients.pageFollowers.tw_x.toString() / clients.pageFollowers.tw_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.pgf_ln ? 'fa fa-linkedin' : 'hide'}
                      style={{
                        left: (isEmpty(clients.pageFollowers && clients.pageFollowers.ln_x) ? '' : clients.pageFollowers.ln_x.toString() / clients.pageFollowers.ln_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.pgf_pt ? 'fa fa-pinterest' : 'hide'}
                      style={{
                        left: (isEmpty(clients.pageFollowers && clients.pageFollowers.pt_x) ? '' : clients.pageFollowers.pt_x.toString() / clients.pageFollowers.pt_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.pgf_ig ? 'fa fa-instagram' : 'hide'}
                      style={{
                        left: (isEmpty(clients.pageFollowers && clients.pageFollowers.ig_x) ? '' : clients.pageFollowers.ig_x.toString() / clients.pageFollowers.ig_y) * 100 + '%'
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-3 goal">
                  <TextInputField icon="facebook" divClassName={this.state.pgf_fb ? '' : 'hide'} classname="pgf fb" placeholder="Goal Facebook Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.fb_y) ? '' : clients.pageFollowers.fb_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" divClassName={this.state.pgf_tw ? '' : 'hide'} classname="pgf tw" placeholder="Goal Twitter Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.tw_y) ? '' : clients.pageFollowers.tw_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" divClassName={this.state.pgf_ig ? '' : 'hide'} classname="pgf ig" placeholder="Goal Instagram Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.ig_y) ? '' : clients.pageFollowers.ig_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" divClassName={this.state.pgf_ln ? '' : 'hide'} classname="pgf ln" placeholder="Goal LinkedIn Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.ln_y) ? '' : clients.pageFollowers.ln_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" divClassName={this.state.pgf_pt ? '' : 'hide'} classname="pgf pn" placeholder="Goal Pinterest Followers" value={isEmpty(clients.pageFollowers && clients.pageFollowers.pt_y) ? '' : clients.pageFollowers.pt_y.toString()} onChange={this.handleChange} />
                </div>

                <div className="col-sm-12 before">
                  <hr />
                  <h6 className="font-weight-light mt-2">Starting Page Followers</h6>
                  <ul className="d-flex justify-content-between list-unstyled">
                    <li className={this.state.pgf_fb ? '' : 'hide'}>
                      <TextInputField icon="facebook" classname="pgf fb" placeholder="Starting" value={isEmpty(clients.pageFollowers && clients.pageFollowers.b4_fb) ? '' : clients.pageFollowers.b4_fb.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.pgf_tw ? '' : 'hide'}>
                      <TextInputField icon="twitter" classname="pgf tw" placeholder="Starting" value={isEmpty(clients.pageFollowers && clients.pageFollowers.b4_tw) ? '' : clients.pageFollowers.b4_tw.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.pgf_ig ? '' : 'hide'}>
                      <TextInputField icon="instagram" classname="pgf ig" placeholder="Starting" value={isEmpty(clients.pageFollowers && clients.pageFollowers.b4_ig) ? '' : clients.pageFollowers.b4_ig.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.pgf_ln ? '' : 'hide'}>
                      <TextInputField icon="linkedin" classname="pgf ln" placeholder="Starting" value={isEmpty(clients.pageFollowers && clients.pageFollowers.b4_ln) ? '' : clients.pageFollowers.b4_ln.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.pgf_pt ? '' : 'hide'}>
                      <TextInputField icon="pinterest" classname="pgf pn" placeholder="Starting" value={isEmpty(clients.pageFollowers && clients.pageFollowers.b4_pt) ? '' : clients.pageFollowers.b4_pt.toString()} onChange={this.handleChange} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End of Page Followers*/}
            <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#impressions" aria-expanded="false" aria-controls="collapseExample">
              <h4 className="font-weight-light m-0">Impressions</h4>
            </button>
            <div className="collapse my-3" id="impressions">
              <div className="row">
                <div className="col-sm-12 d-flex justify-content-around mb-4 hide-btn-col">
                  <div className="form-check">
                    <input name="imp_fb" checked={this.state.imp_fb} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckImpFb" />
                    <label className="form-check-label" htmlFor="btnCheckImpFb">
                      <i className="fa fa-facebook" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="imp_tw" checked={this.state.imp_tw} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckImp2" />
                    <label className="form-check-label" htmlFor="btnCheckImp2">
                      <i className="fa fa-twitter" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="imp_ig" checked={this.state.imp_ig} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckImp3" />
                    <label className="form-check-label" htmlFor="btnCheckImp3">
                      <i className="fa fa-instagram" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="imp_ln" checked={this.state.imp_ln} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckImp4" />
                    <label className="form-check-label" htmlFor="btnCheckImp4">
                      <i className="fa fa-linkedin" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="imp_pt" checked={this.state.imp_pt} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckImp5" />
                    <label className="form-check-label" htmlFor="btnCheckImp5">
                      <i className="fa fa-pinterest" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 current">
                  <TextInputField icon="facebook" divClassName={this.state.imp_fb ? '' : 'hide'} classname="imp fb" placeholder="Current Facebook Impressions" value={isEmpty(clients.impressions && clients.impressions.fb_x) ? '' : clients.impressions.fb_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" divClassName={this.state.imp_tw ? '' : 'hide'} classname="imp tw" placeholder="Current Twitter Impressions" value={isEmpty(clients.impressions && clients.impressions.tw_x) ? '' : clients.impressions.tw_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" divClassName={this.state.imp_ig ? '' : 'hide'} classname="imp ig" placeholder="Current Instagram Impressions" value={isEmpty(clients.impressions && clients.impressions.ig_x) ? '' : clients.impressions.ig_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" divClassName={this.state.imp_ln ? '' : 'hide'} classname="imp ln" placeholder="Current LinkedIn Impressions" value={isEmpty(clients.impressions && clients.impressions.ln_x) ? '' : clients.impressions.ln_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" divClassName={this.state.imp_pt ? '' : 'hide'} classname="imp pn" placeholder="Current Pinterest Impressions" value={isEmpty(clients.impressions && clients.impressions.pt_x) ? '' : clients.impressions.pt_x.toString()} onChange={this.handleChange} />
                </div>
                <div className="col-sm-6 rangeSlider">
                  <div className="range-slider">
                    <i
                      className={this.state.imp_fb ? 'fa fa-facebook' : 'hide'}
                      style={{
                        left: (isEmpty(clients.impressions && clients.impressions.fb_x) ? '' : clients.impressions.fb_x.toString() / clients.impressions.fb_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.imp_tw ? 'fa fa-twitter' : 'hide'}
                      style={{
                        left: (isEmpty(clients.impressions && clients.impressions.tw_x) ? '' : clients.impressions.tw_x.toString() / clients.impressions.tw_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.imp_ln ? 'fa fa-linkedin' : 'hide'}
                      style={{
                        left: (isEmpty(clients.impressions && clients.impressions.ln_x) ? '' : clients.impressions.ln_x.toString() / clients.impressions.ln_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.imp_pt ? 'fa fa-pinterest' : 'hide'}
                      style={{
                        left: (isEmpty(clients.impressions && clients.impressions.pt_x) ? '' : clients.impressions.pt_x.toString() / clients.impressions.pt_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.imp_ig ? 'fa fa-instagram' : 'hide'}
                      style={{
                        left: (isEmpty(clients.impressions && clients.impressions.ig_x) ? '' : clients.impressions.ig_x.toString() / clients.impressions.ig_y) * 100 + '%'
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-3 goal">
                  <TextInputField icon="facebook" divClassName={this.state.imp_fb ? '' : 'hide'} classname="imp fb" placeholder="Goal Facebook Impressions" value={isEmpty(clients.impressions && clients.impressions.fb_y) ? '' : clients.impressions.fb_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" divClassName={this.state.imp_tw ? '' : 'hide'} classname="imp tw" placeholder="Goal Twitter Impressions" value={isEmpty(clients.impressions && clients.impressions.tw_y) ? '' : clients.impressions.tw_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" divClassName={this.state.imp_ig ? '' : 'hide'} classname="imp ig" placeholder="Goal Instagram Impressions" value={isEmpty(clients.impressions && clients.impressions.ig_y) ? '' : clients.impressions.ig_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" divClassName={this.state.imp_ln ? '' : 'hide'} classname="imp ln" placeholder="Goal LinkedIn Impressions" value={isEmpty(clients.impressions && clients.impressions.ln_y) ? '' : clients.impressions.ln_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" divClassName={this.state.imp_pt ? '' : 'hide'} classname="imp pn" placeholder="Goal Pinterest Impressions" value={isEmpty(clients.impressions && clients.impressions.pt_y) ? '' : clients.impressions.pt_y.toString()} onChange={this.handleChange} />
                </div>

                <div className="col-sm-12 before">
                  <hr />
                  <h6 className="font-weight-light mt-2">Starting Impressions</h6>
                  <ul className="d-flex justify-content-between list-unstyled">
                    <li className={this.state.imp_fb ? '' : 'hide'}>
                      <TextInputField icon="facebook" classname="eng fb" placeholder="Starting" value={isEmpty(clients.impressions && clients.impressions.b4_fb) ? '' : clients.impressions.b4_fb.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.imp_tw ? '' : 'hide'}>
                      <TextInputField icon="twitter" classname="eng tw" placeholder="Starting" value={isEmpty(clients.impressions && clients.impressions.b4_tw) ? '' : clients.impressions.b4_tw.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.imp_ig ? '' : 'hide'}>
                      <TextInputField icon="instagram" classname="eng ig" placeholder="Starting" value={isEmpty(clients.impressions && clients.impressions.b4_ig) ? '' : clients.impressions.b4_ig.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.imp_ln ? '' : 'hide'}>
                      <TextInputField icon="linkedin" classname="eng ln" placeholder="Starting" value={isEmpty(clients.impressions && clients.impressions.b4_ln) ? '' : clients.impressions.b4_ln.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.imp_pt ? '' : 'hide'}>
                      <TextInputField icon="pinterest" classname="eng pn" placeholder="Starting" value={isEmpty(clients.impressions && clients.impressions.b4_pt) ? '' : clients.impressions.b4_pt.toString()} onChange={this.handleChange} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End of Impressions*/}
            <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#reach" aria-expanded="false" aria-controls="collapseExample">
              <h4 className="font-weight-light m-0">Reach</h4>
            </button>
            <div className="collapse my-3" id="reach">
              <div className="row">
                <div className="col-sm-12 d-flex justify-content-around mb-4 hide-btn-col">
                  <div className="form-check">
                    <input name="reach_fb" checked={this.state.reach_fb} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckReachFb" />
                    <label className="form-check-label" htmlFor="btnCheckReachFb">
                      <i className="fa fa-facebook" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="reach_tw" checked={this.state.reach_tw} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckReach2" />
                    <label className="form-check-label" htmlFor="btnCheckReach2">
                      <i className="fa fa-twitter" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="reach_ig" checked={this.state.reach_ig} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckReach3" />
                    <label className="form-check-label" htmlFor="btnCheckReach3">
                      <i className="fa fa-instagram" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="reach_ln" checked={this.state.reach_ln} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckReach4" />
                    <label className="form-check-label" htmlFor="btnCheckReach4">
                      <i className="fa fa-linkedin" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="reach_pt" checked={this.state.reach_pt} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckReach5" />
                    <label className="form-check-label" htmlFor="btnCheckReach5">
                      <i className="fa fa-pinterest" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 current">
                  <TextInputField icon="facebook" divClassName={this.state.reach_fb ? '' : 'hide'} classname="reach fb" placeholder="Current Facebook Reach" value={isEmpty(clients.reach && clients.reach.fb_x) ? '' : clients.reach.fb_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" divClassName={this.state.reach_tw ? '' : 'hide'} classname="reach tw" placeholder="Current Twitter Reach" value={isEmpty(clients.reach && clients.reach.tw_x) ? '' : clients.reach.tw_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" divClassName={this.state.reach_ig ? '' : 'hide'} classname="reach ig" placeholder="Current Instagram Reach" value={isEmpty(clients.reach && clients.reach.ig_x) ? '' : clients.reach.ig_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" divClassName={this.state.reach_ln ? '' : 'hide'} classname="reach ln" placeholder="Current LinkedIn Reach" value={isEmpty(clients.reach && clients.reach.ln_x) ? '' : clients.reach.ln_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" divClassName={this.state.reach_pt ? '' : 'hide'} classname="reach pn" placeholder="Current Pinterest Reach" value={isEmpty(clients.reach && clients.reach.pt_x) ? '' : clients.reach.pt_x.toString()} onChange={this.handleChange} />
                </div>
                <div className="col-sm-6 rangeSlider">
                  <div className="range-slider">
                    <i
                      className={this.state.reach_fb ? 'fa fa-facebook' : 'hide'}
                      style={{
                        left: (isEmpty(clients.reach && clients.reach.fb_x) ? '' : clients.reach.fb_x.toString() / clients.reach.fb_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.reach_tw ? 'fa fa-twitter' : 'hide'}
                      style={{
                        left: (isEmpty(clients.reach && clients.reach.tw_x) ? '' : clients.reach.tw_x.toString() / clients.reach.tw_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.reach_ln ? 'fa fa-linkedin' : 'hide'}
                      style={{
                        left: (isEmpty(clients.reach && clients.reach.ln_x) ? '' : clients.reach.ln_x.toString() / clients.reach.ln_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.reach_pt ? 'fa fa-pinterest' : 'hide'}
                      style={{
                        left: (isEmpty(clients.reach && clients.reach.pt_x) ? '' : clients.reach.pt_x.toString() / clients.reach.pt_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.reach_ig ? 'fa fa-instagram' : 'hide'}
                      style={{
                        left: (isEmpty(clients.reach && clients.reach.ig_x) ? '' : clients.reach.ig_x.toString() / clients.reach.ig_y) * 100 + '%'
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-3 goal">
                  <TextInputField icon="facebook" divClassName={this.state.reach_fb ? '' : 'hide'} classname="reach fb" placeholder="Goal Facebook Reach" value={isEmpty(clients.reach && clients.reach.fb_y) ? '' : clients.reach.fb_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" divClassName={this.state.reach_tw ? '' : 'hide'} classname="reach tw" placeholder="Goal Twitter Reach" value={isEmpty(clients.reach && clients.reach.tw_y) ? '' : clients.reach.tw_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" divClassName={this.state.reach_ig ? '' : 'hide'} classname="reach ig" placeholder="Goal Instagram Reach" value={isEmpty(clients.reach && clients.reach.ig_y) ? '' : clients.reach.ig_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" divClassName={this.state.reach_ln ? '' : 'hide'} classname="reach ln" placeholder="Goal LinkedIn Reach" value={isEmpty(clients.reach && clients.reach.ln_y) ? '' : clients.reach.ln_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" divClassName={this.state.reach_pt ? '' : 'hide'} classname="reach pn" placeholder="Goal Pinterest Reach" value={isEmpty(clients.reach && clients.reach.pt_y) ? '' : clients.reach.pt_y.toString()} onChange={this.handleChange} />
                </div>

                <div className="col-sm-12 before">
                  <hr />
                  <h6 className="font-weight-light mt-2">Starting Reach</h6>
                  <ul className="d-flex justify-content-between list-unstyled">
                    <li className={this.state.reach_fb ? '' : 'hide'}>
                      <TextInputField icon="facebook" classname="reach fb" placeholder="Starting" value={isEmpty(clients.reach && clients.reach.b4_fb) ? '' : clients.reach.b4_fb.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.reach_tw ? '' : 'hide'}>
                      <TextInputField icon="twitter" classname="reach tw" placeholder="Starting" value={isEmpty(clients.reach && clients.reach.b4_tw) ? '' : clients.reach.b4_tw.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.reach_ig ? '' : 'hide'}>
                      <TextInputField icon="instagram" classname="reach ig" placeholder="Starting" value={isEmpty(clients.reach && clients.reach.b4_ig) ? '' : clients.reach.b4_ig.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.reach_ln ? '' : 'hide'}>
                      <TextInputField icon="linkedin" classname="reach ln" placeholder="Starting" value={isEmpty(clients.reach && clients.reach.b4_ln) ? '' : clients.reach.b4_ln.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.reach_pt ? '' : 'hide'}>
                      <TextInputField icon="pinterest" classname="reach pn" placeholder="Starting" value={isEmpty(clients.reach && clients.reach.b4_pt) ? '' : clients.reach.b4_pt.toString()} onChange={this.handleChange} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End of Reach*/}
            <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#engagement" aria-expanded="false" aria-controls="collapseExample">
              <h4 className="font-weight-light m-0">Engagement</h4>
            </button>
            <div className="collapse  my-3" id="engagement">
              <div className="row">
                <div className="col-sm-12 d-flex justify-content-around mb-4 hide-btn-col">
                  <div className="form-check">
                    <input name="eng_fb" checked={this.state.eng_fb} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckEngFb" />
                    <label className="form-check-label" htmlFor="btnCheckEngFb">
                      <i className="fa fa-facebook" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="eng_tw" checked={this.state.eng_tw} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckEngTw" />
                    <label className="form-check-label" htmlFor="btnCheckEngTw">
                      <i className="fa fa-twitter" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="eng_ig" checked={this.state.eng_ig} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckEngIg" />
                    <label className="form-check-label" htmlFor="btnCheckEngIg">
                      <i className="fa fa-instagram" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="eng_ln" checked={this.state.eng_ln} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckEngLn" />
                    <label className="form-check-label" htmlFor="btnCheckEngLn">
                      <i className="fa fa-linkedin" />
                    </label>
                  </div>

                  <div className="form-check">
                    <input name="eng_pt" checked={this.state.eng_pt} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id="btnCheckEngPt" />
                    <label className="form-check-label" htmlFor="btnCheckEngPt">
                      <i className="fa fa-pinterest" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 current">
                  <TextInputField icon="facebook" divClassName={this.state.eng_fb ? '' : 'hide'} classname="eng fb" placeholder="Current Facebook Engagement" value={isEmpty(clients.engagement && clients.engagement.fb_x) ? '' : clients.engagement.fb_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" divClassName={this.state.eng_tw ? '' : 'hide'} classname="eng tw" placeholder="Current Twitter Engagement" value={isEmpty(clients.engagement && clients.engagement.tw_x) ? '' : clients.engagement.tw_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" divClassName={this.state.eng_ig ? '' : 'hide'} classname="eng ig" placeholder="Current Instagram Engagement" value={isEmpty(clients.engagement && clients.engagement.ig_x) ? '' : clients.engagement.ig_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" divClassName={this.state.eng_ln ? '' : 'hide'} classname="eng ln" placeholder="Current LinkedIn Engagement" value={isEmpty(clients.engagement && clients.engagement.ln_x) ? '' : clients.engagement.ln_x.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" divClassName={this.state.eng_pt ? '' : 'hide'} classname="eng pn" placeholder="Current Pinterest Engagement" value={isEmpty(clients.engagement && clients.engagement.pt_x) ? '' : clients.engagement.pt_x.toString()} onChange={this.handleChange} />
                </div>
                <div className="col-sm-6 rangeSlider">
                  <div className="range-slider">
                    <i
                      className={this.state.eng_fb ? 'fa fa-facebook' : 'hide'}
                      style={{
                        left: (isEmpty(clients.engagement && clients.engagement.fb_x) ? '' : clients.engagement.fb_x.toString() / clients.engagement.fb_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.eng_tw ? 'fa fa-twitter' : 'hide'}
                      style={{
                        left: (isEmpty(clients.engagement && clients.engagement.tw_x) ? '' : clients.engagement.tw_x.toString() / clients.engagement.tw_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.eng_ln ? 'fa fa-linkedin' : 'hide'}
                      style={{
                        left: (isEmpty(clients.engagement && clients.engagement.ln_x) ? '' : clients.engagement.ln_x.toString() / clients.engagement.ln_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.eng_pt ? 'fa fa-pinterest' : 'hide'}
                      style={{
                        left: (isEmpty(clients.engagement && clients.engagement.pt_x) ? '' : clients.engagement.pt_x.toString() / clients.engagement.pt_y) * 100 + '%'
                      }}
                    />
                    <i
                      className={this.state.eng_ig ? 'fa fa-instagram' : 'hide'}
                      style={{
                        left: (isEmpty(clients.engagement && clients.engagement.ig_x) ? '' : clients.engagement.ig_x.toString() / clients.engagement.ig_y) * 100 + '%'
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-3 goal">
                  <TextInputField icon="facebook" divClassName={this.state.eng_fb ? '' : 'hide'} classname="eng fb" placeholder="Goal Facebook Engagement" value={isEmpty(clients.engagement && clients.engagement.fb_y) ? '' : clients.engagement.fb_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="twitter" divClassName={this.state.eng_tw ? '' : 'hide'} classname="eng tw" placeholder="Goal Twitter Engagement" value={isEmpty(clients.engagement && clients.engagement.tw_y) ? '' : clients.engagement.tw_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="instagram" divClassName={this.state.eng_ig ? '' : 'hide'} classname="eng ig" placeholder="Goal Instagram Engagement" value={isEmpty(clients.engagement && clients.engagement.ig_y) ? '' : clients.engagement.ig_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="linkedin" divClassName={this.state.eng_ln ? '' : 'hide'} classname="eng ln" placeholder="Goal LinkedIn Engagement" value={isEmpty(clients.engagement && clients.engagement.ln_y) ? '' : clients.engagement.ln_y.toString()} onChange={this.handleChange} />
                  <TextInputField icon="pinterest" divClassName={this.state.eng_pt ? '' : 'hide'} classname="eng pn" placeholder="Goal Pinterest Engagement" value={isEmpty(clients.engagement && clients.engagement.pt_y) ? '' : clients.engagement.pt_y.toString()} onChange={this.handleChange} />
                </div>

                <div className="col-sm-12 before">
                  <hr />
                  <h6 className="font-weight-light mt-2">Starting Engagement</h6>
                  <ul className="d-flex justify-content-between list-unstyled">
                    <li className={this.state.eng_fb ? '' : 'hide'}>
                      <TextInputField icon="facebook" classname="eng fb" placeholder="Starting" value={isEmpty(clients.engagement && clients.engagement.b4_fb) ? '' : clients.engagement.b4_fb.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.eng_tw ? '' : 'hide'}>
                      <TextInputField icon="twitter" classname="eng tw" placeholder="Starting" value={isEmpty(clients.engagement && clients.engagement.b4_tw) ? '' : clients.engagement.b4_tw.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.eng_ig ? '' : 'hide'}>
                      <TextInputField icon="instagram" classname="eng ig" placeholder="Starting" value={isEmpty(clients.engagement && clients.engagement.b4_ig) ? '' : clients.engagement.b4_ig.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.eng_ln ? '' : 'hide'}>
                      <TextInputField icon="linkedin" classname="eng ln" placeholder="Starting" value={isEmpty(clients.engagement && clients.engagement.b4_ln) ? '' : clients.engagement.b4_ln.toString()} onChange={this.handleChange} />
                    </li>
                    <li className={this.state.eng_pt ? '' : 'hide'}>
                      <TextInputField icon="pinterest" classname="eng pn" placeholder="Starting" value={isEmpty(clients.engagement && clients.engagement.b4_pt) ? '' : clients.engagement.b4_pt.toString()} onChange={this.handleChange} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End of Engagement*/}
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

                <div className="col-sm-12 before">
                  <hr />
                  <h6 className="font-weight-light mt-2">Starting Site Traffic</h6>
                  <ul className="d-flex justify-content-between list-unstyled">
                    <li>
                      <TextInputField icon="laptop" classname="web_x" placeholder="Starting" value={isEmpty(clients.siteTraffic && clients.siteTraffic.web_b4) ? '' : clients.siteTraffic.web_b4.toString()} onChange={this.handleChange} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End of Site Traffic*/}
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
