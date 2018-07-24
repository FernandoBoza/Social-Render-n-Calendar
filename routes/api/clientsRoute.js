const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const UserModel = require('../../model/UserModel');
const ClientModel = require('../../model/ClientModel');
const validateClientProfile = require('../../validation/clientProfileValidation');

// @GET api/clients
// @desc Get All Clients
// router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
router.get('/', (req, res) => {
  const errorsObj = {};
  ClientModel.find()
    .then(clients => {
      if (!clients) {
        errorsObj.noclient = 'There is no clients';
        return res.status(404).json(errorsObj);
      }
      res.json(clients);
    })
    .catch(err => res.status(404).json(err));
});

// @GET api/clients/handle/:handle
// @desc Get by client handle
router.get('/handle/:handle', (req, res) => {
  const errorsObj = {};
  ClientModel.findOne({ handle: req.params.handle })
    .then(client => {
      if (!client) {
        errorsObj.noclient = 'There is no client';
        res.status(404).json(errorsObj);
      }

      res.json(client);
    })
    .catch(err => res.status(404).json(err));
});

// @PUT api/clients/handle/:handle
// @desc Update Client By Handle
router.put('/handle/:handle', passport.authenticate('jwt', { session: false }), (req, res) => {
  const clientProfileFields = {};
  const { errorsObj, isValid } = validateClientProfile(req.body);
  const trimHandle = n => n.toLowerCase().replace(/\s/g, '_');
  // Check Validation
  if (!isValid) {
    return res.status(404).json(errorsObj);
  }

  clientProfileFields.lastUpdatedBy = req.user.name;
  if (req.body.name) clientProfileFields.name = req.body.name;
  if (req.body.name) clientProfileFields.handle = trimHandle(req.body.name);

  clientProfileFields.pageFollowers = {};
  clientProfileFields.engagement = {};
  clientProfileFields.impressions = {};
  clientProfileFields.reach = {};
  clientProfileFields.siteTraffic = {};

  //Page Followers
  if (req.body.pgf_b4_fb) clientProfileFields.pageFollowers.b4_fb = req.body.pgf_b4_fb;
  if (req.body.pgf_fb_x) clientProfileFields.pageFollowers.fb_x = req.body.pgf_fb_x;
  if (req.body.pgf_fb_y) clientProfileFields.pageFollowers.fb_y = req.body.pgf_fb_y;
  if (req.body.pgf_b4_ig) clientProfileFields.pageFollowers.b4_ig = req.body.pgf_b4_ig;
  if (req.body.pgf_ig_x) clientProfileFields.pageFollowers.ig_x = req.body.pgf_ig_x;
  if (req.body.pgf_ig_y) clientProfileFields.pageFollowers.ig_y = req.body.pgf_ig_y;
  if (req.body.pgf_b4_tw) clientProfileFields.pageFollowers.b4_tw = req.body.pgf_b4_tw;
  if (req.body.pgf_tw_x) clientProfileFields.pageFollowers.tw_x = req.body.pgf_tw_x;
  if (req.body.pgf_tw_y) clientProfileFields.pageFollowers.tw_y = req.body.pgf_tw_y;
  if (req.body.pgf_b4_ln) clientProfileFields.pageFollowers.b4_ln = req.body.pgf_b4_ln;
  if (req.body.pgf_ln_x) clientProfileFields.pageFollowers.ln_x = req.body.pgf_ln_x;
  if (req.body.pgf_ln_y) clientProfileFields.pageFollowers.ln_y = req.body.pgf_ln_y;
  if (req.body.pgf_b4_pt) clientProfileFields.pageFollowers.b4_pt = req.body.pgf_b4_pt;
  if (req.body.pgf_pt_x) clientProfileFields.pageFollowers.pt_x = req.body.pgf_pt_x;
  if (req.body.pgf_pt_y) clientProfileFields.pageFollowers.pt_y = req.body.pgf_pt_y;

  // Engagement
  if (req.body.eng_b4_fb) clientProfileFields.engagement.b4_fb = req.body.eng_b4_fb;
  if (req.body.eng_fb_x) clientProfileFields.engagement.fb_x = req.body.eng_fb_x;
  if (req.body.eng_fb_y) clientProfileFields.engagement.fb_y = req.body.eng_fb_y;
  if (req.body.eng_b4_ig) clientProfileFields.engagement.b4_ig = req.body.eng_b4_ig;
  if (req.body.eng_ig_x) clientProfileFields.engagement.ig_x = req.body.eng_ig_x;
  if (req.body.eng_ig_y) clientProfileFields.engagement.ig_y = req.body.eng_ig_y;
  if (req.body.eng_b4_tw) clientProfileFields.engagement.b4_tw = req.body.eng_b4_tw;
  if (req.body.eng_tw_x) clientProfileFields.engagement.tw_x = req.body.eng_tw_x;
  if (req.body.eng_tw_y) clientProfileFields.engagement.tw_y = req.body.eng_tw_y;
  if (req.body.eng_b4_ln) clientProfileFields.engagement.b4_ln = req.body.eng_b4_ln;
  if (req.body.eng_ln_x) clientProfileFields.engagement.ln_x = req.body.eng_ln_x;
  if (req.body.eng_ln_y) clientProfileFields.engagement.ln_y = req.body.eng_ln_y;
  if (req.body.eng_b4_pt) clientProfileFields.engagement.b4_pt = req.body.eng_b4_pt;
  if (req.body.eng_pt_x) clientProfileFields.engagement.pt_x = req.body.eng_pt_x;
  if (req.body.eng_pt_y) clientProfileFields.engagement.pt_y = req.body.eng_pt_y;

  // Impressions
  if (req.body.imp_b4_fb) clientProfileFields.impressions.b4_fb = req.body.imp_b4_fb;
  if (req.body.imp_fb_x) clientProfileFields.impressions.fb_x = req.body.imp_fb_x;
  if (req.body.imp_fb_y) clientProfileFields.impressions.fb_y = req.body.imp_fb_y;
  if (req.body.imp_b4_ig) clientProfileFields.impressions.b4_ig = req.body.imp_b4_ig;
  if (req.body.imp_ig_x) clientProfileFields.impressions.ig_x = req.body.imp_ig_x;
  if (req.body.imp_ig_y) clientProfileFields.impressions.ig_y = req.body.imp_ig_y;
  if (req.body.imp_b4_tw) clientProfileFields.impressions.b4_tw = req.body.imp_b4_tw;
  if (req.body.imp_tw_x) clientProfileFields.impressions.tw_x = req.body.imp_tw_x;
  if (req.body.imp_tw_y) clientProfileFields.impressions.tw_y = req.body.imp_tw_y;
  if (req.body.imp_b4_ln) clientProfileFields.impressions.b4_ln = req.body.imp_b4_ln;
  if (req.body.imp_ln_x) clientProfileFields.impressions.ln_x = req.body.imp_ln_x;
  if (req.body.imp_ln_y) clientProfileFields.impressions.ln_y = req.body.imp_ln_y;
  if (req.body.imp_b4_pt) clientProfileFields.impressions.b4_pt = req.body.imp_b4_pt;
  if (req.body.imp_pt_x) clientProfileFields.impressions.pt_x = req.body.imp_pt_x;
  if (req.body.imp_pt_y) clientProfileFields.impressions.pt_y = req.body.imp_pt_y;

  // Reach
  if (req.body.reach_b4_fb) clientProfileFields.reach.b4_fb = req.body.reach_b4_fb;
  if (req.body.reach_fb_x) clientProfileFields.reach.fb_x = req.body.reach_fb_x;
  if (req.body.reach_fb_y) clientProfileFields.reach.fb_y = req.body.reach_fb_y;
  if (req.body.reach_b4_ig) clientProfileFields.reach.b4_ig = req.body.reach_b4_ig;
  if (req.body.reach_ig_x) clientProfileFields.reach.ig_x = req.body.reach_ig_x;
  if (req.body.reach_ig_y) clientProfileFields.reach.ig_y = req.body.reach_ig_y;
  if (req.body.reach_b4_tw) clientProfileFields.reach.b4_tw = req.body.reach_b4_tw;
  if (req.body.reach_tw_x) clientProfileFields.reach.tw_x = req.body.reach_tw_x;
  if (req.body.reach_tw_y) clientProfileFields.reach.tw_y = req.body.reach_tw_y;
  if (req.body.reach_b4_ln) clientProfileFields.reach.b4_ln = req.body.reach_b4_ln;
  if (req.body.reach_ln_x) clientProfileFields.reach.ln_x = req.body.reach_ln_x;
  if (req.body.reach_ln_y) clientProfileFields.reach.ln_y = req.body.reach_ln_y;
  if (req.body.reach_b4_pt) clientProfileFields.reach.b4_pt = req.body.reach_b4_pt;
  if (req.body.reach_pt_x) clientProfileFields.reach.pt_x = req.body.reach_pt_x;
  if (req.body.reach_pt_y) clientProfileFields.reach.pt_y = req.body.reach_pt_y;

  // Site Traffic
  if (req.body.web_b4) clientProfileFields.siteTraffic.web_b4 = req.body.web_b4;
  if (req.body.web_x) clientProfileFields.siteTraffic.x = req.body.web_x;
  if (req.body.web_y) clientProfileFields.siteTraffic.y = req.body.web_y;

  // UPDATE
  ClientModel.findOneAndUpdate({ name: clientProfileFields.name }, { $set: clientProfileFields }, { new: true })
    .then(client => res.json(client))
    .catch(err => res.status(404).json(err));
});

