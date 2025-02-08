const express = require("express");
const router = express.Router();
const ExpenseModel = require("./expenseModel");

router.post("/", async (req, res) => {
  try {
    const newExpense = new ExpenseModel({
      linkId: req.body.linkId,
      expenses: [],
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:linkId/users", async (req, res) => {
  try {
    const { users } = req.body;
    const { linkId } = req.params;

    const currentExpense = await ExpenseModel.findOne({ linkId });

    if (!currentExpense) {
      return res.status(404).json({ message: "Expense list not found" });
    }

    currentExpense.expenses.push(...users);
    const updatedExpense = await currentExpense.save();

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:linkId/expenses", async (req, res) => {
  try {
    const { linkId } = req.params;
    const expense = await ExpenseModel.findOne({ linkId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:linkId/expenses", async (req, res) => {
  try {
    const { linkId } = req.params;
    const { item, amount, payer, sharedBy } = req.body;

    const expense = await ExpenseModel.findOne({ linkId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const payerExpense = expense.expenses.find(exp => exp.name === payer);
    if (!payerExpense) {
      return res.status(404).json({ message: "Payer not found" });
    }

    payerExpense.personalExpenses.push({ item, amount, sharedBy });
    const updatedExpense = await expense.save();

    res.status(201).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
