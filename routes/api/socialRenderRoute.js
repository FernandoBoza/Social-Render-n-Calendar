const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const UserModel = require('../../model/UserModel');
const ClientModel = require('../../model/ClientModel');
const validateClientProfile = require('../../validation/clientProfileValidation');
const jwt = require('jsonwebtoken');

// @GET all api/users
router.get('/', (req, res) => {
  res.json({ msg: 'Users Works' });
});

module.exports = router;
