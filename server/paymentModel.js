const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatarColor: {
    type: String,
    required: true,
  },
});

const PaymentDetailSchema = new mongoose.Schema({
  payer: {
    type: UserInfoSchema,
    required: true,
  },
  payee: {
    type: UserInfoSchema,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

const PaymentSchema = new mongoose.Schema({
  linkId: { type: String, required: true, ref: "Expense" },
  payments: [PaymentDetailSchema],
});

module.exports = mongoose.model("Payment", PaymentSchema);
