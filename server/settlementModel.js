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

const SettlementDetailSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const SettlementSchema = new mongoose.Schema(
  {
    linkId: { type: String, required: true, ref: "Expense" },
    settlements: [SettlementDetailSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settlement", SettlementSchema);
