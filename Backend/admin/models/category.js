const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true,
    unique: true
  },
  images: [{ 
    type: String 
  }],
  subcategories: [{ 
    type: String,
    
  }]
});

// Middleware to convert category and subcategories to lowercase before saving
categorySchema.pre('save', function (next) {
  this.category = this.category.toLowerCase();
  this.subcategories = this.subcategories.map(subcategory => subcategory.toLowerCase());
  next();
});

module.exports = mongoose.model('Category', categorySchema);
