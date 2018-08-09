const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const SocialRenderModel = require('../../model/SocialRenderModel');
const validateSocialRender = require('../../validation/socialRenderValidation');

// GET all social render profiles
// @desc Get All Social Render Contents
router.get('/', (req, res) => {
  const errorsObj = {};
  SocialRenderModel.find()
    .then(socialRenderContent => {
      if (!socialRenderContent) {
        errorsObj.noSocialRender = 'There is no Social Render ';
        return res.status(404).json(errorsObj);
      }
      res.json(socialRenderContent);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
