import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getAClient, updateAClient } from '../../actions/clientActions';
import TextInputField from '../common/TextInputField';
import isEmpty from '../../validation/is-empty';

export class EditClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
      web_x: '',
      web_y: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
        pgf_fb_x: isEmpty(clients.pageFollowers && clients.pageFollowers.fb_x) ? '' : clients.pageFollowers.fb_x,
        pgf_fb_y: isEmpty(clients.pageFollowers && clients.pageFollowers.fb_y) ? '' : clients.pageFollowers.fb_y,
        pgf_ig_x: isEmpty(clients.pageFollowers && clients.pageFollowers.ig_x) ? '' : clients.pageFollowers.ig_x,
        pgf_ig_y: isEmpty(clients.pageFollowers && clients.pageFollowers.ig_y) ? '' : clients.pageFollowers.ig_y,
        pgf_tw_x: isEmpty(clients.pageFollowers && clients.pageFollowers.tw_x) ? '' : clients.pageFollowers.tw_x,
        pgf_tw_y: isEmpty(clients.pageFollowers && clients.pageFollowers.tw_y) ? '' : clients.pageFollowers.tw_y,
        pgf_ln_x: isEmpty(clients.pageFollowers && clients.pageFollowers.ln_x) ? '' : clients.pageFollowers.ln_x,
        pgf_ln_y: isEmpty(clients.pageFollowers && clients.pageFollowers.ln_y) ? '' : clients.pageFollowers.ln_y,
        pgf_pt_x: isEmpty(clients.pageFollowers && clients.pageFollowers.pt_x) ? '' : clients.pageFollowers.pt_x,
        pgf_pt_y: isEmpty(clients.pageFollowers && clients.pageFollowers.pt_y) ? '' : clients.pageFollowers.pt_y,
        eng_fb_x: isEmpty(clients.engagement && clients.engagement.fb_x) ? '' : clients.engagement.fb_x,
        eng_fb_y: isEmpty(clients.engagement && clients.engagement.fb_y) ? '' : clients.engagement.fb_y,
        eng_ig_x: isEmpty(clients.engagement && clients.engagement.ig_x) ? '' : clients.engagement.ig_x,
        eng_ig_y: isEmpty(clients.engagement && clients.engagement.ig_y) ? '' : clients.engagement.ig_y,
        eng_tw_x: isEmpty(clients.engagement && clients.engagement.tw_x) ? '' : clients.engagement.tw_x,
        eng_tw_y: isEmpty(clients.engagement && clients.engagement.tw_y) ? '' : clients.engagement.tw_y,
        eng_ln_x: isEmpty(clients.engagement && clients.engagement.ln_x) ? '' : clients.engagement.ln_x,
        eng_ln_y: isEmpty(clients.engagement && clients.engagement.ln_y) ? '' : clients.engagement.ln_y,
        eng_pt_x: isEmpty(clients.engagement && clients.engagement.pt_x) ? '' : clients.engagement.pt_x,
        eng_pt_y: isEmpty(clients.engagement && clients.engagement.pt_y) ? '' : clients.engagement.pt_y,
        imp_fb_x: isEmpty(clients.impressions && clients.impressions.fb_x) ? '' : clients.impressions.fb_x,
        imp_fb_y: isEmpty(clients.impressions && clients.impressions.fb_y) ? '' : clients.impressions.fb_y,
        imp_ig_x: isEmpty(clients.impressions && clients.impressions.ig_x) ? '' : clients.impressions.ig_x,
        imp_ig_y: isEmpty(clients.impressions && clients.impressions.ig_y) ? '' : clients.impressions.ig_y,
        imp_tw_x: isEmpty(clients.impressions && clients.impressions.tw_x) ? '' : clients.impressions.tw_x,
        imp_tw_y: isEmpty(clients.impressions && clients.impressions.tw_y) ? '' : clients.impressions.tw_y,
        imp_ln_x: isEmpty(clients.impressions && clients.impressions.ln_x) ? '' : clients.impressions.ln_x,
        imp_ln_y: isEmpty(clients.impressions && clients.impressions.ln_y) ? '' : clients.impressions.ln_y,
        imp_pt_x: isEmpty(clients.impressions && clients.impressions.pt_x) ? '' : clients.impressions.pt_x,
        imp_pt_y: isEmpty(clients.impressions && clients.impressions.pt_y) ? '' : clients.impressions.pt_y,
        web_x: isEmpty(clients.siteTraffic && clients.siteTraffic.x) ? '' : clients.siteTraffic.x,
        web_y: isEmpty(clients.siteTraffic && clients.siteTraffic.y) ? '' : clients.siteTraffic.y
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log([e.target.name] + ' : ' + e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();

    const clientData = {
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
      web_x: this.state.web_x,
      web_y: this.state.web_y
    };
    this.props.updateAClient(this.props.match.params.handle, clientData);
    console.log(clientData);
  };

  sortThroughObj = clients => {
    return clients.pageFollowers;
  };

  render() {
    const { clients, loading } = this.props.clients;
    let clientContent;

    if (clients === null || loading) {
      clientContent = <Spinner />;
    } else {
      clientContent = (
        <div>
          <Link to={`/clients/${this.props.match.params.handle}`} className="btn btn-primary mb-3 fload-left">
            Back To {clients.name}
          </Link>
          <form onSubmit={this.handleSubmit}>
            <div className="col-md-12 m-auto">
              <h1 className="display-4 text-center">Edit {clients.name}</h1>
              <div className="row" />
              <button className="btn btn-info d-block w-100 mb-5" type="button" data-toggle="collapse" data-target="#pageFollowers" aria-expanded="true" aria-controls="collapseExample">
                <h4 className="font-weight-light m-0">Page Followers</h4>
              </button>
              <div className="collapse show my-3" id="pageFollowers">
                <div className="row">
                  <div className="col-sm-3 current">
                    <TextInputField icon="facebook" name="pgf_fb_x" classname="pgf fb" placeholder="Current Facebook Followers" value={this.state.pgf_fb_x.toString()} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="pgf_tw_x" classname="pgf tw" placeholder="Current Twitter Followers" value={this.state.pgf_tw_x.toString()} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="pgf_ig_x" classname="pgf ig" placeholder="Current Instagram Followers" value={this.state.pgf_ig_x.toString()} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="pgf_ln_x" classname="pgf ln" placeholder="Current LinkedIn Followers" value={this.state.pgf_ln_x.toString()} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="pgf_pt_x" classname="pgf pn" placeholder="Current Pinterest Followers" value={this.state.pgf_pt_x.toString()} onChange={this.handleChange} />
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
                          left: (this.state.pgf_ig_x / this.state.pgf_ig_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-pinterest"
                        style={{
                          left: (this.state.pgf_ln_x / this.state.pgf_ln_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-instagram"
                        style={{
                          left: (this.state.pgf_pt_x / this.state.pgf_pt_y) * 100 + '%'
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 goal">
                    <TextInputField icon="facebook" name="pgf_fb_y" classname="pgf fb" placeholder="Goal Facebook Followers" value={this.state.pgf_fb_y.toString()} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="pgf_tw_y" classname="pgf tw" placeholder="Goal Twitter Followers" value={this.state.pgf_tw_y.toString()} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="pgf_ig_y" classname="pgf ig" placeholder="Goal Instagram Followers" value={this.state.pgf_ig_y.toString()} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="pgf_ln_y" classname="pgf ln" placeholder="Goal LinkedIn Followers" value={this.state.pgf_ln_y.toString()} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="pgf_pt_y" classname="pgf pn" placeholder="Goal Pinterest Followers" value={this.state.pgf_pt_y.toString()} onChange={this.handleChange} />
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
                    <TextInputField icon="facebook" name="eng_fb_x" classname="eng fb" placeholder="Current Facebook Engagement" value={this.state.eng_fb_x.toString()} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="eng_tw_x" classname="eng tw" placeholder="Current Twitter Engagement" value={this.state.eng_tw_x.toString()} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="eng_ig_x" classname="eng ig" placeholder="Current Instagram Engagement" value={this.state.eng_ig_x.toString()} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="eng_ln_x" classname="eng ln" placeholder="Current LinkedIn Engagement" value={this.state.eng_ln_x.toString()} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="eng_pt_x" classname="eng pn" placeholder="Current Pinterest Engagement" value={this.state.eng_pt_x.toString()} onChange={this.handleChange} />
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
                          left: (this.state.eng_ig_x / this.state.eng_ln_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-pinterest"
                        style={{
                          left: (this.state.eng_ln_x / this.state.eng_pt_y) * 100 + '%'
                        }}
                      />
                      <i
                        className="fa fa-instagram"
                        style={{
                          left: (this.state.eng_pt_x / this.state.eng_ig_y) * 100 + '%'
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 goal">
                    <TextInputField icon="facebook" name="eng_fb_y" classname="eng fb" placeholder="Goal Facebook Engagement" value={this.state.eng_fb_y.toString()} onChange={this.handleChange} />
                    <TextInputField icon="twitter" name="eng_tw_y" classname="eng tw" placeholder="Goal Twitter Engagement" value={this.state.eng_tw_y.toString()} onChange={this.handleChange} />
                    <TextInputField icon="instagram" name="eng_ig_y" classname="eng ig" placeholder="Goal Instagram Engagement" value={this.state.eng_ig_y.toString()} onChange={this.handleChange} />
                    <TextInputField icon="linkedin" name="eng_ln_y" classname="eng ln" placeholder="Goal LinkedIn Engagement" value={this.state.eng_ln_y.toString()} onChange={this.handleChange} />
                    <TextInputField icon="pinterest" name="eng_pt_y" classname="eng pn" placeholder="Goal Pinterest Engagement" value={this.state.eng_pt_y.toString()} onChange={this.handleChange} />
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
            <button className="btn btn-lg btn-outline-primary btn-block mt-3" type="submit">
              Update {clients.name}
            </button>
          </form>
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

EditClient.propTypes = {
  clients: PropTypes.object.isRequired,
  getAClient: PropTypes.func.isRequired,
  updateAClient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clients: state.clients
});

export default connect(
  mapStateToProps,
  { getAClient, updateAClient }
)(EditClient);
