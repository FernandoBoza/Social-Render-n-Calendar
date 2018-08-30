const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/registerValidation');
const validateLoginInput = require('../../validation/loginValidation');
const UserModel = require('../../model/UserModel');

// @GET all api/users
router.get('/', (req, res) => {
  UserModel.find().then(users => res.json(users));
});

// @POST api/users/register
// @desc Create a users
router.post('/register', (req, res) => {
  const { errorsObj, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errorsObj);
  }

  UserModel.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errorsObj.email = 'Email already exist';
      return res.status(400).json(errorsObj);
    } else {
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @POST api/users/login
// @desc LOGIN a users
router.post('/login', (req, res) => {
  const { errorsObj, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errorsObj);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Finder User By Email
  UserModel.findOne({ email }).then(user => {
    // Check for User
    if (!user) {
      errorsObj.email = 'User Not Found';
      return res.status(404).json(errorsObj);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          role: user.role
        }; // Create JWT Payload, User info

        // User Token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token // Token Bearer connected to keys secretOrKey!!
          });
        });
      } else {
        errorsObj.password = 'Password Incorrect';
        return res.status(404).json(errorsObj);
      }
    });
  });
});

// @GET api/users/manager/:id
// @desc Return a user
router.get('/id/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errorsObj = {};
  UserModel.findOne({ _id: req.params._id })
    .then(user => {
      if (!user) {
        errorsObj.noclient = 'There is no user';
        return res.status(404).json(errorsObj);
      }
      res.json(user);
    })
    .catch(err => res.status(404).json(err));
});

router.put('/id/:_id/', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserModel.findOneAndUpdate({ _id: req.params._id }, { role: req.body.role }, { new: true })
    .then(user => {
      if (!user) {
        errorsObj.noclient = 'There is no user';
        return res.status(404).json(errorsObj);
      }
      res.json(user);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
