const mongoose = require("mongoose");
const doubtSchema = new mongoose.Schema({
  question: {
    type: Object,
    required: true,
  },
  raisedBy: {
    type: String,
    required: true,
  },
  raisedByName:{
    type: String,
  },
  comments: [Object],
  time: {
    type: Date,
    default: new Date(),
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  answer: {
    type: String,
  },
  answeredTime: {
    type: Date,
    default:new Date()
  },
  answeredBy: {
    type: String,
  },
  accepted:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Doubt", doubtSchema, "doubts");
