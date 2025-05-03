const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userSnapshot: {
    name: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  }],
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: "INR"
  },
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING"
  },
  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String },
  razorpay_signature: { type: String },
  receipt: { type: String },

  // Optional discounts
  couponCode: { type: String },
  discountAmount: { type: Number },
  finalAmount: { type: Number },

  // Optional technical/debugging fields
  ipAddress: { type: String },
  userAgent: { type: String },
  platform: { type: String },
  geoLocation: { type: String },

  // Optional tax fields
  gstIN: { type: String },
  taxAmount: { type: Number },
  invoiceId: { type: String }

}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
