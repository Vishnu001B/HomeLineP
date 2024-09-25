const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  authorImage: { type: String }, // File path for the author's image
  author: { type: String, required: true }, // Ensure it's required
  date: { type: Date, default: Date.now },
  rating: { type: Number, required: true }, // Must be a number
  quote: { type: String, required: true }, // The actual quote
});

module.exports = mongoose.model("Quote", quoteSchema);
