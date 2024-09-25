const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  addressType: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
  },
});

// Define the Cart Item schema
const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  image: {
    type: String,
    required: true,
  },
  attributes: {
    size: { type: [String] },  // Change to array of strings
    color: { type: [String] }, // Change to array of strings
  },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String },

  isVerified: { type: Boolean, default: false },
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
  addresses: [addressSchema],
  cart: [cartItemSchema],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.generateOtp = function () {
  this.otp = crypto.randomBytes(3).toString("hex");
  this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
};
userSchema.pre("validate", function (next) {
  if (!this.otp || !this.otpExpires) {
    this.generateOtp();
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const user = mongoose.model("User", userSchema);
module.exports = user;
