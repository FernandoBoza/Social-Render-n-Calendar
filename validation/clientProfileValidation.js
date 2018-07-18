const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateClientProfileInput(data) {
  let errorsObj = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.handle = !isEmpty(data.handle) ? data.handle : data.name;

  if (Validator.isEmpty(data.name)) {
    errorsObj.name = 'Client name is required';
  }

  //   if (Validator.isEmpty(data.handle)) {
  //     errorsObj.handle = 'Client handle is required';
  //   }

  return {
    errorsObj,
    isValid: isEmpty(errorsObj)
  };
};
