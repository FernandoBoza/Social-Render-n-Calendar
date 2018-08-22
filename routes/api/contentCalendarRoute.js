const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const SocialRenderModel = require('../../model/SocialRenderModel');
const validateSocialRender = require('../../validation/socialRenderValidation');

// GET all social render profiles
// @desc Get All Social Render Contents
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
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
  }
);

// @GET api/calendar/name/:clientName
// @desc Get by client clientName
router.get(
  '/:clientHandle',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errorsObj = {};
    SocialRenderModel.find({ clientHandle: req.params.clientHandle })
      .then(socialRenderContent => {
        if (!socialRenderContent) {
          errorsObj.noclient = 'There is no client';
          res.status(404).json(errorsObj);
        }

        res.json(socialRenderContent);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
