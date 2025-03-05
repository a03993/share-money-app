const express = require("express");
const router = express.Router();
const Expense = require("./expenseModel");

router.post("/", async (req, res) => {
  try {
    const newExpense = new Expense({
      linkId: req.body.linkId,
      expenses: [],
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error("Error creating the link for expense:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/:linkId/users", async (req, res) => {
  try {
    const { users } = req.body;
    const { linkId } = req.params;

    const currentExpense = await Expense.findOne({ linkId });
    if (!currentExpense) {
      return res.status(404).json({ message: "Expense Page not found" });
    }

    currentExpense.expenses.push(...users);
    const updatedExpense = await currentExpense.save();

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:linkId/expenses", async (req, res) => {
  try {
    const { linkId } = req.params;

    const currentExpense = await Expense.findOne({ linkId });
    if (!currentExpense) {
      return res.status(404).json({ message: "Expenses Page not found" });
    }

    res.status(200).json(currentExpense);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/:linkId/expenses", async (req, res) => {
  try {
    const { linkId } = req.params;
    const { item, amount, payer, sharedBy } = req.body;

    const currentExpense = await Expense.findOne({ linkId });
    if (!currentExpense) {
      return res.status(404).json({ message: "Expense Page not found" });
    }

    const payerExpense = currentExpense.expenses.find(
      (exp) => exp.name === payer
    );
    if (!payerExpense) {
      return res.status(404).json({ message: "Payer not found" });
    }

    payerExpense.personalExpenses.push({ item, amount, sharedBy });
    const updatedExpense = await currentExpense.save();

    res.status(201).json(updatedExpense);
  } catch (error) {
    console.error("Error adding expense item:", error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:linkId/expenses", async (req, res) => {
  try {
    const { linkId } = req.params;
    const { _id } = req.body;

    const currentExpense = await Expense.findOne({ linkId });
    if (!currentExpense) {
      return res.status(404).json({ message: "Expense Page not found" });
    }

    currentExpense.expenses.forEach((person) => {
      person.personalExpenses = person.personalExpenses.filter(
        (exp) => exp._id.toString() !== _id
      );
    });

    const updatedExpense = await currentExpense.save();
    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Error deleting expense item:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
