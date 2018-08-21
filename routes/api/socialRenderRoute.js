const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const SocialRenderModel = require('../../model/SocialRenderModel');
const validateSocialRender = require('../../validation/socialRenderValidation');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errorsObj, isValid } = validateSocialRender(req.body);
    const trimHandle = n => n.toLowerCase().replace(/\s/g, '_');

    if (!isValid) {
      return res.status(404).json(errorsObj);
    }

    const socialRenderContent = new SocialRenderModel({
      clientName: req.body.clientName,
      clientInitials: req.body.clientInitials,
      clientHandle: trimHandle(req.body.clientName),
      contentCopy: req.body.contentCopy,
      contentTwitterCopy: req.body.contentTwitterCopy,
      contentInstagramCopy: req.body.contentInstagramCopy,
      imgLink: req.body.imgLink,
      imgLinkInstagram: req.body.imgLinkInstagram,
      dateGoingLive: req.body.dateGoingLive
    });

    socialRenderContent
      .save()
      .then(socialRenderContent => res.json(socialRenderContent))
      .catch(err => console.log(err));
  }
);

router.put(
  '/:id/edit-client',
  passport.authenticate('jwt', { session: false }),
  (res, req) => {
    const { errorsObj, isValid } = validateSocialRender(req.body);
    if (!isValid) {
      return res.status(404).json(errorsObj);
    }

    SocialRenderModel.findOneAndUpdate(
      { clientName: req.body.clientName },
      { clientInitials: req.body.clientInitials },
      { clientHandle: trimHandle(req.body.clientName) },
      { contentCopy: req.body.contentCopy },
      { contentTwitterCopy: req.body.contentTwitterCopy },
      { contentInstagramCopy: req.body.contentInstagramCopy },
      { imgLink: req.body.imgLink },
      { imgLinkInstagram: req.body.imgLinkInstagram },
      { dateGoingLive: req.body.dateGoingLive },
      { new: true }
    )
      .then(client => res.json(client))
      .catch(err => res.status(404).json(err));
  }
);

// @GET api/clients
// @desc Get All Clients
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errorsObj = {};
    SocialRenderModel.find()
      .then(content => {
        if (!content) {
          errorsObj.noclient = 'There is no content';
          return res.status(404).json(errorsObj);
        }
        res.json(content);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @GET api/clients/id/:id
// @desc Get by client id
router.get(
  '/:_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errorsObj = {};
    SocialRenderModel.findOne({ _id: req.params._id })
      .then(content => {
        if (!content) {
          errorsObj.noclient = 'There is no content';
          return res.status(404).json(errorsObj);
        }
        res.json(content);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
