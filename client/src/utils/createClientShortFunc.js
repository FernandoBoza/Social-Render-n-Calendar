import React from 'react';
import PropTypes from 'prop-types';
import TextInputField from '../components/common/TextInputField';

const CreateCategory = ({ cat_name, cat_abrv }) => {
  return (
    <div>
      <h4 className="font-weight-light mt-5">{cat_name}</h4>
      <div className="row">
        <div className="col-sm-3 current">
          <TextInputField icon="facebook" name={`${cat_abrv}_fb_x`} classname={cat_abrv + 'fb'} placeholder="Current" value={this.state.cat_abrv + '_fb_x'} onChange={this.handleChange} />
          <TextInputField icon="twitter" name={`${cat_abrv}_tw_x`} classname={cat_abrv + 'tw'} placeholder="Current" value={this.state.cat_abrv + '_tw_x'} onChange={this.handleChange} />
          <TextInputField icon="instagram" name={`${cat_abrv}_ig_x`} classname={cat_abrv + 'ig'} placeholder="Current" value={this.state.cat_abrv + '_ig_x'} onChange={this.handleChange} />
          <TextInputField icon="linkedin" name={`${cat_abrv}_ln_x`} classname={cat_abrv + 'ln'} placeholder="Current" value={this.state.cat_abrv + '_ln_x'} onChange={this.handleChange} />
          <TextInputField icon="pinterest" name={`${cat_abrv}_pt_x`} classname={cat_abrv + 'pn'} placeholder="Current" value={this.state.cat_abrv + '_pt_x'} onChange={this.handleChange} />
        </div>

        <div className="col-sm-6 rangeSlider">
          <div className="range-slider">
            <i
              className="fa fa-facebook"
              style={{
                left: (this.state.cat_abrv + '_fb_x' / this.state.cat_abrv + '_fb_y') * 100 + '%'
              }}
            />
            <i
              className="fa fa-twitter"
              style={{
                left: (this.state.cat_abrv + '_tw_x' / this.state.cat_abrv + '_tw_y') * 100 + '%'
              }}
            />
            <i
              className="fa fa-linkedin"
              style={{
                left: (this.state.cat_abrv + '_ln_x' / this.state.cat_abrv + '_ln_y') * 100 + '%'
              }}
            />
            <i
              className="fa fa-pinterest"
              style={{
                left: (this.state.cat_abrv + '_pt_x' / this.state.cat_abrv + '_pt_y') * 100 + '%'
              }}
            />
            <i
              className="fa fa-instagram"
              style={{
                left: (this.state.cat_abrv + '_ig_x' / this.state.cat_abrv + '_ig_y') * 100 + '%'
              }}
            />
          </div>
        </div>

        <div className="col-sm-3 goal">
          <TextInputField icon="facebook" name={`${cat_abrv}_fb_y`} classname={cat_abrv + 'fb'} placeholder="Goal Facebook" value={this.state.cat_abrv + '_fb_y'} onChange={this.handleChange} />
          <TextInputField icon="twitter" name={`${cat_abrv}_tw_y`} classname={cat_abrv + 'tw'} placeholder="Goal Twitter" value={this.state.cat_abrv + '_tw_y'} onChange={this.handleChange} />
          <TextInputField icon="instagram" name={`${cat_abrv}_ig_y`} classname={cat_abrv + 'ig'} placeholder="Goal Instagram" value={this.state.cat_abrv + '_ig_y'} onChange={this.handleChange} />
          <TextInputField icon="linkedin" name={`${cat_abrv}_ln_y`} classname={cat_abrv + 'ln'} placeholder="Goal LinkedIn" value={this.state.cat_abrv + '_ln_y'} onChange={this.handleChange} />
          <TextInputField icon="pinterest" name={`${cat_abrv}_pt_y`} classname={cat_abrv + 'pn'} placeholder="Goal Pinterest" value={this.state.cat_abrv + '_pt_y'} onChange={this.handleChange} />
        </div>

        <div className="col-sm-12 before">
          <h6 className="font-weight-light mt-2">Starting {cat_name}</h6>
          <ul className="d-flex justify-content-between list-unstyled">
            <li>
              <TextInputField icon="facebook" name={`${cat_abrv}_b4_fb`} classname={`${cat_abrv} fb`} placeholder="Starting" value={this.state.cat_abrv + '_b4_fb'} onChange={this.handleChange} />
            </li>
            <li>
              <TextInputField icon="twitter" name={`${cat_abrv}_b4_tw`} classname={`${cat_abrv} tw`} placeholder="Starting" value={this.state.cat_abrv + '_b4_tw'} onChange={this.handleChange} />
            </li>
            <li>
              <TextInputField icon="instagram" name={`${cat_abrv}_b4_ig`} classname={`${cat_abrv} ig`} placeholder="Starting" value={this.state.cat_abrv + '_b4_ig'} onChange={this.handleChange} />
            </li>
            <li>
              <TextInputField icon="linkedin" name={`${cat_abrv}_b4_ln`} classname={`${cat_abrv} ln`} placeholder="Starting" value={this.state.cat_abrv + '_b4_ln'} onChange={this.handleChange} />
            </li>
            <li>
              <TextInputField icon="pinterest" name={`${cat_abrv}_b4_pt`} classname={`${cat_abrv} pn`} placeholder="Starting" value={this.state.cat_abrv + '_b4_pt'} onChange={this.handleChange} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
CreateCategory.propTypes = {
  cat_name: PropTypes.string,
  cat_abrv: PropTypes.string
};
export default CreateCategory;
