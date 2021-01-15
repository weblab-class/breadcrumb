const mongoose = require('mongoose');

const { Schema } = mongoose;

const crumbEntrySchema = new Schema({
    title: String,
    description: String,
    latitude: Number,
    longitude: Number,
    // picture: String tbd
})

const CrumbEntry = mongoose.model('CrumbEntry', crumbEntrySchema);

module.exports = CrumbEntry;