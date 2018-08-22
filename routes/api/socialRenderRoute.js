const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const SocialRenderModel = require('../../model/SocialRenderModel');
const validateSocialRender = require('../../validation/socialRenderValidation');

// @GET api/social-render
// @desc Get all content
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
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
});

// @GET api/clients/id/:id
// @desc Get by client id
router.get('/id/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
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
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
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
});

router.put('/id/:_id/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errorsObj, isValid } = validateSocialRender(req.body);
  const trimHandle = n => n.toLowerCase().replace(/\s/g, '_');
  const contentUpdates = {};
  if (!isValid) {
    return res.status(404).json(errorsObj);
  }

  contentUpdates._id = req.params._id;
  if (req.body.clientName) contentUpdates.clientName = req.body.clientName;
  if (req.body.clientInitials) contentUpdates.clientInitials = req.body.clientInitials;
  if (req.body.clientHandle) contentUpdates.clientHandle = trimHandle(req.body.clientName);
  if (req.body.contentCopy) contentUpdates.contentCopy = req.body.contentCopy;
  if (req.body.contentTwitterCopy) contentUpdates.contentTwitterCopy = req.body.contentTwitterCopy;
  if (req.body.contentInstagramCopy) contentUpdates.contentInstagramCopy = req.body.contentInstagramCopy;
  if (req.body.imgLink) contentUpdates.imgLink = req.body.imgLink;
  if (req.body.imgLinkInstagram) contentUpdates.imgLinkInstagram = req.body.imgLinkInstagram;
  if (req.body.dateGoingLive) contentUpdates.dateGoingLive = req.body.dateGoingLive;

  SocialRenderModel.findOneAndUpdate({ _id: contentUpdates._id }, { $set: contentUpdates }, { new: true })
    .then(client => res.json(client))
    .catch(err => res.status(404).json(err));
});

module.exports = router;
