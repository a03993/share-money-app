const mongoose = require("mongoose");

const personalExpenseSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true,
      minLength: [1, "Item name cannot be empty"],
      maxLength: [50, "Item name is too long"],
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be greater than 0"],
      max: [999999999, "Amount is too large"],
      validate: {
        validator: function (value) {
          return !isNaN(value) && isFinite(value) && Number.isInteger(value);
        },
        message: "Amount must be a valid number",
      },
    },
    sharedBy: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const userExpenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [1, "User name cannot be empty"],
      maxLength: [20, "User name is too long"],
    },
    color: { type: String, required: true },
    personalExpenses: [personalExpenseSchema],
  },
  { timestamps: true }
);

const expenseSchema = new mongoose.Schema(
  {
    linkId: { type: String, required: true, unique: true },
    expenses: [userExpenseSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
