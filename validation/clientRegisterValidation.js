const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errorsObj = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errorsObj.name = 'Name Must Be Between 2 and 30 Characters';
  }
  if (Validator.isEmpty(data.name)) {
    errorsObj.name = 'Name Field is Required';
  }
  if (Validator.isEmpty(data.email)) {
    errorsObj.email = 'Email Field is Required';
  }
  if (!Validator.isEmail(data.email)) {
    errorsObj.email = 'Email Field is Invalid';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errorsObj.password = 'Password Must Be At Least 6 Characters';
  }
  if (Validator.isEmpty(data.password)) {
    errorsObj.password = 'Password Field is Invalid';
  }

  return {
    errorsObj,
    isValid: isEmpty(errorsObj)
  };
};
