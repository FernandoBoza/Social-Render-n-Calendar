import React from 'react';
import PropTypes from 'prop-types';
import NumInputField from '../../common/NumInputField';
import isEmpty from '../../../validation/is-empty';
import ReactTooltip from 'react-tooltip';

let toggleHello = e => {
  console.log('hello');
};

const CreateEditFields_5 = ({
  client,
  categoryFullName,
  categoryName,
  categoryAbbrv,
  toggleShowBtn
}) => {
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
                onChange={toggleHello}
                checked={categoryAbbrv}
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
                checked={categoryAbbrv}
                onChange={toggleShowBtn}
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
                checked={categoryAbbrv}
                onChange={toggleShowBtn}
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
                checked={categoryAbbrv}
                onChange={toggleShowBtn}
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
                checked={categoryAbbrv}
                onChange={toggleShowBtn}
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
              divClassName={categoryAbbrv ? '' : 'hide'}
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
              divClassName={categoryAbbrv ? '' : 'hide'}
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
              divClassName={categoryAbbrv ? '' : 'hide'}
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
              divClassName={categoryAbbrv ? '' : 'hide'}
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
              divClassName={categoryAbbrv ? '' : 'hide'}
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
                      : Math.round((client[categoryName].fb_x / client[categoryName].fb_y) * 100) + '%'
                }`}
                className={categoryAbbrv ? 'fa fa-facebook' : 'hide'}
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
                      : Math.round((client[categoryName].tw_x / client[categoryName].tw_y) * 100) + '%'
                }`}
                className={categoryAbbrv ? 'fa fa-twitter' : 'hide'}
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
                      : Math.round((client[categoryName].ig_x / client[categoryName].ig_y) * 100) + '%'
                }`}
                className={categoryAbbrv ? 'fa fa-instagram' : 'hide'}
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
                      : Math.round((client[categoryName].ln_x / client[categoryName].ln_y) * 100) + '%'
                }`}
                className={categoryAbbrv ? 'fa fa-linkedin' : 'hide'}
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
                      : Math.round((client[categoryName].pt_x / client[categoryName].pt_y) * 100) + '%'
                }`}
                className={categoryAbbrv ? 'fa fa-pinterest' : 'hide'}
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
              divClassName={categoryAbbrv ? '' : 'hide'}
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
              divClassName={categoryAbbrv ? '' : 'hide'}
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
              divClassName={categoryAbbrv ? '' : 'hide'}
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
              divClassName={categoryAbbrv ? '' : 'hide'}
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
              divClassName={categoryAbbrv ? '' : 'hide'}
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
              <li className={categoryAbbrv ? '' : 'hide'}>
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
              <li className={categoryAbbrv ? '' : 'hide'}>
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
              <li className={categoryAbbrv ? '' : 'hide'}>
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
              <li className={categoryAbbrv ? '' : 'hide'}>
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
              <li className={categoryAbbrv ? '' : 'hide'}>
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

CreateEditFields_5.propTypes = {
  client: PropTypes.object,
  categoryFullName: PropTypes.string,
  categoryName: PropTypes.string,
  categoryAbbrv: PropTypes.string,
  toggleShowBtn: PropTypes.func
};

export default CreateEditFields_5;
