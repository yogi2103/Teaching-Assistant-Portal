const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const taSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  doubtId: {
    type: String,
  },
  resolved:{
    type:Boolean,
    default:false
  },
  timeAccepted: { type: Date, default: new Date() },
  timeResolved: { type: Date ,default:new Date()},
});

module.exports = mongoose.model("Ta", taSchema);
