const mongoose = require("mongoose");

const personalExpenseSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
    trim: true,
    minLength: [1, "Item name cannot be empty"],
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be greater than 0"],
  },
  sharedBy: [{ type: String, required: true }],
});

const userExpenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [1, "User name cannot be empty"],
  },
  color: { type: String, required: true },
  personalExpenses: [personalExpenseSchema],
});

const expenseSchema = new mongoose.Schema({
  linkId: { type: String, required: true, unique: true },
  expenses: [userExpenseSchema],
});

module.exports = mongoose.model("Expense", expenseSchema);
