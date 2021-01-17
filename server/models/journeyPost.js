const mongoose = require("mongoose");

const { Schema } = mongoose;

const journeyPostSchema = new Schema({
  creator_id: String,
  thumbnail: String,
  crumbs: Array,
  date: Date,
});

const JourneyPost = mongoose.model("JourneyPost", journeyPostSchema);

module.exports = JourneyPost;
