const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSocialRender(data) {
  let errorsObj = {};

  data.comment = !isEmpty(data.comment) ? data.comment : '';

  if (Validator.isEmpty(data.comment)) {
    errorsObj.clientName = 'Nothing Was Entered';
  }

  return {
    errorsObj,
    isValid: isEmpty(errorsObj)
  };
};
