const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subschema for product details
const orderDetailsSchema = new Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Main schema for quotetion
const quotetionSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  orderDetails: [orderDetailsSchema], // Array of product details
  servicePrice: {
    type: Number,
    required: true
  },
  settlementPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update the 'updatedAt' field before saving
quotetionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Quotetion = mongoose.model('Quotetion', quotetionSchema);

module.exports = Quotetion;
