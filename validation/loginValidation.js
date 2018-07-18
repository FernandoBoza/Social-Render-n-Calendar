const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errorsObj = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errorsObj.email = 'Email Field is Invalid';
  }
  if (Validator.isEmpty(data.email)) {
    errorsObj.email = 'Email Field is Required';
  }
  if (Validator.isEmpty(data.password)) {
    errorsObj.password = 'Password Field is Invalid';
  }

  return {
    errorsObj,
    isValid: isEmpty(errorsObj)
  };
};
