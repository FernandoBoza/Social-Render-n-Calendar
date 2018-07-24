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
      // --------------------
      //  Page Followers
      // --------------------
      pgf_fb: true,
      pgf_ig: true,
      pgf_tw: true,
      pgf_ln: true,
      pgf_pt: true,
      // --------------------
      //  Engagement
      // --------------------
      eng_fb: true,
      eng_ig: true,
      eng_tw: true,
      eng_ln: true,
      eng_pt: true,
      // --------------------
      //  Impressions
      // --------------------
      imp_fb: true,
      imp_ig: true,
      imp_tw: true,
      imp_ln: true,
      imp_pt: true,
      // --------------------
      //  Reach
      // --------------------
      reach_fb: true,
      reach_ig: true,
      reach_tw: true,
      reach_ln: true,
      reach_pt: true,
      // --------------------
      //  Web
      // --------------------
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

    const createEditFields_5 = (categoryFullName, categoryName, categoryAbbrv, hideOrShow) => {
      return (
        <div className="w-100">
          <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target={`#${categoryName}`} aria-expanded="true" aria-controls="collapseExample">
            <h4 className="font-weight-light m-0">{categoryFullName}</h4>
          </button>
          <div className={`${hideOrShow} collapse my-3`} id={categoryName}>
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-around mb-4 hide-btn-col">
                <div className="form-check">
                  <input name={`${categoryAbbrv}_fb`} checked={this.state[categoryAbbrv + '_fb']} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id={categoryAbbrv + 'btnCheck1'} />
                  <label className="form-check-label" htmlFor={categoryAbbrv + 'btnCheck1'}>
                    <i className="fa fa-facebook" />
                  </label>
                </div>

                <div className="form-check">
                  <input name={`${categoryAbbrv}_tw`} checked={this.state[categoryAbbrv + '_tw']} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id={categoryAbbrv + 'btnCheck2'} />
                  <label className="form-check-label" htmlFor={categoryAbbrv + 'btnCheck2'}>
                    <i className="fa fa-twitter" />
                  </label>
                </div>

                <div className="form-check">
                  <input name={`${categoryAbbrv}_ig`} checked={this.state[categoryAbbrv + '_ig']} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id={categoryAbbrv + 'btnCheck3'} />
                  <label className="form-check-label" htmlFor={categoryAbbrv + 'btnCheck3'}>
                    <i className="fa fa-instagram" />
                  </label>
                </div>

                <div className="form-check">
                  <input name={`${categoryAbbrv}_ln`} checked={this.state[categoryAbbrv + '_ln']} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id={categoryAbbrv + 'btnCheck4'} />
                  <label className="form-check-label" htmlFor={categoryAbbrv + 'btnCheck4'}>
                    <i className="fa fa-linkedin" />
                  </label>
                </div>

                <div className="form-check">
                  <input name={`${categoryAbbrv}_pt`} checked={this.state[categoryAbbrv + '_pt']} onChange={this.toggleShowBtn} type="checkbox" className="form-check-input" id={categoryAbbrv + 'btnCheck5'} />
                  <label className="form-check-label" htmlFor={categoryAbbrv + 'btnCheck5'}>
                    <i className="fa fa-pinterest" />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 current">
                <TextInputField icon="facebook" divClassName={this.state[categoryAbbrv + '_fb'] ? '' : 'hide'} classname={categoryAbbrv + ' fb'} placeholder="Current Facebook Followers" value={isEmpty(clients[categoryName] && clients[categoryName].fb_x) ? '' : clients[categoryName].fb_x.toString()} onChange={this.handleChange} />
                <TextInputField icon="twitter" divClassName={this.state[categoryAbbrv + '_tw'] ? '' : 'hide'} classname={categoryAbbrv + ' tw'} placeholder="Current Twitter Followers" value={isEmpty(clients[categoryName] && clients[categoryName].tw_x) ? '' : clients[categoryName].tw_x.toString()} onChange={this.handleChange} />
                <TextInputField icon="instagram" divClassName={this.state[categoryAbbrv + '_ig'] ? '' : 'hide'} classname={categoryAbbrv + ' ig'} placeholder="Current Instagram Followers" value={isEmpty(clients[categoryName] && clients[categoryName].ig_x) ? '' : clients[categoryName].ig_x.toString()} onChange={this.handleChange} />
                <TextInputField icon="linkedin" divClassName={this.state[categoryAbbrv + '_ln'] ? '' : 'hide'} classname={categoryAbbrv + ' ln'} placeholder="Current LinkedIn Followers" value={isEmpty(clients[categoryName] && clients[categoryName].ln_x) ? '' : clients[categoryName].ln_x.toString()} onChange={this.handleChange} />
                <TextInputField icon="pinterest" divClassName={this.state[categoryAbbrv + '_pt'] ? '' : 'hide'} classname={categoryAbbrv + ' pn'} placeholder="Current Pinterest Followers" value={isEmpty(clients[categoryName] && clients[categoryName].pt_x) ? '' : clients[categoryName].pt_x.toString()} onChange={this.handleChange} />
              </div>
              <div className="col-sm-6 rangeSlider">
                <div className="range-slider">
                  <i
                    className={this.state[categoryAbbrv + '_fb'] ? 'fa fa-facebook' : 'hide'}
                    style={{
                      left: (isEmpty(clients[categoryName] && clients[categoryName].fb_x) ? '' : clients[categoryName].fb_x.toString() / clients[categoryName].fb_y) * 100 + '%'
                    }}
                  />
                  <i
                    className={this.state[categoryAbbrv + '_tw'] ? 'fa fa-twitter' : 'hide'}
                    tabIndex="0"
                    style={{
                      left: (isEmpty(clients[categoryName] && clients[categoryName].tw_x) ? '' : clients[categoryName].tw_x.toString() / clients[categoryName].tw_y) * 100 + '%'
                    }}
                  />
                  <i
                    className={this.state[categoryAbbrv + '_ig'] ? 'fa fa-instagram' : 'hide'}
                    style={{
                      left: (isEmpty(clients[categoryName] && clients[categoryName].ig_x) ? '' : clients[categoryName].ig_x.toString() / clients[categoryName].ig_y) * 100 + '%'
                    }}
                  />
                  <i
                    className={this.state[categoryAbbrv + '_ln'] ? 'fa fa-linkedin' : 'hide'}
                    style={{
                      left: (isEmpty(clients[categoryName] && clients[categoryName].ln_x) ? '' : clients[categoryName].ln_x.toString() / clients[categoryName].ln_y) * 100 + '%'
                    }}
                  />
                  <i
                    className={this.state[categoryAbbrv + '_pt'] ? 'fa fa-pinterest' : 'hide'}
                    style={{
                      left: (isEmpty(clients[categoryName] && clients[categoryName].pt_x) ? '' : clients[categoryName].pt_x.toString() / clients[categoryName].pt_y) * 100 + '%'
                    }}
                  />
                </div>
              </div>
              <div className="col-sm-3 goal">
                <TextInputField icon="facebook" divClassName={this.state[categoryAbbrv + '_fb'] ? '' : 'hide'} classname={categoryAbbrv + ' fb'} placeholder="Goal" value={isEmpty(clients[categoryName] && clients[categoryName].fb_y) ? '' : clients[categoryName].fb_y.toString()} onChange={this.handleChange} />
                <TextInputField icon="twitter" divClassName={this.state[categoryAbbrv + '_tw'] ? '' : 'hide'} classname={categoryAbbrv + ' tw'} placeholder="Goal" value={isEmpty(clients[categoryName] && clients[categoryName].tw_y) ? '' : clients[categoryName].tw_y.toString()} onChange={this.handleChange} />
                <TextInputField icon="instagram" divClassName={this.state[categoryAbbrv + '_ig'] ? '' : 'hide'} classname={categoryAbbrv + ' ig'} placeholder="Goal" value={isEmpty(clients[categoryName] && clients[categoryName].ig_y) ? '' : clients[categoryName].ig_y.toString()} onChange={this.handleChange} />
                <TextInputField icon="linkedin" divClassName={this.state[categoryAbbrv + '_ln'] ? '' : 'hide'} classname={categoryAbbrv + ' ln'} placeholder="Goal" value={isEmpty(clients[categoryName] && clients[categoryName].ln_y) ? '' : clients[categoryName].ln_y.toString()} onChange={this.handleChange} />
                <TextInputField icon="pinterest" divClassName={this.state[categoryAbbrv + '_pt'] ? '' : 'hide'} classname={categoryAbbrv + ' pn'} placeholder="Goal" value={isEmpty(clients[categoryName] && clients[categoryName].pt_y) ? '' : clients[categoryName].pt_y.toString()} onChange={this.handleChange} />
              </div>

              <div className="col-sm-12 before">
                <hr />
                <h6 className="font-weight-light mt-2">Starting {categoryFullName}</h6>
                <ul className="d-flex justify-content-between list-unstyled">
                  <li className={this.state[categoryAbbrv + '_fb'] ? '' : 'hide'}>
                    <TextInputField icon="facebook" classname={categoryAbbrv + ' fb'} placeholder="Starting" value={isEmpty(clients[categoryName] && clients[categoryName].b4_fb) ? '' : clients[categoryName].b4_fb.toString()} onChange={this.handleChange} />
                  </li>
                  <li className={this.state[categoryAbbrv + '_tw'] ? '' : 'hide'}>
                    <TextInputField icon="twitter" classname={categoryAbbrv + ' tw'} placeholder="Starting" value={isEmpty(clients[categoryName] && clients[categoryName].b4_tw) ? '' : clients[categoryName].b4_tw.toString()} onChange={this.handleChange} />
                  </li>
                  <li className={this.state[categoryAbbrv + '_ig'] ? '' : 'hide'}>
                    <TextInputField icon="instagram" classname={categoryAbbrv + ' ig'} placeholder="Starting" value={isEmpty(clients[categoryName] && clients[categoryName].b4_ig) ? '' : clients[categoryName].b4_ig.toString()} onChange={this.handleChange} />
                  </li>
                  <li className={this.state[categoryAbbrv + '_ln'] ? '' : 'hide'}>
                    <TextInputField icon="linkedin" classname={categoryAbbrv + ' ln'} placeholder="Starting" value={isEmpty(clients[categoryName] && clients[categoryName].b4_ln) ? '' : clients[categoryName].b4_ln.toString()} onChange={this.handleChange} />
                  </li>
                  <li className={this.state[categoryAbbrv + '_pt'] ? '' : 'hide'}>
                    <TextInputField icon="pinterest" classname={categoryAbbrv + ' pt'} placeholder="Starting" value={isEmpty(clients[categoryName] && clients[categoryName].b4_pt) ? '' : clients[categoryName].b4_pt.toString()} onChange={this.handleChange} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    };

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
            <div className="row">
              {createEditFields_5('Page Followers', 'pageFollowers', 'pgf', 'show')}
              {createEditFields_5('Impressions', 'impressions', 'imp')}
              {createEditFields_5('Reach', 'reach', 'reach')}
              {createEditFields_5('Engagement', 'engagement', 'eng')}
              {/* <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#reach" aria-expanded="false" aria-controls="collapseExample">
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
              End of Reach */}
              {/* <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#engagement" aria-expanded="false" aria-controls="collapseExample">
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
              End of Engagement */}
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
              {/* End of Site Traffic */}
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
