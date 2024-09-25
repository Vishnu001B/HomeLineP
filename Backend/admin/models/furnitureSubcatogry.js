const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
   
});

subcategorySchema.pre('save', function (next)
{
    this.name = this.name.toLowerCase();
    next();
}
);

const Subcategory = mongoose.model('subcategory', subcategorySchema);

module.exports = Subcategory