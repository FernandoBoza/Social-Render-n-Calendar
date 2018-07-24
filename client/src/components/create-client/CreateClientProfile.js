import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createClient } from '../../actions/clientActions';
import TextInputField from '../common/TextInputField';

export class CreateClientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      // Page Followers
      pgf_fb_x: '',
      pgf_fb_y: '',
      pgf_ig_x: '',
      pgf_ig_y: '',
      pgf_tw_x: '',
      pgf_tw_y: '',
      pgf_ln_x: '',
      pgf_ln_y: '',
      pgf_pt_x: '',
      pgf_pt_y: '',
      // Engagement
      eng_fb_x: '',
      eng_fb_y: '',
      eng_ig_x: '',
      eng_ig_y: '',
      eng_tw_x: '',
      eng_tw_y: '',
      eng_ln_x: '',
      eng_ln_y: '',
      eng_pt_x: '',
      eng_pt_y: '',
      // Impressions
      imp_fb_x: '',
      imp_fb_y: '',
      imp_ig_x: '',
      imp_ig_y: '',
      imp_tw_x: '',
      imp_tw_y: '',
      imp_ln_x: '',
      imp_ln_y: '',
      imp_pt_x: '',
      imp_pt_y: '',
      // Reach
      reach_fb_x: '',
      reach_fb_y: '',
      reach_ig_x: '',
      reach_ig_y: '',
      reach_tw_x: '',
      reach_tw_y: '',
      reach_ln_x: '',
      reach_ln_y: '',
      reach_pt_x: '',
      reach_pt_y: '',
      // Web Traffic
      web_x: '',
      web_y: '',

      // Before Input
      web_b4: '',
      pgf_b4_fb: '',
      pgf_b4_ig: '',
      pgf_b4_tw: '',
      pgf_b4_ln: '',
      pgf_b4_pt: '',
      eng_b4_fb: '',
      eng_b4_ig: '',
      eng_b4_tw: '',
      eng_b4_ln: '',
      eng_b4_pt: '',
      imp_b4_fb: '',
      imp_b4_ig: '',
      imp_b4_tw: '',
      imp_b4_ln: '',
      imp_b4_pt: '',
      reach_b4_fb: '',
      reach_b4_ig: '',
      reach_b4_tw: '',
      reach_b4_ln: '',
      reach_b4_pt: '',
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
    this.setState({ [e.target.name]: e.target.value });
    console.log([e.target.name] + ' : ' + e.target.value);
  };
  handleSubmit = e => {
    e.preventDefault();

    const clientData = {
      name: this.state.name,
      // Page Followers
      pgf_fb_x: this.state.pgf_fb_x,
      pgf_fb_y: this.state.pgf_fb_y,
      pgf_ig_x: this.state.pgf_ig_x,
      pgf_ig_y: this.state.pgf_ig_y,
      pgf_tw_x: this.state.pgf_tw_x,
      pgf_tw_y: this.state.pgf_tw_y,
      pgf_ln_x: this.state.pgf_ln_x,
      pgf_ln_y: this.state.pgf_ln_y,
      pgf_pt_x: this.state.pgf_pt_x,
      pgf_pt_y: this.state.pgf_pt_y,
      // Engagement
      eng_fb_x: this.state.eng_fb_x,
      eng_fb_y: this.state.eng_fb_y,
      eng_ig_x: this.state.eng_ig_x,
      eng_ig_y: this.state.eng_ig_y,
      eng_tw_x: this.state.eng_tw_x,
      eng_tw_y: this.state.eng_tw_y,
      eng_ln_x: this.state.eng_ln_x,
      eng_ln_y: this.state.eng_ln_y,
      eng_pt_x: this.state.eng_pt_x,
      eng_pt_y: this.state.eng_pt_y,
      // Impressions
      imp_fb_x: this.state.imp_fb_x,
      imp_fb_y: this.state.imp_fb_y,
      imp_ig_x: this.state.imp_ig_x,
      imp_ig_y: this.state.imp_ig_y,
      imp_tw_x: this.state.imp_tw_x,
      imp_tw_y: this.state.imp_tw_y,
      imp_ln_x: this.state.imp_ln_x,
      imp_ln_y: this.state.imp_ln_y,
      imp_pt_x: this.state.imp_pt_x,
      imp_pt_y: this.state.imp_pt_y,
      // Reach
      reach_fb_x: this.state.reach_fb_x,
      reach_fb_y: this.state.reach_fb_y,
      reach_ig_x: this.state.reach_ig_x,
      reach_ig_y: this.state.reach_ig_y,
      reach_tw_x: this.state.reach_tw_x,
      reach_tw_y: this.state.reach_tw_y,
      reach_ln_x: this.state.reach_ln_x,
      reach_ln_y: this.state.reach_ln_y,
      reach_pt_x: this.state.reach_pt_x,
      reach_pt_y: this.state.reach_pt_y,
      // Web
      web_x: this.state.web_x,
      web_y: this.state.web_y,

      // ------------------------------
      // Before Input
      // ------------------------------

      // ------------------------------
      // Before Page Followers
      // ------------------------------
      pgf_b4_fb: this.state.pgf_b4_fb,
      pgf_b4_ig: this.state.pgf_b4_ig,
      pgf_b4_tw: this.state.pgf_b4_tw,
      pgf_b4_ln: this.state.pgf_b4_ln,
      pgf_b4_pt: this.state.pgf_b4_pt,

      // ------------------------------
      // Before Engagement
      // ------------------------------
      eng_b4_fb: this.state.eng_b4_fb,
      eng_b4_ig: this.state.eng_b4_ig,
      eng_b4_tw: this.state.eng_b4_tw,
      eng_b4_ln: this.state.eng_b4_ln,
      eng_b4_pt: this.state.eng_b4_pt,

      // ------------------------------
      // Before Impressions
      // ------------------------------
      imp_b4_fb: this.state.imp_b4_fb,
      imp_b4_ig: this.state.imp_b4_ig,
      imp_b4_tw: this.state.imp_b4_tw,
      imp_b4_ln: this.state.imp_b4_ln,
      imp_b4_pt: this.state.imp_b4_pt,

      // ------------------------------
      // Before Reach
      // ------------------------------
      reach_b4_fb: this.state.reach_b4_fb,
      reach_b4_ig: this.state.reach_b4_ig,
      reach_b4_tw: this.state.reach_b4_tw,
      reach_b4_ln: this.state.reach_b4_ln,
      reach_b4_pt: this.state.reach_b4_pt,
      // --------------------------
      //  Web Traffic
      // --------------------------
      web_b4: this.state.web_b4
    };
    this.props.createClient(clientData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="create-profile mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto">
              <h1 className="display-4 text-center">
                Create A Client
                <i className="fa fa-user ml-3" style={{ fontSize: '3rem', color: '#18a2b9' }} />
              </h1>
              <p className="lead text-center">Let's Set Up A Client Profile</p>
              <small className="d-block pb-3">Client Name is Required</small>

              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <TextInputField icon="user-o" name="name" classname="clientName" placeholder="Client Name" value={this.state.name} onChange={this.handleChange} errors={errors.name} />
                  </div>
                </div>
                <h4 className="font-weight-light mt-5">Page Followers</h4>
                <div className="row">
                  <div className="col-sm-3 current">
                    <TextInputField icon="facebook" name="pgf_fb_x" classname="pgf fb" placeholder="Current" value={this.state.pgf_fb_x} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="pgf_tw_x" classname="pgf tw" placeholder="Current" value={this.state.pgf_tw_x} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="pgf_ig_x" classname="pgf ig" placeholder="Current" value={this.state.pgf_ig_x} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="pgf_ln_x" classname="pgf ln" placeholder="Current" value={this.state.pgf_ln_x} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="pgf_pt_x" classname="pgf pn" placeholder="Current" value={this.state.pgf_pt_x} onChange={this.handleChange} />
                  </div>

                  <div className="col-sm-6 rangeSlider">
                    <div className="range-slider">
                      <i
                        className="fa fa-facebook"
                        style={{
                          left: (this.state.pgf_fb_x / this.state.pgf_fb_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-twitter"
                        style={{
                          left: (this.state.pgf_tw_x / this.state.pgf_tw_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-linkedin"
                        style={{
                          left: (this.state.pgf_ln_x / this.state.pgf_ln_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-pinterest"
                        style={{
                          left: (this.state.pgf_pt_x / this.state.pgf_pt_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-instagram"
                        style={{
                          left: (this.state.pgf_ig_x / this.state.pgf_ig_y) * 100 + '%'
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-sm-3 goal">
                    <TextInputField icon="facebook" name="pgf_fb_y" classname="pgf fb" placeholder="Goal Facebook Followers" value={this.state.pgf_fb_y} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="pgf_tw_y" classname="pgf tw" placeholder="Goal Twitter Followers" value={this.state.pgf_tw_y} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="pgf_ig_y" classname="pgf ig" placeholder="Goal Instagram Followers" value={this.state.pgf_ig_y} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="pgf_ln_y" classname="pgf ln" placeholder="Goal LinkedIn Followers" value={this.state.pgf_ln_y} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="pgf_pt_y" classname="pgf pn" placeholder="Goal Pinterest Followers" value={this.state.pgf_pt_y} onChange={this.handleChange} />
                  </div>

                  <div className="col-sm-12 before">
                    <h6 className="font-weight-light mt-2">Starting Page Followers</h6>
                    <ul className="d-flex justify-content-between list-unstyled">
                      <li>
                        <TextInputField icon="facebook" name="pgf_b4_fb" classname="pgf fb" placeholder="Starting" value={this.state.pgf_b4_fb} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="twitter" name="pgf_b4_tw" classname="pgf tw" placeholder="Starting" value={this.state.pgf_b4_tw} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="instagram" name="pgf_b4_ig" classname="pgf ig" placeholder="Starting" value={this.state.pgf_b4_ig} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="linkedin" name="pgf_b4_ln" classname="pgf ln" placeholder="Starting" value={this.state.pgf_b4_ln} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="pinterest" name="pgf_b4_pt" classname="pgf pn" placeholder="Starting" value={this.state.pgf_b4_pt} onChange={this.handleChange} />
                      </li>
                    </ul>
                  </div>
                </div>

                {/* End of Page Followers*/}
                <h4 className="font-weight-light mt-5">Engagement</h4>
                <div className="row">
                  <div className="col-sm-3 current">
                    <TextInputField icon="facebook" name="eng_fb_x" classname="eng fb" placeholder="Current Facebook Engagement" value={this.state.eng_fb_x} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="eng_tw_x" classname="eng tw" placeholder="Current Twitter Engagement" value={this.state.eng_tw_x} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="eng_ig_x" classname="eng ig" placeholder="Current Instagram Engagement" value={this.state.eng_ig_x} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="eng_ln_x" classname="eng ln" placeholder="Current LinkedIn Engagement" value={this.state.eng_ln_x} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="eng_pt_x" classname="eng pn" placeholder="Current Pinterest Engagement" value={this.state.eng_pt_x} onChange={this.handleChange} />
                  </div>
                  <div className="col-sm-6 rangeSlider">
                    <div className="range-slider">
                      <i
                        className="fa fa-facebook"
                        style={{
                          left: (this.state.eng_fb_x / this.state.eng_fb_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-twitter"
                        style={{
                          left: (this.state.eng_tw_x / this.state.eng_tw_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-linkedin"
                        style={{
                          left: (this.state.eng_ln_x / this.state.eng_ln_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-pinterest"
                        style={{
                          left: (this.state.eng_pt_x / this.state.eng_pt_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-instagram"
                        style={{
                          left: (this.state.eng_ig_x / this.state.eng_ig_y) * 100 + '%'
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 goal">
                    <TextInputField icon="facebook" name="eng_fb_y" classname="eng fb" placeholder="Goal Facebook Engagement" value={this.state.eng_fb_y} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="eng_tw_y" classname="eng tw" placeholder="Goal Twitter Engagement" value={this.state.eng_tw_y} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="eng_ig_y" classname="eng ig" placeholder="Goal Instagram Engagement" value={this.state.eng_ig_y} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="eng_ln_y" classname="eng ln" placeholder="Goal LinkedIn Engagement" value={this.state.eng_ln_y} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="eng_pt_y" classname="eng pn" placeholder="Goal Pinterest Engagement" value={this.state.eng_pt_y} onChange={this.handleChange} />
                  </div>

                  <div className="col-sm-12 before">
                    <h6 className="font-weight-light mt-2">Starting Engagement</h6>
                    <ul className="d-flex justify-content-between list-unstyled">
                      <li>
                        <TextInputField icon="facebook" name="eng_b4_fb" classname="pgf fb" placeholder="Starting" value={this.state.eng_b4_fb} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="twitter" name="eng_b4_tw" classname="pgf tw" placeholder="Starting" value={this.state.eng_b4_tw} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="instagram" name="eng_b4_ig" classname="pgf ig" placeholder="Starting" value={this.state.eng_b4_ig} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="linkedin" name="eng_b4_ln" classname="pgf ln" placeholder="Starting" value={this.state.eng_b4_ln} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="pinterest" name="eng_b4_pt" classname="pgf pn" placeholder="Starting" value={this.state.eng_b4_pt} onChange={this.handleChange} />
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End of Engagement*/}
                <h4 className="font-weight-light mt-5">Impressions</h4>
                <div className="row">
                  <div className="col-sm-3 current">
                    <TextInputField icon="facebook" name="imp_fb_x" classname="imp fb" placeholder="Current Facebook Impressions" value={this.state.imp_fb_x} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="imp_tw_x" classname="imp tw" placeholder="Current Twitter Impressions" value={this.state.imp_tw_x} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="imp_ig_x" classname="imp ig" placeholder="Current Instagram Impressions" value={this.state.imp_ig_x} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="imp_ln_x" classname="imp ln" placeholder="Current LinkedIn Impressions" value={this.state.imp_ln_x} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="imp_pt_x" classname="imp pn" placeholder="Current Pinterest Impressions" value={this.state.imp_pt_x} onChange={this.handleChange} />
                  </div>
                  <div className="col-sm-6 rangeSlider">
                    <div className="range-slider">
                      <i
                        className="fa fa-facebook"
                        style={{
                          left: (this.state.imp_fb_x / this.state.imp_fb_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-twitter"
                        style={{
                          left: (this.state.imp_tw_x / this.state.imp_tw_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-linkedin"
                        style={{
                          left: (this.state.imp_ln_x / this.state.imp_ln_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-pinterest"
                        style={{
                          left: (this.state.imp_pt_x / this.state.imp_pt_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-instagram"
                        style={{
                          left: (this.state.imp_ig_x / this.state.imp_ig_y) * 100 + '%'
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 goal">
                    <TextInputField icon="facebook" name="imp_fb_y" classname="imp fb" placeholder="Goal Facebook Impressions" value={this.state.imp_fb_y} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="imp_tw_y" classname="imp tw" placeholder="Goal Twitter Impressions" value={this.state.imp_tw_y} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="imp_ig_y" classname="imp ig" placeholder="Goal Instagram Impressions" value={this.state.imp_ig_y} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="imp_ln_y" classname="imp ln" placeholder="Goal LinkedIn Impressions" value={this.state.imp_ln_y} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="imp_pt_y" classname="imp pn" placeholder="Goal Pinterest Impressions" value={this.state.imp_pt_y} onChange={this.handleChange} />
                  </div>

                  <div className="col-sm-12 before">
                    <h6 className="font-weight-light mt-2">Starting Impressions</h6>
                    <ul className="d-flex justify-content-between list-unstyled">
                      <li>
                        <TextInputField icon="facebook" name="imp_b4_fb" classname="pgf fb" placeholder="Starting" value={this.state.imp_b4_fb} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="twitter" name="imp_b4_tw" classname="pgf tw" placeholder="Starting" value={this.state.imp_b4_tw} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="instagram" name="imp_b4_ig" classname="pgf ig" placeholder="Starting" value={this.state.imp_b4_ig} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="linkedin" name="imp_b4_ln" classname="pgf ln" placeholder="Starting" value={this.state.imp_b4_ln} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="pinterest" name="imp_b4_pt" classname="pgf pn" placeholder="Starting" value={this.state.imp_b4_pt} onChange={this.handleChange} />
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End of Impressions*/}

                <h4 className="font-weight-light mt-5">Reach</h4>
                <div className="row">
                  <div className="col-sm-3 current">
                    <TextInputField icon="facebook" name="reach_fb_x" classname="reacg fb" placeholder="Current Facebook Reach" value={this.state.reach_fb_x} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="reach_tw_x" classname="reacg tw" placeholder="Current Twitter Reach" value={this.state.reach_tw_x} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="reach_ig_x" classname="reacg ig" placeholder="Current Instagram Reach" value={this.state.reach_ig_x} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="reach_ln_x" classname="reacg ln" placeholder="Current LinkedIn Reach" value={this.state.reach_ln_x} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="reach_pt_x" classname="reacg pn" placeholder="Current Pinterest Reach" value={this.state.reach_pt_x} onChange={this.handleChange} />
                  </div>
                  <div className="col-sm-6 rangeSlider">
                    <div className="range-slider">
                      <i
                        className="fa fa-facebook"
                        style={{
                          left: (this.state.reach_fb_x / this.state.reach_fb_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-twitter"
                        style={{
                          left: (this.state.reach_tw_x / this.state.reach_tw_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-linkedin"
                        style={{
                          left: (this.state.reach_ln_x / this.state.reach_ln_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-pinterest"
                        style={{
                          left: (this.state.reach_pt_x / this.state.reach_pt_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-instagram"
                        style={{
                          left: (this.state.reach_ig_x / this.state.reach_ig_y) * 100 + '%'
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 goal">
                    <TextInputField icon="facebook" name="reach_fb_y" classname="reach fb" placeholder="Goal Facebook Reach" value={this.state.reach_fb_y} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="reach_tw_y" classname="reach tw" placeholder="Goal Twitter Reach" value={this.state.reach_tw_y} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="reach_ig_y" classname="reach ig" placeholder="Goal Instagram Reach" value={this.state.reach_ig_y} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="reach_ln_y" classname="reach ln" placeholder="Goal LinkedIn Reach" value={this.state.reach_ln_y} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="reach_pt_y" classname="reach pn" placeholder="Goal Pinterest Reach" value={this.state.reach_pt_y} onChange={this.handleChange} />
                  </div>

                  <div className="col-sm-12 before">
                    <h6 className="font-weight-light mt-2">Starting Reach</h6>
                    <ul className="d-flex justify-content-between list-unstyled">
                      <li>
                        <TextInputField icon="facebook" name="reach_b4_fb" classname="reach fb" placeholder="Starting" value={this.state.reach_b4_fb} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="twitter" name="reach_b4_tw" classname="reach tw" placeholder="Starting" value={this.state.reach_b4_tw} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="instagram" name="reach_b4_ig" classname="reach ig" placeholder="Starting" value={this.state.reach_b4_ig} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="linkedin" name="reach_b4_ln" classname="reach ln" placeholder="Starting" value={this.state.reach_b4_ln} onChange={this.handleChange} />
                      </li>
                      <li>
                        <TextInputField icon="pinterest" name="reach_b4_pt" classname="reach pn" placeholder="Starting" value={this.state.reach_b4_pt} onChange={this.handleChange} />
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End of Reach*/}

                <h4 className=" font-weight-light mt-5">Site Traffic</h4>
                <div className="row site-traffic">
                  <div className="col-sm-3 current">
                    <TextInputField icon="laptop" name="web_x" classname="web" placeholder="Current Web Traffic" value={this.state.web_x} onChange={this.handleChange} />
                  </div>
                  <div className="col-sm-6 rangeSlider">
                    <div className="range-slider">
                      <i
                        className="fa fa-code"
                        style={{
                          left: (this.state.web_x / this.state.web_y) * 100 + '%'
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 goal">
                    <TextInputField icon="laptop" name="web_y" classname="web" placeholder="Goal Web Traffic" value={this.state.web_y} onChange={this.handleChange} />
                  </div>
                  <div className="col-sm-12 before">
                    <h6 className="font-weight-light mt-2">Starting Traffic</h6>
                    <ul className="d-flex justify-content-between list-unstyled">
                      <li>
                        <TextInputField icon="laptop" name="web_b4" classname="pgf fb" placeholder="Starting" value={this.state.web_b4} onChange={this.handleChange} />
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End of Site Traffic*/}
                <button className="btn btn-lg btn-outline-primary btn-block mt-5 w-50 mx-auto" type="submit">
                  Create Client
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateClientProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  clients: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  client: state.clients,
  clients: state.clients,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createClient }
)(withRouter(CreateClientProfile));
