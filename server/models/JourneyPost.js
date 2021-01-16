const mongoose = require('mongoose');

const { Schema } = mongoose;

const journeyPostSchema = new Schema({
    thumbnail: String,
    creator_key: String,
    crumbs: [],
})

const JourneyPost = mongoose.model('JourneyPost', journeyPostSchema);

module.exports = JourneyPost;