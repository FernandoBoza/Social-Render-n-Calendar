import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createClient } from '../../actions/clientActions';
import NumInputField from '../common/NumInputField';
import TextInputField from '../common/TextInputField';
import WOW from 'wowjs';

export class CreateClientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      // Page Followers
      pgf_fb_x: 0,
      pgf_fb_y: 0,
      pgf_ig_x: 0,
      pgf_ig_y: 0,
      pgf_tw_x: 0,
      pgf_tw_y: 0,
      pgf_ln_x: 0,
      pgf_ln_y: 0,
      pgf_pt_x: 0,
      pgf_pt_y: 0,
      // Engagement
      eng_fb_x: 0,
      eng_fb_y: 0,
      eng_ig_x: 0,
      eng_ig_y: 0,
      eng_tw_x: 0,
      eng_tw_y: 0,
      eng_ln_x: 0,
      eng_ln_y: 0,
      eng_pt_x: 0,
      eng_pt_y: 0,
      // Impressions
      imp_fb_x: 0,
      imp_fb_y: 0,
      imp_ig_x: 0,
      imp_ig_y: 0,
      imp_tw_x: 0,
      imp_tw_y: 0,
      imp_ln_x: 0,
      imp_ln_y: 0,
      imp_pt_x: 0,
      imp_pt_y: 0,
      // Reach
      reach_fb_x: 0,
      reach_fb_y: 0,
      reach_ig_x: 0,
      reach_ig_y: 0,
      reach_tw_x: 0,
      reach_tw_y: 0,
      reach_ln_x: 0,
      reach_ln_y: 0,
      reach_pt_x: 0,
      reach_pt_y: 0,
      // Web Traffic
      web_x: 0,
      web_y: 0,
      // Press Release
      numHits_x: 0,
      numHits_y: 0,
      mediaValue_x: 0,
      mediaValue_y: 0,

      // Before Input
      web_b4: 0,
      pgf_b4_fb: 0,
      pgf_b4_ig: 0,
      pgf_b4_tw: 0,
      pgf_b4_ln: 0,
      pgf_b4_pt: 0,
      eng_b4_fb: 0,
      eng_b4_ig: 0,
      eng_b4_tw: 0,
      eng_b4_ln: 0,
      eng_b4_pt: 0,
      imp_b4_fb: 0,
      imp_b4_ig: 0,
      imp_b4_tw: 0,
      imp_b4_ln: 0,
      imp_b4_pt: 0,
      reach_b4_fb: 0,
      reach_b4_ig: 0,
      reach_b4_tw: 0,
      reach_b4_ln: 0,
      reach_b4_pt: 0,
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

  componentDidMount = e => {
    new WOW.WOW({
      live: false
    }).init();
  };

  handleChange = e => {
    const value = e.target.value.replace(/,/g, '');

    if (typeof value === typeof number) {
      this.setState({ [e.target.name]: parseInt(value, 10) });
    } else {
      this.setState({ [e.target.name]: value });
    }
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
      // Press Release
      numHits_x: this.state.numHits_x,
      numHits_y: this.state.numHits_y,
      mediaValue_x: this.state.mediaValue_x,
      mediaValue_y: this.state.mediaValue_y,

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
    const createCategory_5 = (cat_name, category) => {
      return (
        <div>
          <h4 className="font-weight-light mt-5">{cat_name}</h4>
          <div className="row">
            <div className="col-sm-3 current wow animated fadeInLeft">
              <NumInputField
                icon="facebook"
                name={`${category}_fb_x`}
                classname={category + ' fb'}
                placeholder="Current"
                value={this.state[category + '_fb_x']}
                onChange={this.handleChange}
              />
              <NumInputField
                icon="twitter"
                name={`${category}_tw_x`}
                classname={category + ' tw'}
                placeholder="Current"
                value={this.state[category + '_tw_x']}
                onChange={this.handleChange}
              />
              <NumInputField
                icon="instagram"
                name={`${category}_ig_x`}
                classname={category + ' ig'}
                placeholder="Current"
                value={this.state[category + '_ig_x']}
                onChange={this.handleChange}
              />
              <NumInputField
                icon="linkedin"
                name={`${category}_ln_x`}
                classname={category + ' ln'}
                placeholder="Current"
                value={this.state[category + '_ln_x']}
                onChange={this.handleChange}
              />
              <NumInputField
                icon="pinterest"
                name={`${category}_pt_x`}
                classname={category + ' pn'}
                placeholder="Current"
                value={this.state[category + '_pt_x']}
                onChange={this.handleChange}
              />
            </div>

            <div className="col-sm-6 rangeSlider wow animated fadeInUp">
              <div className="range-slider">
                <i
                  className="fa fa-facebook"
                  style={{
                    left: (this.state[category + '_fb_x'] / this.state[category + '_fb_y']) * 100 + '%'
                  }}
                />
                <i
                  className="fa fa-twitter"
                  style={{
                    left: (this.state[category + '_tw_x'] / this.state[category + '_tw_y']) * 100 + '%'
                  }}
                />
                <i
                  className="fa fa-linkedin"
                  style={{
                    left: (this.state[category + '_ln_x'] / this.state[category + '_ln_y']) * 100 + '%'
                  }}
                />
                <i
                  className="fa fa-pinterest"
                  style={{
                    left: (this.state[category + '_pt_x'] / this.state[category + '_pt_y']) * 100 + '%'
                  }}
                />
                <i
                  className="fa fa-instagram"
                  style={{
                    left: (this.state[category + '_ig_x'] / this.state[category + '_ig_y']) * 100 + '%'
                  }}
                />
              </div>
            </div>

            <div className="col-sm-3 goal wow animated fadeInRight">
              <NumInputField
                icon="facebook"
                name={`${category}_fb_y`}
                classname={category + 'fb'}
                placeholder="Goal Facebook"
                value={this.state[category + '_fb_y']}
                onChange={this.handleChange}
              />
              <NumInputField
                icon="twitter"
                name={`${category}_tw_y`}
                classname={category + 'tw'}
                placeholder="Goal Twitter"
                value={this.state[category + '_tw_y']}
                onChange={this.handleChange}
              />
              <NumInputField
                icon="instagram"
                name={`${category}_ig_y`}
                classname={category + 'ig'}
                placeholder="Goal Instagram"
                value={this.state[category + '_ig_y']}
                onChange={this.handleChange}
              />
              <NumInputField
                icon="linkedin"
                name={`${category}_ln_y`}
                classname={category + 'ln'}
                placeholder="Goal LinkedIn"
                value={this.state[category + '_ln_y']}
                onChange={this.handleChange}
              />
              <NumInputField
                icon="pinterest"
                name={`${category}_pt_y`}
                classname={category + 'pn'}
                placeholder="Goal Pinterest"
                value={this.state[category + '_pt_y']}
                onChange={this.handleChange}
              />
            </div>

            <div className="col-sm-12 before">
              <h6 className="font-weight-light mt-2">Starting {cat_name}</h6>
              <ul className="d-flex justify-content-between list-unstyled">
                <li>
                  <NumInputField
                    icon="facebook"
                    name={`${category}_b4_fb`}
                    classname={`${category} fb`}
                    placeholder="Starting"
                    value={this.state[category + '_b4_fb']}
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <NumInputField
                    icon="twitter"
                    name={`${category}_b4_tw`}
                    classname={`${category} tw`}
                    placeholder="Starting"
                    value={this.state[category + '_b4_tw']}
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <NumInputField
                    icon="instagram"
                    name={`${category}_b4_ig`}
                    classname={`${category} ig`}
                    placeholder="Starting"
                    value={this.state[category + '_b4_ig']}
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <NumInputField
                    icon="linkedin"
                    name={`${category}_b4_ln`}
                    classname={`${category} ln`}
                    placeholder="Starting"
                    value={this.state[category + '_b4_ln']}
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <NumInputField
                    icon="pinterest"
                    name={`${category}_b4_pt`}
                    classname={`${category} pn`}
                    placeholder="Starting"
                    value={this.state[category + '_b4_pt']}
                    onChange={this.handleChange}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    };

    const createCategory_2 = (cat_name, icon1, icon2) => {
      return (
        <div>
          <h4 className="font-weight-light mt-5">{cat_name}</h4>
          <div className="row">
            <div className="col-sm-3 current">
              <NumInputField
                icon={icon1}
                name="numHits_x"
                classname={'numHits'}
                placeholder="Current"
                value={this.state.numHits_x}
                onChange={this.handleChange}
              />
              <NumInputField
                icon={icon2}
                name="mediaValue_x"
                classname={'mediaValue'}
                placeholder="Current"
                value={this.state.mediaValue_x}
                onChange={this.handleChange}
              />
            </div>

            <div className="col-sm-6 rangeSlider">
              <div className="range-slider">
                <i
                  className={`fa fa-${icon1}`}
                  style={{
                    left: (this.state.numHits_x / this.state.numHits_y) * 100 + '%'
                  }}
                />
                <i
                  className={`fa fa-${icon2}`}
                  style={{
                    left: (this.state.mediaValue_x / this.state.mediaValue_y) * 100 + '%'
                  }}
                />
              </div>
            </div>

            <div className="col-sm-3 goal">
              <NumInputField
                icon={icon1}
                name="numHits_y"
                classname={'numHits'}
                placeholder="Goal  Hits"
                value={this.state.numHits_y}
                onChange={this.handleChange}
              />
              <NumInputField
                icon={icon2}
                name="mediaValue_y"
                classname={'mediaValue'}
                placeholder="Goal Media Value"
                value={this.state.mediaValue_y}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      );
    };

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

              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <p className="d-block">Client Name is Required</p>
                    <TextInputField
                      type="text"
                      icon="user-o"
                      name="name"
                      classname="clientName"
                      placeholder="Client Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      errors={errors.name}
                    />
                  </div>
                </div>

                {createCategory_5('Page Followers', 'pgf')}
                {createCategory_5('Impressions', 'imp')}
                {createCategory_5('Reach', 'reach')}
                {createCategory_5('Engagement', 'eng')}
                {createCategory_2('Press Release', 'hashtag', 'pie-chart')}

                <h4 className=" font-weight-light mt-5">Site Traffic</h4>
                <div className="row site-traffic">
                  <div className="col-sm-3 current">
                    <NumInputField
                      icon="laptop"
                      name="web_x"
                      classname="web"
                      placeholder="Current Web Traffic"
                      value={this.state.web_x}
                      onChange={this.handleChange}
                    />
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
                    <NumInputField
                      icon="laptop"
                      name="web_y"
                      classname="web"
                      placeholder="Goal Web Traffic"
                      value={this.state.web_y}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-sm-12 before">
                    <h6 className="font-weight-light mt-2">Starting Traffic</h6>
                    <ul className="d-flex justify-content-between list-unstyled">
                      <li>
                        <NumInputField
                          icon="laptop"
                          name="web_b4"
                          classname="pgf fb"
                          placeholder="Starting"
                          value={this.state.web_b4}
                          onChange={this.handleChange}
                        />
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  className="btn btn-lg btn-outline-primary btn-block mt-5 w-50 mx-auto"
                  type="submit"
                >
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
