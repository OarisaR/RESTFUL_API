const mongoose = require("mongoose");
//schema creation
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
},{timestamps:true});  // timestamps automatically creates the creation date
//model creation
const User = mongoose.model("user", userSchema);
module.exports = User;