const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSocialRender(data) {
  let errorsObj = {};

  data.clientName = !isEmpty(data.clientName) ? data.clientName : '';
  data.clientInitials = !isEmpty(data.clientInitials) ? data.clientInitials : '';
  data.contentCopy = !isEmpty(data.contentCopy) ? data.contentCopy : '';
  data.imgLink = !isEmpty(data.imgLink) ? data.imgLink : '';
  data.imgLinkInstagram = !isEmpty(data.imgLinkInstagram) ? data.imgLinkInstagram : '';

  if (Validator.isEmpty(data.clientName)) {
    errorsObj.clientName = 'Client Name Field is Required';
  }
  if (Validator.isEmpty(data.clientInitials)) {
    errorsObj.clientInitials = 'Client Initials Field is Required';
  }
  if (Validator.isEmpty(data.contentCopy)) {
    errorsObj.contentCopy = 'Content Copy Field is Required';
  }
  if (Validator.isEmpty(data.imgLink)) {
    errorsObj.imgLink = 'Img Link Field is Required';
  }
  if (Validator.isEmpty(data.imgLinkInstagram)) {
    errorsObj.imgLinkInstagram = 'Img Link Instagram Field is Required';
  }

  return {
    errorsObj,
    isValid: isEmpty(errorsObj)
  };
};
