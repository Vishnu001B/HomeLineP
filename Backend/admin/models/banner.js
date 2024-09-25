

const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  title:{
    type: String,
   
  },
  description:{
    type: String,
   
  },
});

module.exports = mongoose.model('Banner', bannerSchema);