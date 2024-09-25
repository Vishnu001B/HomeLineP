const mongoose = require("mongoose");

const bookNowSchema = mongoose.Schema(
  {
    useName: { type: String },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: { type: String },
    productImage: { type: String },
    phoneNumber: { type: String },
    status: {
      type: String,
      enum: ["pending", "Processing","confirm"], 
      default: "pending",
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("BookNow", bookNowSchema);
