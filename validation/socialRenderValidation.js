const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSocialRender(data) {
  let errorsObj = {};

  data.clientName = !isEmpty(data.clientName) ? data.clientName : '';
  data.clientInitials = !isEmpty(data.clientInitials) ? data.clientInitials : '';

  if (Validator.isEmpty(data.clientName)) {
    errorsObj.clientName = 'Client Name Field is Required';
  }
  if (Validator.isEmpty(data.clientInitials)) {
    errorsObj.clientInitials = 'Client Initials Field is Required';
  }

  return {
    errorsObj,
    isValid: isEmpty(errorsObj)
  };
};
