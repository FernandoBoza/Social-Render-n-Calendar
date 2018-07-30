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
