const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  filename: {
    type: String,

  },
  title: {
    type: String,
 
  },
  description: {
    type: String,
  
  }
});

const About = mongoose.model('Aboutcontent', aboutSchema);

module.exports = About;
