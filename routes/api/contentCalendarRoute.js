const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const UserModel = require('../../model/UserModel');
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

// @GET api/content-calendar/:clientHandle
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

// @GET api/content-calendar/month/year
// @desc Get content by calendar month and year
router.get(
  '/:month/:year',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errorsObj = {};
    SocialRenderModel.find()
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

// @GET api/content-calendar/month/year
// @desc Get content by calendar month and year
router.get(
  '/:clientHandle/:month/:year',
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

// @DELETE api/content-calendar/id
// @desc Delete Clients
router.delete(
  '/id/:_id/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errorsObj = {};
    SocialRenderModel.findOneAndRemove({ _id: req.params._id }).then(() => {
      res.json({ success: true });
    });
  }
);

// @POST api/social-render/like/_id
// @desc LIKE A SOCIAL CONTENT BY ID
router.post(
  '/id/:_id/like/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    UserModel.findOne({ user: req.user._id }).then(user => {
      SocialRenderModel.findById(req.params._id)
        .then(content => {
          if (
            content.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: 'User already liked this post' });
          }

          content.likes.unshift({ user: req.user._id });
          content.save().then(content => res.json(content));
        })
        .catch(err => res.status(404).json({ postNotFound: 'No Post Found' }));
    });
  }
);

// @POST api/social-render/unlike/_id
// @desc UNLIKE A SOCIAL CONTENT BY ID
router.post(
  '/id/:_id/unlike/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    SocialRenderModel.findById(req.params._id)
      .then(content => {
        if (
          content.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ commentNotLiked: 'You Got To Like The Comment First' });
        }

        const removeIndex = content.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        content.likes.splice(removeIndex, 1);
        content.save().then(content => res.json(content));
      })
      .catch(err => res.status(404).json({ postNotFound: 'No Post Found' }));
  }
);

// @POST api/social-render/id/_id/comment
// @desc COMMENT ON A SOCIAL CONTENT BY ID
router.post(
  '/id/:_id/comment/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSocialRender(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    SocialRenderModel.findById(req.params._id)
      .then(content => {
        const newComment = {
          comment: req.body.comment,
          name: req.body.name,
          user: req.user.id
        };

        content.comments.unshift(newComment);
        content.save().then(content => res.json(content));
      })
      .catch(err => res.status(404).json({ postNotFound: 'No Post Found' }));
  }
);

// @DELETE api/social-render/id/_id/:comment_id/
// @desc Remove a comment on a post
router.delete(
  '/id/:_id/comment/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    SocialRenderModel.findById(req.params._id)
      .then(content => {
        if (
          content.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ commentNotExist: 'Comment Not Exist' });
        }

        const removeIndex = content.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        content.comments.splice(removeIndex, 1);
        content.save().then(content => res.json(content));
      })
      .catch(err => res.status(404).json({ postNotFound: 'No Post Found' }));
  }
);

module.exports = router;
