const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  isVerified: { type: Boolean, default: false },
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.generateOtp = function () {
  this.otp = crypto.randomBytes(3).toString("hex");
  this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
};
adminSchema.pre("validate", function (next) {
  if (!this.otp || !this.otpExpires) {
    this.generateOtp();
  }
  next();
});

adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
