import React, { Component } from 'react';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import PropTypes from 'prop-types';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null
    };
  }
  render() {
    // console.log(moment(this.state.date).format());
    return (
      <div>
        <SingleDatePicker
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          id="your_unique_id_what" // PropTypes.string.isRequired,
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  target: PropTypes.string
};

export default DatePicker;
