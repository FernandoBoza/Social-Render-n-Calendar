const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const SocialRenderModel = require('../../model/SocialRenderModel');
const validateSocialRender = require('../../validation/socialRenderValidation');

// GET all social render profiles
router.get('/', (req, res) => {
  const errorsObj = {};
  SocialRenderModel.find()
    .then(socialRender => {
      if (!socialRender) {
        errorsObj.noSocialRender = 'There is no Social Render ';
        return res.status(404).json(errorsObj);
      }
      res.json(socialRender);
    })
    .catch(err => res.status(404).json(err));
});

router.post('/', (req, res) => {
  const newSocialRender = new SocialRenderModel({
    clientName: req.body.clientName,
    clientInitials: req.body.clientInitials,
    contentCopy: req.body.contentCopy,
    imgLink: req.body.imgLink,
    imgLinkInstagram: req.body.imgLinkInstagram
  });

  newSocialRender
    .save()
    .then(socialRender => res.json(socialRender))
    .catch(err => console.log(err));
});

module.exports = router;
