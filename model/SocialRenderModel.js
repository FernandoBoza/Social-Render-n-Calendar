const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SocialRenderSchema = new Schema({
  clientName: {
    type: String
  },
  clientInitials: {
    type: String
  },
  contentCopy: {
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
  }
});

module.exports = SocialRender = mongoose.model('socialRender', SocialRenderSchema);
