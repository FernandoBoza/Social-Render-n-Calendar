const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ClientSchema = new Schema({
  lastUpdatedBy: {
    type: String,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  pageFollowers: {
    b4_fb: { type: Number },
    fb_x: { type: Number },
    fb_y: { type: Number },
    b4_ig: { type: Number },
    ig_x: { type: Number },
    ig_y: { type: Number },
    b4_tw: { type: Number },
    tw_x: { type: Number },
    tw_y: { type: Number },
    b4_ln: { type: Number },
    ln_x: { type: Number },
    ln_y: { type: Number },
    b4_pt: { type: Number },
    pt_x: { type: Number },
    pt_y: { type: Number }
  },
  engagement: {
    b4_fb: { type: Number },
    fb_x: { type: Number },
    fb_y: { type: Number },
    b4_ig: { type: Number },
    ig_x: { type: Number },
    ig_y: { type: Number },
    b4_tw: { type: Number },
    tw_x: { type: Number },
    tw_y: { type: Number },
    b4_ln: { type: Number },
    ln_x: { type: Number },
    ln_y: { type: Number },
    b4_pt: { type: Number },
    pt_x: { type: Number },
    pt_y: { type: Number }
  },
  impressions: {
    b4_fb: { type: Number },
    fb_x: { type: Number },
    fb_y: { type: Number },
    b4_ig: { type: Number },
    ig_x: { type: Number },
    ig_y: { type: Number },
    b4_tw: { type: Number },
    tw_x: { type: Number },
    tw_y: { type: Number },
    b4_ln: { type: Number },
    ln_x: { type: Number },
    ln_y: { type: Number },
    b4_pt: { type: Number },
    pt_x: { type: Number },
    pt_y: { type: Number }
  },
  siteTraffic: {
    web_b4: { type: Number },
    x: { type: Number },
    y: { type: Number }
  }
});

module.exports = Client = mongoose.model('client', ClientSchema);
