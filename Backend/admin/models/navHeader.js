// models/NavHeader.js

const mongoose = require('mongoose');

const navHeaderSchema = new mongoose.Schema({
    categories: { type: String, required: true },
  subcategories: [{ type: String }],
});
navHeaderSchema.pre('save', function(next){
    if(this.categories)
    {
        this.categories = this.categories.toLowerCase(); 
    }
    if (this.subcategory && this.subcategory.length > 0) {
        this.subcategory = this.subcategory.map(subcat => subcat.toLowerCase());
    }
    next();
})

const NavHeader = mongoose.model('NavHeader', navHeaderSchema);

module.exports = NavHeader;
