import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getAClient, updateAClient, deleteClient } from '../../actions/clientActions';
import NumInputField from '../common/NumInputField';
import isEmpty from '../../validation/is-empty';

export class EditClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      //--------------------
      // Page Followers
      //--------------------
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
      //--------------------
      // Engagment
      //--------------------
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
      //--------------------
      // Impressions
      //--------------------
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
      //--------------------
      // Reach
      //--------------------
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
      // --------------------------
      //  Web Traffic
      // --------------------------
      web_x: 0,
      web_y: 0,

      // --------------------------
      // Before Input
      // --------------------------
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
      errors: {},
      collapse: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  toggleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  componentDidMount = () => {
    if (this.props.match.params.handle) {
      this.props.getAClient(this.props.match.params.handle);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.clients.clients) {
      const clients = nextProps.clients.clients;

      this.setState({
        name: isEmpty(clients.name && clients.name) ? '' : clients.name,
        // --------------------------
        //Page Followers
        // --------------------------
        pgf_fb_x: isEmpty(clients.pageFollowers && clients.pageFollowers.fb_x) ? 0 : clients.pageFollowers.fb_x,
        pgf_fb_y: isEmpty(clients.pageFollowers && clients.pageFollowers.fb_y) ? 0 : clients.pageFollowers.fb_y,
        pgf_ig_x: isEmpty(clients.pageFollowers && clients.pageFollowers.ig_x) ? 0 : clients.pageFollowers.ig_x,
        pgf_ig_y: isEmpty(clients.pageFollowers && clients.pageFollowers.ig_y) ? 0 : clients.pageFollowers.ig_y,
        pgf_tw_x: isEmpty(clients.pageFollowers && clients.pageFollowers.tw_x) ? 0 : clients.pageFollowers.tw_x,
        pgf_tw_y: isEmpty(clients.pageFollowers && clients.pageFollowers.tw_y) ? 0 : clients.pageFollowers.tw_y,
        pgf_ln_x: isEmpty(clients.pageFollowers && clients.pageFollowers.ln_x) ? 0 : clients.pageFollowers.ln_x,
        pgf_ln_y: isEmpty(clients.pageFollowers && clients.pageFollowers.ln_y) ? 0 : clients.pageFollowers.ln_y,
        pgf_pt_x: isEmpty(clients.pageFollowers && clients.pageFollowers.pt_x) ? 0 : clients.pageFollowers.pt_x,
        pgf_pt_y: isEmpty(clients.pageFollowers && clients.pageFollowers.pt_y) ? 0 : clients.pageFollowers.pt_y,

        pgf_b4_fb: isEmpty(clients.pageFollowers && clients.pageFollowers.b4_fb) ? 0 : clients.pageFollowers.b4_fb,
        pgf_b4_ig: isEmpty(clients.pageFollowers && clients.pageFollowers.b4_ig) ? 0 : clients.pageFollowers.b4_ig,
        pgf_b4_tw: isEmpty(clients.pageFollowers && clients.pageFollowers.b4_tw) ? 0 : clients.pageFollowers.b4_tw,
        pgf_b4_ln: isEmpty(clients.pageFollowers && clients.pageFollowers.b4_ln) ? 0 : clients.pageFollowers.b4_ln,
        pgf_b4_pt: isEmpty(clients.pageFollowers && clients.pageFollowers.b4_pt) ? 0 : clients.pageFollowers.b4_pt,

        // --------------------------
        // Engagement
        // --------------------------
        eng_fb_x: isEmpty(clients.engagement && clients.engagement.fb_x) ? 0 : clients.engagement.fb_x,
        eng_fb_y: isEmpty(clients.engagement && clients.engagement.fb_y) ? 0 : clients.engagement.fb_y,
        eng_ig_x: isEmpty(clients.engagement && clients.engagement.ig_x) ? 0 : clients.engagement.ig_x,
        eng_ig_y: isEmpty(clients.engagement && clients.engagement.ig_y) ? 0 : clients.engagement.ig_y,
        eng_tw_x: isEmpty(clients.engagement && clients.engagement.tw_x) ? 0 : clients.engagement.tw_x,
        eng_tw_y: isEmpty(clients.engagement && clients.engagement.tw_y) ? 0 : clients.engagement.tw_y,
        eng_ln_x: isEmpty(clients.engagement && clients.engagement.ln_x) ? 0 : clients.engagement.ln_x,
        eng_ln_y: isEmpty(clients.engagement && clients.engagement.ln_y) ? 0 : clients.engagement.ln_y,
        eng_pt_x: isEmpty(clients.engagement && clients.engagement.pt_x) ? 0 : clients.engagement.pt_x,
        eng_pt_y: isEmpty(clients.engagement && clients.engagement.pt_y) ? 0 : clients.engagement.pt_y,

        eng_b4_fb: isEmpty(clients.engagement && clients.engagement.b4_fb) ? 0 : clients.engagement.b4_fb,
        eng_b4_ig: isEmpty(clients.engagement && clients.engagement.b4_ig) ? 0 : clients.engagement.b4_ig,
        eng_b4_tw: isEmpty(clients.engagement && clients.engagement.b4_tw) ? 0 : clients.engagement.b4_tw,
        eng_b4_ln: isEmpty(clients.engagement && clients.engagement.b4_ln) ? 0 : clients.engagement.b4_ln,
        eng_b4_pt: isEmpty(clients.engagement && clients.engagement.b4_pt) ? 0 : clients.engagement.b4_pt,

        // --------------------------
        // Impressions
        // --------------------------
        imp_fb_x: isEmpty(clients.impressions && clients.impressions.fb_x) ? 0 : clients.impressions.fb_x,
        imp_fb_y: isEmpty(clients.impressions && clients.impressions.fb_y) ? 0 : clients.impressions.fb_y,
        imp_ig_x: isEmpty(clients.impressions && clients.impressions.ig_x) ? 0 : clients.impressions.ig_x,
        imp_ig_y: isEmpty(clients.impressions && clients.impressions.ig_y) ? 0 : clients.impressions.ig_y,
        imp_tw_x: isEmpty(clients.impressions && clients.impressions.tw_x) ? 0 : clients.impressions.tw_x,
        imp_tw_y: isEmpty(clients.impressions && clients.impressions.tw_y) ? 0 : clients.impressions.tw_y,
        imp_ln_x: isEmpty(clients.impressions && clients.impressions.ln_x) ? 0 : clients.impressions.ln_x,
        imp_ln_y: isEmpty(clients.impressions && clients.impressions.ln_y) ? 0 : clients.impressions.ln_y,
        imp_pt_x: isEmpty(clients.impressions && clients.impressions.pt_x) ? 0 : clients.impressions.pt_x,
        imp_pt_y: isEmpty(clients.impressions && clients.impressions.pt_y) ? 0 : clients.impressions.pt_y,

        imp_b4_fb: isEmpty(clients.impressions && clients.impressions.b4_fb) ? 0 : clients.impressions.b4_fb,
        imp_b4_ig: isEmpty(clients.impressions && clients.impressions.b4_ig) ? 0 : clients.impressions.b4_ig,
        imp_b4_tw: isEmpty(clients.impressions && clients.impressions.b4_tw) ? 0 : clients.impressions.b4_tw,
        imp_b4_ln: isEmpty(clients.impressions && clients.impressions.b4_ln) ? 0 : clients.impressions.b4_ln,
        imp_b4_pt: isEmpty(clients.impressions && clients.impressions.b4_pt) ? 0 : clients.impressions.b4_pt,

        // --------------------------
        // Reach
        // --------------------------
        reach_fb_x: isEmpty(clients.reach && clients.reach.fb_x) ? 0 : clients.reach.fb_x,
        reach_fb_y: isEmpty(clients.reach && clients.reach.fb_y) ? 0 : clients.reach.fb_y,
        reach_ig_x: isEmpty(clients.reach && clients.reach.ig_x) ? 0 : clients.reach.ig_x,
        reach_ig_y: isEmpty(clients.reach && clients.reach.ig_y) ? 0 : clients.reach.ig_y,
        reach_tw_x: isEmpty(clients.reach && clients.reach.tw_x) ? 0 : clients.reach.tw_x,
        reach_tw_y: isEmpty(clients.reach && clients.reach.tw_y) ? 0 : clients.reach.tw_y,
        reach_ln_x: isEmpty(clients.reach && clients.reach.ln_x) ? 0 : clients.reach.ln_x,
        reach_ln_y: isEmpty(clients.reach && clients.reach.ln_y) ? 0 : clients.reach.ln_y,
        reach_pt_x: isEmpty(clients.reach && clients.reach.pt_x) ? 0 : clients.reach.pt_x,
        reach_pt_y: isEmpty(clients.reach && clients.reach.pt_y) ? 0 : clients.reach.pt_y,

        reach_b4_fb: isEmpty(clients.reach && clients.reach.b4_fb) ? 0 : clients.reach.b4_fb,
        reach_b4_ig: isEmpty(clients.reach && clients.reach.b4_ig) ? 0 : clients.reach.b4_ig,
        reach_b4_tw: isEmpty(clients.reach && clients.reach.b4_tw) ? 0 : clients.reach.b4_tw,
        reach_b4_ln: isEmpty(clients.reach && clients.reach.b4_ln) ? 0 : clients.reach.b4_ln,
        reach_b4_pt: isEmpty(clients.reach && clients.reach.b4_pt) ? 0 : clients.reach.b4_pt,

        // --------------------------
        //  Web Traffic
        // --------------------------
        web_x: isEmpty(clients.siteTraffic && clients.siteTraffic.x) ? 0 : clients.siteTraffic.x,
        web_y: isEmpty(clients.siteTraffic && clients.siteTraffic.y) ? 0 : clients.siteTraffic.y,

        web_b4: isEmpty(clients.siteTraffic && clients.siteTraffic.web_b4) ? 0 : clients.siteTraffic.web_b4
      });
    }
  };

  handleChange = e => {
    const value = e.target.value.replace(/,/g, '');
    this.setState({ [e.target.name]: parseInt(value, 10) });
  };

  handleSubmit = e => {
    e.preventDefault();

    const clientData = {
      name: this.state.name,
      //----------------------
      // Page Followers
      //----------------------
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
      //----------------------
      // Engagment
      //----------------------
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
      //----------------------
      // Impressions
      //----------------------
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
      //----------------------
      // Reach
      //----------------------
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
      //----------------------
      // Web Traffic
      //----------------------
      web_x: this.state.web_x,
      web_y: this.state.web_y,

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
    this.props.updateAClient(this.props.match.params.handle, clientData, this.props.history);
    console.log(clientData);
  };

  onDeleteClick = e => {
    this.props.deleteClient(this.props.match.params.handle, this.props.history);
  };

  render() {
    const { clients, loading } = this.props.clients;
    let clientContent;
    // let toggleCollapse = this.state.collapse ? 'show' : '';
    const createEditFields_5 = (cat_name, categoryName, categoryAbbrv, hideOrShow) => {
      return (
        <div>
          <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target={`#${categoryName}`} aria-expanded="true" aria-controls="collapseExample">
            <h4 className="font-weight-light m-0">{cat_name}</h4>
          </button>
          <div className={`show collapse multi-collapse my-3`} id={categoryName}>
            <div className="row">
              <div className="col-sm-3 current">
                <NumInputField icon="facebook" name={`${categoryAbbrv}_fb_x`} classname={categoryAbbrv + ' fb'} placeholder="Current" value={this.state[categoryAbbrv + '_fb_x']} onChange={this.handleChange} />
                <NumInputField icon="twitter" name={`${categoryAbbrv}_tw_x`} classname={categoryAbbrv + ' tw'} placeholder="Current" value={this.state[categoryAbbrv + '_tw_x']} onChange={this.handleChange} />
                <NumInputField icon="instagram" name={`${categoryAbbrv}_ig_x`} classname={categoryAbbrv + ' ig'} placeholder="Current" value={this.state[categoryAbbrv + '_ig_x']} onChange={this.handleChange} />
                <NumInputField icon="linkedin" name={`${categoryAbbrv}_ln_x`} classname={categoryAbbrv + ' ln'} placeholder="Current" value={this.state[categoryAbbrv + '_ln_x']} onChange={this.handleChange} />
                <NumInputField icon="pinterest" name={`${categoryAbbrv}_pt_x`} classname={categoryAbbrv + ' pn'} placeholder="Current" value={this.state[categoryAbbrv + '_pt_x']} onChange={this.handleChange} />
              </div>
              <div className="col-sm-6 rangeSlider">
                <div className="range-slider">
                  <i
                    className="fa fa-facebook"
                    style={{
                      left: (this.state[categoryAbbrv + '_fb_x'] / this.state[categoryAbbrv + '_fb_y']) * 100 >= 100 ? '100%' : (this.state[categoryAbbrv + '_fb_x'] / this.state[categoryAbbrv + '_fb_y']) * 100 + '%'
                    }}
                  />
                  <i
                    className="fa fa-twitter"
                    style={{
                      left: (this.state[categoryAbbrv + '_tw_x'] / this.state[categoryAbbrv + '_tw_y']) * 100 >= 100 ? '100%' : (this.state[categoryAbbrv + '_tw_x'] / this.state[categoryAbbrv + '_tw_y']) * 100 + '%'
                    }}
                  />
                  <i
                    className="fa fa-linkedin"
                    style={{
                      left: (this.state[categoryAbbrv + '_ln_x'] / this.state[categoryAbbrv + '_ln_y']) * 100 >= 100 ? '100%' : (this.state[categoryAbbrv + '_ln_x'] / this.state[categoryAbbrv + '_ln_y']) * 100 + '%'
                    }}
                  />
                  <i
                    className="fa fa-pinterest"
                    style={{
                      left: (this.state[categoryAbbrv + '_pt_x'] / this.state[categoryAbbrv + '_pt_y']) * 100 >= 100 ? '100%' : (this.state[categoryAbbrv + '_pt_x'] / this.state[categoryAbbrv + '_pt_y']) * 100 + '%'
                    }}
                  />
                  <i
                    className="fa fa-instagram"
                    style={{
                      left: (this.state[categoryAbbrv + '_ig_x'] / this.state[categoryAbbrv + '_ig_y']) * 100 >= 100 ? '100%' : (this.state[categoryAbbrv + '_ig_x'] / this.state[categoryAbbrv + '_ig_y']) * 100 + '%'
                    }}
                  />
                </div>
              </div>
              <div className="col-sm-3 goal">
                <NumInputField icon="facebook" name={`${categoryAbbrv}_fb_y`} classname={categoryAbbrv + 'fb'} placeholder="Goal Facebook" value={this.state[categoryAbbrv + '_fb_y']} onChange={this.handleChange} />
                <NumInputField icon="twitter" name={`${categoryAbbrv}_tw_y`} classname={categoryAbbrv + 'tw'} placeholder="Goal Twitter" value={this.state[categoryAbbrv + '_tw_y']} onChange={this.handleChange} />
                <NumInputField icon="instagram" name={`${categoryAbbrv}_ig_y`} classname={categoryAbbrv + 'ig'} placeholder="Goal Instagram" value={this.state[categoryAbbrv + '_ig_y']} onChange={this.handleChange} />
                <NumInputField icon="linkedin" name={`${categoryAbbrv}_ln_y`} classname={categoryAbbrv + 'ln'} placeholder="Goal LinkedIn" value={this.state[categoryAbbrv + '_ln_y']} onChange={this.handleChange} />
                <NumInputField icon="pinterest" name={`${categoryAbbrv}_pt_y`} classname={categoryAbbrv + 'pn'} placeholder="Goal Pinterest" value={this.state[categoryAbbrv + '_pt_y']} onChange={this.handleChange} />
              </div>

              <div className="col-sm-12 before">
                <hr />
                <h6 className="font-weight-light mt-2">Starting {cat_name}</h6>
                <ul className="d-flex justify-content-between list-unstyled">
                  <li>
                    <NumInputField icon="facebook" name={`${categoryAbbrv}_b4_fb`} classname={categoryAbbrv + ' fb'} placeholder="Starting" value={this.state[categoryAbbrv + '_b4_fb']} onChange={this.handleChange} />
                  </li>
                  <li>
                    <NumInputField icon="twitter" name={`${categoryAbbrv}_b4_tw`} classname={categoryAbbrv + ' tw'} placeholder="Starting" value={this.state[categoryAbbrv + '_b4_tw']} onChange={this.handleChange} />
                  </li>
                  <li>
                    <NumInputField icon="instagram" name={`${categoryAbbrv}_b4_ig`} classname={categoryAbbrv + ' ig'} placeholder="Starting" value={this.state[categoryAbbrv + '_b4_ig']} onChange={this.handleChange} />
                  </li>
                  <li>
                    <NumInputField icon="linkedin" name={`${categoryAbbrv}_b4_ln`} classname={categoryAbbrv + ' ln'} placeholder="Starting" value={this.state[categoryAbbrv + '_b4_ln']} onChange={this.handleChange} />
                  </li>
                  <li>
                    <NumInputField icon="pinterest" name={`${categoryAbbrv}_b4_pt`} classname={categoryAbbrv + ' pt'} placeholder="Starting" value={this.state[categoryAbbrv + '_b4_pt']} onChange={this.handleChange} />
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
        <form onSubmit={this.handleSubmit}>
          <div>
            <Link to={`/clients/${this.props.match.params.handle}`} className="btn btn-primary mb-3">
              Back To {clients.name}
            </Link>

            <button className="btn btn-success ml-4 mb-3" type="submit">
              Update {clients.name}
            </button>

            <button onClick={this.onDeleteClick} type="button" className="btn btn-danger mx-4 mb-3">
              Delete {clients.name}
            </button>

            <button className="btn btn-info mb-3 toggleShowCollapse" type="button" data-toggle="collapse" data-target=".multi-collapse" onClick={this.toggleCollapse}>
              {this.state.collapse ? 'Collapse' : 'Expand'}
            </button>

            <div className="col-md-12 m-auto">
              <h1 className="display-4 text-center">Edit {clients.name}</h1>
              <div className="row" />

              {createEditFields_5('Page Followers', 'pageFollowers', 'pgf', 'show')}
              {createEditFields_5('Impressions', 'impressions', 'imp')}
              {createEditFields_5('Reach', 'reach', 'reach')}
              {createEditFields_5('Engagement', 'engagement', 'eng')}

              <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#site_traffic" aria-expanded="false" aria-controls="collapseExample">
                <h4 className="font-weight-light m-0">Site Traffic</h4>
              </button>
              <div className={`show collapse multi-collapse my-3`} id="site_traffic">
                <div className="row">
                  <div className="col-sm-3 current">
                    <NumInputField icon="laptop" name="web_x" classname="web" placeholder="Current Web Traffic" value={this.state.web_x} onChange={this.handleChange} />
                  </div>
                  <div className="col-sm-6 rangeSlider">
                    <div className="range-slider client">
                      <i
                        className="fa fa-code"
                        style={{
                          left: (this.state.web_x / this.state.web_y) * 100 >= 100 ? '100%' : (this.state.web_x / this.state.web_y) * 100 + '%'
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 goal">
                    <NumInputField icon="laptop" name="web_y" classname="web" placeholder="Goal Web Traffic" value={this.state.web_y} onChange={this.handleChange} />
                  </div>
                </div>
                {/* End of Site Traffic*/}
              </div>
            </div>
          </div>
        </form>
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

EditClient.propTypes = {
  clients: PropTypes.object.isRequired,
  getAClient: PropTypes.func.isRequired,
  updateAClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clients: state.clients
});

export default connect(
  mapStateToProps,
  { getAClient, updateAClient, deleteClient }
)(EditClient);
