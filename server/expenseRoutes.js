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

module.exports = router;
