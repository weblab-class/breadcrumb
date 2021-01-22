const mongoose = require("mongoose");

const { Schema } = mongoose;

const crumbEntrySchema = new Schema({
  creator_id: String,
  journey_id: String,
  crumb_id: String,
  title: String,
  description: String,
  latitude: Number,
  longitude: Number,
  image_name: String,
});

const CrumbEntry = mongoose.model("CrumbEntry", crumbEntrySchema);

module.exports = CrumbEntry;
