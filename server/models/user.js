const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  bio: String,
  location: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
