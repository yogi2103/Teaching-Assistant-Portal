const mongoose = require("mongoose");
const Doubt = require("./doubts");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  isTeacher:{
    type: Boolean,
  },
  isModerator:{
    type: Boolean,
  },
  isStudent:{
    type: Boolean,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
  },
  uniqueString: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema, "users");
