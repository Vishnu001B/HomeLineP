const mongoose = require("mongoose");

const productOrderSchema = new mongoose.Schema(
  {

    deliveryBoy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        productName
          : { type: String, required: true },
        discount: { type: Number },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },

        attributes: {
          size: { type: [String] },  // Change to array of strings
          color: { type: [String] }, // Change to array of strings
        },

        image: {
          type: String,
          required: true,
        },

      },
    ],
    address: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    },
    deliveryDate: { type: Date },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true, enum: ["paid", "unpaid"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductOrder", productOrderSchema);