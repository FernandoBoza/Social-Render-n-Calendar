const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const SocialRenderModel = require('../../model/SocialRenderModel');
const validateSocialRender = require('../../validation/socialRenderValidation');

router.post('/', (req, res) => {
  const trimHandle = n => n.toLowerCase().replace(/\s/g, '_');
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

module.exports = router;
