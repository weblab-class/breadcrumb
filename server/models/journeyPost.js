const mongoose = require("mongoose");

const { Schema } = mongoose;

const journeyPostSchema = new Schema({
  creator_id: String,
  journey_id: String,
  journey_title: String,
  thumbnail: String,
  crumbs: [String],
  dateTime: String,
});

const JourneyPost = mongoose.model("JourneyPost", journeyPostSchema);

module.exports = JourneyPost;
