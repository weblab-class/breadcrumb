const mongoose = require("mongoose");

const { Schema } = mongoose;

const journeyPostSchema = new Schema({
  creator_id: String,
  journey_id: String,
  thumbnail: String,
  crumbs: Array,
  dateTime: String,
});

const JourneyPost = mongoose.model("JourneyPost", journeyPostSchema);

module.exports = JourneyPost;
