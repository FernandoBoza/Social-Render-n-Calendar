const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SocialRenderSchema = new Schema({
  // clientName: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'client'
  // },
  clientName: {
    type: String,
    ref: 'client'
  },
  clientInitials: {
    type: String
  },
  clientHandle: {
    type: String
  },
  contentCopy: {
    type: String
  },
  contentTwitterCopy: {
    type: String
  },
  contentInstagramCopy: {
    type: String
  },
  contentLinkedInCopy: {
    type: String
  },
  imgLink: {
    type: String
  },
  imgLinkInstagram: {
    type: String
  },
  dateGoingLive: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      comment: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      // avatar: {
      //   type: String
      // },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = SocialRender = mongoose.model('socialRenderContent', SocialRenderSchema);
