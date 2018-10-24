import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import { getAClient } from '../../../actions/clientActions';
import NumInputField from '../../common/NumInputField';
import isEmpty from '../../../validation/is-empty';
import ReactTooltip from 'react-tooltip';
// import CreateEditFieldsNew from '../Layout/ClientProfileEditFields5';

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
      web: true,

      collapse: true
    };

    this.toggleShowBtn = this.toggleShowBtn.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
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

  toggleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  render() {
    const { client, loading } = this.props.clients;
    const { user, isAuthenticated } = this.props.auth;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    let clientContent;

    const authLinks = (
      <div className="mb-3">
        <Link
          to={`${this.props.match.params.handle}/edit-client`}
          className="btn btn-primary toggleShowCollapse"
        >
          Edit Client
        </Link>

        <button
          className="btn btn-success mx-4 toggleShowCollapse"
          type="button"
          data-toggle="collapse"
          data-target=".multi-collapse"
          onClick={this.toggleCollapse}
        >
          {this.state.collapse ? 'Collapse' : 'Expand'}
        </button>
      </div>
    );

    const clientLinks = (
      <Link to={'/'} className="btn btn-primary mb-3 fload-left">
        Back To Clients
      </Link>
    );

    const createEditFields_5 = (categoryFullName, categoryName, categoryAbbrv, hideOrShow) => {
      return (
        <div className="w-100">
          <button
            className="btn btn-info d-block w-100 mb-5"
            type="button"
            data-toggle="collapse"
            data-target={`#${categoryName}`}
            aria-expanded="true"
            aria-controls="collapseExample"
          >
            <h4 className="font-weight-light m-0">{categoryFullName}</h4>
          </button>
          <div className={`show collapse multi-collapse my-3`} id={categoryName}>
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-around mb-4 hide-btn-col">
                <div className="form-check">
                  <input
                    name={`${categoryAbbrv}_fb`}
                    checked={this.state[categoryAbbrv + '_fb']}
                    onChange={this.toggleShowBtn}
                    type="checkbox"
                    className="form-check-input"
                    id={categoryAbbrv + 'btnCheck1'}
                  />
                  <label className="form-check-label" htmlFor={categoryAbbrv + 'btnCheck1'}>
                    <i className="fa fa-facebook" />
                  </label>
                </div>

                <div className="form-check">
                  <input
                    name={`${categoryAbbrv}_tw`}
                    checked={this.state[categoryAbbrv + '_tw']}
                    onChange={this.toggleShowBtn}
                    type="checkbox"
                    className="form-check-input"
                    id={categoryAbbrv + 'btnCheck2'}
                  />
                  <label className="form-check-label" htmlFor={categoryAbbrv + 'btnCheck2'}>
                    <i className="fa fa-twitter" />
                  </label>
                </div>

                <div className="form-check">
                  <input
                    name={`${categoryAbbrv}_ig`}
                    checked={this.state[categoryAbbrv + '_ig']}
                    onChange={this.toggleShowBtn}
                    type="checkbox"
                    className="form-check-input"
                    id={categoryAbbrv + 'btnCheck3'}
                  />
                  <label className="form-check-label" htmlFor={categoryAbbrv + 'btnCheck3'}>
                    <i className="fa fa-instagram" />
                  </label>
                </div>

                <div className="form-check">
                  <input
                    name={`${categoryAbbrv}_ln`}
                    checked={this.state[categoryAbbrv + '_ln']}
                    onChange={this.toggleShowBtn}
                    type="checkbox"
                    className="form-check-input"
                    id={categoryAbbrv + 'btnCheck4'}
                  />
                  <label className="form-check-label" htmlFor={categoryAbbrv + 'btnCheck4'}>
                    <i className="fa fa-linkedin" />
                  </label>
                </div>

                <div className="form-check">
                  <input
                    name={`${categoryAbbrv}_pt`}
                    checked={this.state[categoryAbbrv + '_pt']}
                    onChange={this.toggleShowBtn}
                    type="checkbox"
                    className="form-check-input"
                    id={categoryAbbrv + 'btnCheck5'}
                  />
                  <label className="form-check-label" htmlFor={categoryAbbrv + 'btnCheck5'}>
                    <i className="fa fa-pinterest" />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 current">
                <NumInputField
                  icon="facebook"
                  divClassName={this.state[categoryAbbrv + '_fb'] ? '' : 'hide'}
                  classname={categoryAbbrv + ' fb'}
                  placeholder="Current Facebook Followers"
                  value={
                    isEmpty(client[categoryName] && client[categoryName].fb_x)
                      ? 0
                      : client[categoryName].fb_x
                  }
                  onChange={this.handleChange}
                />
                <NumInputField
                  icon="twitter"
                  divClassName={this.state[categoryAbbrv + '_tw'] ? '' : 'hide'}
                  classname={categoryAbbrv + ' tw'}
                  placeholder="Current Twitter Followers"
                  value={
                    isEmpty(client[categoryName] && client[categoryName].tw_x)
                      ? 0
                      : client[categoryName].tw_x
                  }
                  onChange={this.handleChange}
                />
                <NumInputField
                  icon="instagram"
                  divClassName={this.state[categoryAbbrv + '_ig'] ? '' : 'hide'}
                  classname={categoryAbbrv + ' ig'}
                  placeholder="Current Instagram Followers"
                  value={
                    isEmpty(client[categoryName] && client[categoryName].ig_x)
                      ? 0
                      : client[categoryName].ig_x
                  }
                  onChange={this.handleChange}
                />
                <NumInputField
                  icon="linkedin"
                  divClassName={this.state[categoryAbbrv + '_ln'] ? '' : 'hide'}
                  classname={categoryAbbrv + ' ln'}
                  placeholder="Current LinkedIn Followers"
                  value={
                    isEmpty(client[categoryName] && client[categoryName].ln_x)
                      ? 0
                      : client[categoryName].ln_x
                  }
                  onChange={this.handleChange}
                />
                <NumInputField
                  icon="pinterest"
                  divClassName={this.state[categoryAbbrv + '_pt'] ? '' : 'hide'}
                  classname={categoryAbbrv + ' pn'}
                  placeholder="Current Pinterest Followers"
                  value={
                    isEmpty(client[categoryName] && client[categoryName].pt_x)
                      ? 0
                      : client[categoryName].pt_x
                  }
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-sm-6 rangeSlider">
                <ReactTooltip effect="solid" />
                <div className="range-slider">
                  <i
                    data-tip={`Progress: ${
                      (isEmpty(client[categoryName] && client[categoryName].fb_x)
                        ? ''
                        : client[categoryName].fb_x / client[categoryName].fb_y) *
                        100 >=
                      100
                        ? '100%'
                        : isEmpty(client[categoryName] && client[categoryName].fb_x)
                          ? ''
                          : Math.round((client[categoryName].fb_x / client[categoryName].fb_y) * 100) +
                            '%'
                    }`}
                    className={this.state[categoryAbbrv + '_fb'] ? 'fa fa-facebook' : 'hide'}
                    style={{
                      left:
                        (isEmpty(client[categoryName] && client[categoryName].fb_x)
                          ? ''
                          : client[categoryName].fb_x / client[categoryName].fb_y) *
                          100 >=
                        100
                          ? '100%'
                          : isEmpty(client[categoryName] && client[categoryName].fb_x)
                            ? ''
                            : (client[categoryName].fb_x / client[categoryName].fb_y) * 100 + '%'
                    }}
                  />
                  <i
                    data-tip={`Progress: ${
                      (isEmpty(client[categoryName] && client[categoryName].tw_x)
                        ? ''
                        : client[categoryName].tw_x / client[categoryName].tw_y) *
                        100 >=
                      100
                        ? '100%'
                        : isEmpty(client[categoryName] && client[categoryName].tw_x)
                          ? ''
                          : Math.round((client[categoryName].tw_x / client[categoryName].tw_y) * 100) +
                            '%'
                    }`}
                    className={this.state[categoryAbbrv + '_tw'] ? 'fa fa-twitter' : 'hide'}
                    style={{
                      left:
                        (isEmpty(client[categoryName] && client[categoryName].tw_x)
                          ? ''
                          : client[categoryName].tw_x / client[categoryName].tw_y) *
                          100 >=
                        100
                          ? '100%'
                          : isEmpty(client[categoryName] && client[categoryName].tw_x)
                            ? ''
                            : (client[categoryName].tw_x / client[categoryName].tw_y) * 100 + '%'
                    }}
                  />
                  <i
                    data-tip={`Progress: ${
                      (isEmpty(client[categoryName] && client[categoryName].ig_x)
                        ? ''
                        : client[categoryName].ig_x / client[categoryName].ig_y) *
                        100 >=
                      100
                        ? '100%'
                        : isEmpty(client[categoryName] && client[categoryName].ig_x)
                          ? ''
                          : Math.round((client[categoryName].ig_x / client[categoryName].ig_y) * 100) +
                            '%'
                    }`}
                    className={this.state[categoryAbbrv + '_ig'] ? 'fa fa-instagram' : 'hide'}
                    style={{
                      left:
                        (isEmpty(client[categoryName] && client[categoryName].ig_x)
                          ? ''
                          : client[categoryName].ig_x / client[categoryName].ig_y) *
                          100 >=
                        100
                          ? '100%'
                          : isEmpty(client[categoryName] && client[categoryName].ig_x)
                            ? ''
                            : (client[categoryName].ig_x / client[categoryName].ig_y) * 100 + '%'
                    }}
                  />
                  <i
                    data-tip={`Progress: ${
                      (isEmpty(client[categoryName] && client[categoryName].ln_x)
                        ? ''
                        : client[categoryName].ln_x / client[categoryName].ln_y) *
                        100 >=
                      100
                        ? '100%'
                        : isEmpty(client[categoryName] && client[categoryName].ln_x)
                          ? ''
                          : Math.round((client[categoryName].ln_x / client[categoryName].ln_y) * 100) +
                            '%'
                    }`}
                    className={this.state[categoryAbbrv + '_ln'] ? 'fa fa-linkedin' : 'hide'}
                    style={{
                      left:
                        (isEmpty(client[categoryName] && client[categoryName].ln_x)
                          ? ''
                          : client[categoryName].ln_x / client[categoryName].ln_y) *
                          100 >=
                        100
                          ? '100%'
                          : isEmpty(client[categoryName] && client[categoryName].ln_x)
                            ? ''
                            : (client[categoryName].ln_x / client[categoryName].ln_y) * 100 + '%'
                    }}
                  />
                  <i
                    data-tip={`Progress: ${
                      (isEmpty(client[categoryName] && client[categoryName].pt_x)
                        ? ''
                        : client[categoryName].pt_x / client[categoryName].pt_y) *
                        100 >=
                      100
                        ? '100%'
                        : isEmpty(client[categoryName] && client[categoryName].pt_x)
                          ? ''
                          : Math.round((client[categoryName].pt_x / client[categoryName].pt_y) * 100) +
                            '%'
                    }`}
                    className={this.state[categoryAbbrv + '_pt'] ? 'fa fa-pinterest' : 'hide'}
                    style={{
                      left:
                        (isEmpty(client[categoryName] && client[categoryName].pt_x)
                          ? ''
                          : client[categoryName].pt_x / client[categoryName].pt_y) *
                          100 >=
                        100
                          ? '100%'
                          : isEmpty(client[categoryName] && client[categoryName].pt_x)
                            ? ''
                            : (client[categoryName].pt_x / client[categoryName].pt_y) * 100 + '%'
                    }}
                  />
                </div>
              </div>
              <div className="col-sm-3 goal">
                <NumInputField
                  icon="facebook"
                  divClassName={this.state[categoryAbbrv + '_fb'] ? '' : 'hide'}
                  classname={categoryAbbrv + ' fb'}
                  placeholder="Goal"
                  value={
                    isEmpty(client[categoryName] && client[categoryName].fb_y)
                      ? 0
                      : client[categoryName].fb_y
                  }
                  onChange={this.handleChange}
                />
                <NumInputField
                  icon="twitter"
                  divClassName={this.state[categoryAbbrv + '_tw'] ? '' : 'hide'}
                  classname={categoryAbbrv + ' tw'}
                  placeholder="Goal"
                  value={
                    isEmpty(client[categoryName] && client[categoryName].tw_y)
                      ? 0
                      : client[categoryName].tw_y
                  }
                  onChange={this.handleChange}
                />
                <NumInputField
                  icon="instagram"
                  divClassName={this.state[categoryAbbrv + '_ig'] ? '' : 'hide'}
                  classname={categoryAbbrv + ' ig'}
                  placeholder="Goal"
                  value={
                    isEmpty(client[categoryName] && client[categoryName].ig_y)
                      ? 0
                      : client[categoryName].ig_y
                  }
                  onChange={this.handleChange}
                />
                <NumInputField
                  icon="linkedin"
                  divClassName={this.state[categoryAbbrv + '_ln'] ? '' : 'hide'}
                  classname={categoryAbbrv + ' ln'}
                  placeholder="Goal"
                  value={
                    isEmpty(client[categoryName] && client[categoryName].ln_y)
                      ? 0
                      : client[categoryName].ln_y
                  }
                  onChange={this.handleChange}
                />
                <NumInputField
                  icon="pinterest"
                  divClassName={this.state[categoryAbbrv + '_pt'] ? '' : 'hide'}
                  classname={categoryAbbrv + ' pn'}
                  placeholder="Goal"
                  value={
                    isEmpty(client[categoryName] && client[categoryName].pt_y)
                      ? 0
                      : client[categoryName].pt_y
                  }
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-sm-12 before">
                <hr />
                <h6 className="font-weight-light mt-2">Starting {categoryFullName}</h6>
                <ul className="d-flex justify-content-between list-unstyled">
                  <li className={this.state[categoryAbbrv + '_fb'] ? '' : 'hide'}>
                    <NumInputField
                      icon="facebook"
                      classname={categoryAbbrv + ' fb'}
                      placeholder="Starting"
                      value={
                        isEmpty(client[categoryName] && client[categoryName].b4_fb)
                          ? 0
                          : client[categoryName].b4_fb
                      }
                      onChange={this.handleChange}
                    />
                  </li>
                  <li className={this.state[categoryAbbrv + '_tw'] ? '' : 'hide'}>
                    <NumInputField
                      icon="twitter"
                      classname={categoryAbbrv + ' tw'}
                      placeholder="Starting"
                      value={
                        isEmpty(client[categoryName] && client[categoryName].b4_tw)
                          ? 0
                          : client[categoryName].b4_tw
                      }
                      onChange={this.handleChange}
                    />
                  </li>
                  <li className={this.state[categoryAbbrv + '_ig'] ? '' : 'hide'}>
                    <NumInputField
                      icon="instagram"
                      classname={categoryAbbrv + ' ig'}
                      placeholder="Starting"
                      value={
                        isEmpty(client[categoryName] && client[categoryName].b4_ig)
                          ? 0
                          : client[categoryName].b4_ig
                      }
                      onChange={this.handleChange}
                    />
                  </li>
                  <li className={this.state[categoryAbbrv + '_ln'] ? '' : 'hide'}>
                    <NumInputField
                      icon="linkedin"
                      classname={categoryAbbrv + ' ln'}
                      placeholder="Starting"
                      value={
                        isEmpty(client[categoryName] && client[categoryName].b4_ln)
                          ? 0
                          : client[categoryName].b4_ln
                      }
                      onChange={this.handleChange}
                    />
                  </li>
                  <li className={this.state[categoryAbbrv + '_pt'] ? '' : 'hide'}>
                    <NumInputField
                      icon="pinterest"
                      classname={categoryAbbrv + ' pt'}
                      placeholder="Starting"
                      value={
                        isEmpty(client[categoryName] && client[categoryName].b4_pt)
                          ? 0
                          : client[categoryName].b4_pt
                      }
                      onChange={this.handleChange}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    };

    if (client === null || loading) {
      clientContent = <Spinner />;
    } else if (client.name !== user.clientRoleAccess && user.role !== 'admin' && user.role !== 'user') {
      clientContent = <h1>Sorry You're Not Allowed Here</h1>;
    } else {
      clientContent = (
        <div>
          {isAuthenticated && user.role !== 'client' ? authLinks : clientLinks}

          <div className="col-md-12 m-auto mt-5">
            <h1 className="display-4 text-center">
              {client.name} <span className="lead">{today.toLocaleDateString('en-US', options)}</span>
            </h1>
            <div className="row">
              {/* <CreateEditFieldsNew
                client={client}
                categoryFullName="Page Followers"
                categoryName="pageFollowers"
                categoryAbbrv="pgf"
                // onChange={this.toggleShowBtn}
                onChange={() => this.toggleShowBtn()}
              /> */}
              {createEditFields_5('Page Followers', 'pageFollowers', 'pgf')}
              {createEditFields_5('Impressions', 'impressions', 'imp')}
              {createEditFields_5('Reach', 'reach', 'reach')}
              {createEditFields_5('Engagement', 'engagement', 'eng')}

              <div className="w-100">
                <button
                  className="btn btn-info d-block w-100 mb-5"
                  type="button"
                  data-toggle="collapse"
                  data-target="#site_traffic"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <h4 className="font-weight-light m-0">Site Traffic</h4>
                </button>
                <div className="show collapse multi-collapse my-3" id="site_traffic">
                  <div className="row">
                    <div className="col-sm-3 current">
                      <NumInputField
                        icon="laptop"
                        name="web_x"
                        classname="web"
                        placeholder="Current Web Traffic"
                        value={
                          isEmpty(client.siteTraffic && client.siteTraffic.x) ? 0 : client.siteTraffic.x
                        }
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-sm-6 rangeSlider">
                      <div className="range-slider client">
                        <i
                          data-tip={`Progress: ${
                            (isEmpty(client.siteTraffic && client.siteTraffic.x)
                              ? ''
                              : client.siteTraffic.x / client.siteTraffic.y) *
                              100 >=
                            100
                              ? '100%'
                              : isEmpty(client.siteTraffic && client.siteTraffic.x)
                                ? ''
                                : Math.round((client.siteTraffic.x / client.siteTraffic.y) * 100) + '%'
                          }`}
                          className="fa fa-code"
                          style={{
                            left:
                              (isEmpty(client.siteTraffic && client.siteTraffic.x)
                                ? ''
                                : client.siteTraffic.x / client.siteTraffic.y) *
                                100 >=
                              100
                                ? '100%'
                                : isEmpty(client.siteTraffic && client.siteTraffic.x)
                                  ? ''
                                  : (client.siteTraffic.x / client.siteTraffic.y) * 100 + '%'
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
                        value={
                          isEmpty(client.siteTraffic && client.siteTraffic.y) ? 0 : client.siteTraffic.y
                        }
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="col-sm-12 before">
                      <hr />
                      <h6 className="font-weight-light mt-2">Starting Site Traffic</h6>
                      <ul className="d-flex justify-content-between list-unstyled">
                        <li>
                          <NumInputField
                            icon="laptop"
                            classname="web_x"
                            placeholder="Starting"
                            value={
                              isEmpty(client.siteTraffic && client.siteTraffic.web_b4)
                                ? 0
                                : client.siteTraffic.web_b4
                            }
                            onChange={this.handleChange}
                          />
                        </li>
                      </ul>
                    </div>
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
