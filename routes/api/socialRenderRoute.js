const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const SocialRenderModel = require('../../model/SocialRenderModel');
const validateSocialRender = require('../../validation/socialRenderValidation');

// GET all social render profiles
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

router.post('/', (req, res) => {
  const socialRenderContent = new SocialRenderModel({
    clientName: req.body.clientName,
    clientInitials: req.body.clientInitials,
    contentCopy: req.body.contentCopy,
    imgLink: req.body.imgLink,
    imgLinkInstagram: req.body.imgLinkInstagram,
    dateGoingLive: req.body.dateGoingLive
  });

  socialRenderContent
    .save()
    .then(socialRenderContent => res.json(socialRenderContent))
    .catch(err => console.log(err));
});

module.exports = router;
