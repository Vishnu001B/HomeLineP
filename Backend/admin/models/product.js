const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    images: { type: [String] },
    title: { type: String, required: true },
    descriptions: { type: String },
    categories: { type: String },
    subcategory: { type: [String] },
    specialsCategory: {
      type: [String], // Array of strings
      enum: ["Premium", "Classic", "Economic"], // Corrected typo from "Ecommic" to "Economic"
      default: ["Economic"], // Default value should also be an array
    },
    price: { type: Number, required: true }, // Updated to Number
    discount: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 }, // Ensure totalPrice is a Number
    skuCode: { type: String },
    rating: { type: String },
    productCollection: { type: String },
    patternNumber: { type: String },
    RollSize: [
      {
        height: { type: String },
        weight: { type: String },
      },
    ],
    mrp_roll: { type: String },
    quality: { type: String },
    color: { type: String },
    endUse: { type: String },
    compositions: { type: String, default: "N/A" },
    gsm: { type: String, default: "N/A" },
    martindale: { type: String, default: "N/A" },
    material: { type: String },
  },
  { timestamps: true }
);

// Pre-save hook to convert categories and subcategory to lowercase
productSchema.pre("save", function (next) {
  if (this.categories) {
    this.categories = this.categories.toLowerCase();
  }
  
  if (this.subcategory && this.subcategory.length > 0) {
    this.subcategory = this.subcategory.map((item) => item.toLowerCase());
  }
  
  next();
});

module.exports = mongoose.model("Product", productSchema);