// @POST api/clients
// @desc CREATE or UPDATE Clients
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const clientProfileFields = {};
  const { errorsObj, isValid } = validateClientProfile(req.body);
  const trimHandle = n => n.toLowerCase().replace(/\s/g, '_');
  // Check Validation
  if (!isValid) {
    return res.status(404).json(errorsObj);
  }

  clientProfileFields.lastUpdatedBy = req.user.name;
  if (req.body.name) clientProfileFields.name = req.body.name;
  if (req.body.name) clientProfileFields.handle = trimHandle(req.body.name);

  clientProfileFields.pageFollowers = {};
  clientProfileFields.engagement = {};
  clientProfileFields.impressions = {};
  clientProfileFields.reach = {};
  clientProfileFields.siteTraffic = {};

  //Page Followers
  if (req.body.pgf_b4_fb) clientProfileFields.pageFollowers.b4_fb = req.body.pgf_b4_fb;
  if (req.body.pgf_fb_x) clientProfileFields.pageFollowers.fb_x = req.body.pgf_fb_x;
  if (req.body.pgf_fb_y) clientProfileFields.pageFollowers.fb_y = req.body.pgf_fb_y;
  if (req.body.pgf_b4_ig) clientProfileFields.pageFollowers.b4_ig = req.body.pgf_b4_ig;
  if (req.body.pgf_ig_x) clientProfileFields.pageFollowers.ig_x = req.body.pgf_ig_x;
  if (req.body.pgf_ig_y) clientProfileFields.pageFollowers.ig_y = req.body.pgf_ig_y;
  if (req.body.pgf_b4_tw) clientProfileFields.pageFollowers.b4_tw = req.body.pgf_b4_tw;
  if (req.body.pgf_tw_x) clientProfileFields.pageFollowers.tw_x = req.body.pgf_tw_x;
  if (req.body.pgf_tw_y) clientProfileFields.pageFollowers.tw_y = req.body.pgf_tw_y;
  if (req.body.pgf_b4_ln) clientProfileFields.pageFollowers.b4_ln = req.body.pgf_b4_ln;
  if (req.body.pgf_ln_x) clientProfileFields.pageFollowers.ln_x = req.body.pgf_ln_x;
  if (req.body.pgf_ln_y) clientProfileFields.pageFollowers.ln_y = req.body.pgf_ln_y;
  if (req.body.pgf_b4_pt) clientProfileFields.pageFollowers.b4_pt = req.body.pgf_b4_pt;
  if (req.body.pgf_pt_x) clientProfileFields.pageFollowers.pt_x = req.body.pgf_pt_x;
  if (req.body.pgf_pt_y) clientProfileFields.pageFollowers.pt_y = req.body.pgf_pt_y;

  // Engagement
  if (req.body.eng_b4_fb) clientProfileFields.engagement.b4_fb = req.body.eng_b4_fb;
  if (req.body.eng_fb_x) clientProfileFields.engagement.fb_x = req.body.eng_fb_x;
  if (req.body.eng_fb_y) clientProfileFields.engagement.fb_y = req.body.eng_fb_y;
  if (req.body.eng_b4_ig) clientProfileFields.engagement.b4_ig = req.body.eng_b4_ig;
  if (req.body.eng_ig_x) clientProfileFields.engagement.ig_x = req.body.eng_ig_x;
  if (req.body.eng_ig_y) clientProfileFields.engagement.ig_y = req.body.eng_ig_y;
  if (req.body.eng_b4_tw) clientProfileFields.engagement.b4_tw = req.body.eng_b4_tw;
  if (req.body.eng_tw_x) clientProfileFields.engagement.tw_x = req.body.eng_tw_x;
  if (req.body.eng_tw_y) clientProfileFields.engagement.tw_y = req.body.eng_tw_y;
  if (req.body.eng_b4_ln) clientProfileFields.engagement.b4_ln = req.body.eng_b4_ln;
  if (req.body.eng_ln_x) clientProfileFields.engagement.ln_x = req.body.eng_ln_x;
  if (req.body.eng_ln_y) clientProfileFields.engagement.ln_y = req.body.eng_ln_y;
  if (req.body.eng_b4_pt) clientProfileFields.engagement.b4_pt = req.body.eng_b4_pt;
  if (req.body.eng_pt_x) clientProfileFields.engagement.pt_x = req.body.eng_pt_x;
  if (req.body.eng_pt_y) clientProfileFields.engagement.pt_y = req.body.eng_pt_y;

  // Impressions
  if (req.body.imp_b4_fb) clientProfileFields.impressions.b4_fb = req.body.imp_b4_fb;
  if (req.body.imp_fb_x) clientProfileFields.impressions.fb_x = req.body.imp_fb_x;
  if (req.body.imp_fb_y) clientProfileFields.impressions.fb_y = req.body.imp_fb_y;
  if (req.body.imp_b4_ig) clientProfileFields.impressions.b4_ig = req.body.imp_b4_ig;
  if (req.body.imp_ig_x) clientProfileFields.impressions.ig_x = req.body.imp_ig_x;
  if (req.body.imp_ig_y) clientProfileFields.impressions.ig_y = req.body.imp_ig_y;
  if (req.body.imp_b4_tw) clientProfileFields.impressions.b4_tw = req.body.imp_b4_tw;
  if (req.body.imp_tw_x) clientProfileFields.impressions.tw_x = req.body.imp_tw_x;
  if (req.body.imp_tw_y) clientProfileFields.impressions.tw_y = req.body.imp_tw_y;
  if (req.body.imp_b4_ln) clientProfileFields.impressions.b4_ln = req.body.imp_b4_ln;
  if (req.body.imp_ln_x) clientProfileFields.impressions.ln_x = req.body.imp_ln_x;
  if (req.body.imp_ln_y) clientProfileFields.impressions.ln_y = req.body.imp_ln_y;
  if (req.body.imp_b4_pt) clientProfileFields.impressions.b4_pt = req.body.imp_b4_pt;
  if (req.body.imp_pt_x) clientProfileFields.impressions.pt_x = req.body.imp_pt_x;
  if (req.body.imp_pt_y) clientProfileFields.impressions.pt_y = req.body.imp_pt_y;

  // Reach
  if (req.body.reach_b4_fb) clientProfileFields.reach.b4_fb = req.body.reach_b4_fb;
  if (req.body.reach_fb_x) clientProfileFields.reach.fb_x = req.body.reach_fb_x;
  if (req.body.reach_fb_y) clientProfileFields.reach.fb_y = req.body.reach_fb_y;
  if (req.body.reach_b4_ig) clientProfileFields.reach.b4_ig = req.body.reach_b4_ig;
  if (req.body.reach_ig_x) clientProfileFields.reach.ig_x = req.body.reach_ig_x;
  if (req.body.reach_ig_y) clientProfileFields.reach.ig_y = req.body.reach_ig_y;
  if (req.body.reach_b4_tw) clientProfileFields.reach.b4_tw = req.body.reach_b4_tw;
  if (req.body.reach_tw_x) clientProfileFields.reach.tw_x = req.body.reach_tw_x;
  if (req.body.reach_tw_y) clientProfileFields.reach.tw_y = req.body.reach_tw_y;
  if (req.body.reach_b4_ln) clientProfileFields.reach.b4_ln = req.body.reach_b4_ln;
  if (req.body.reach_ln_x) clientProfileFields.reach.ln_x = req.body.reach_ln_x;
  if (req.body.reach_ln_y) clientProfileFields.reach.ln_y = req.body.reach_ln_y;
  if (req.body.reach_b4_pt) clientProfileFields.reach.b4_pt = req.body.reach_b4_pt;
  if (req.body.reach_pt_x) clientProfileFields.reach.pt_x = req.body.reach_pt_x;
  if (req.body.reach_pt_y) clientProfileFields.reach.pt_y = req.body.reach_pt_y;

  // Site Traffic
  if (req.body.web_b4) clientProfileFields.siteTraffic.web_b4 = req.body.web_b4;
  if (req.body.web_x) clientProfileFields.siteTraffic.x = req.body.web_x;
  if (req.body.web_y) clientProfileFields.siteTraffic.y = req.body.web_y;

  ClientModel.findOne({ name: clientProfileFields.name }).then(client => {
    if (client) {
      // UPDATE
      ClientModel.findOneAndUpdate({ name: clientProfileFields.name }, { $set: clientProfileFields }, { new: true }).then(client => res.json(client));
    } else {
      // CREATE Client
      new ClientModel(clientProfileFields)
        .save()
        .then(client => {
          res.json(client);
        })
        .catch(err => console.log(err));
    }
  });
});

// @DELETE api/clients/handle/:handle
// @desc Delete Clients
router.delete('/handle/:handle', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errorsObj = {};
  ClientModel.findOneAndRemove({ handle: req.params.handle }).then(() => {
    res.json({ success: true });
  });
});

// @GET api/clients/id/:id
// @desc Get by client id
// NEED WORK
router.get('/id/:id', (req, res) => {
  const errorsObj = {};
  ClientModel.findOne({ id: req.params._id })
    .then(client => {
      if (!client) {
        errorsObj.noclient = 'There is no client';
        res.status(404).json(errorsObj);
      }

      res.json(client);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
