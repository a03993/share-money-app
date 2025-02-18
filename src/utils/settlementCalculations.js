export const calculateTotalExpensePerPerson = (currentExpenseItem) => {
  if (!currentExpenseItem) return [];

  const totalExpenses = {};

  currentExpenseItem.expenses.forEach(({ name, personalExpenses }) => {
    const personTotal = personalExpenses.reduce(
      (expenseSum, { amount }) => expenseSum + amount,
      0
    );
    totalExpenses[name] = personTotal;
  });

  return Object.entries(totalExpenses).map(([name, actualExpense]) => ({
    name,
    actualExpense: actualExpense,
  }));
};

export const calculateAmountPaidByEachPerson = (currentExpenseItem) => {
  if (!currentExpenseItem) return [];

  const amountPaid = {};

  currentExpenseItem.expenses.forEach(({ name, personalExpenses }) => {
    personalExpenses.forEach(({ amount, sharedBy }) => {
      if (sharedBy && sharedBy.length > 0) {
        const splitAmount = amount / sharedBy.length;
        sharedBy.forEach((person) => {
          if (!amountPaid[person]) {
            amountPaid[person] = 0;
          }
          amountPaid[person] += splitAmount;
        });
      }
    });
  });

  return Object.entries(amountPaid).map(([name, paid]) => ({
    name,
    paidAmount: parseFloat(paid.toFixed(0)),
  }));
};

export const calculatePayments = (actualExpense, paidAmount, expenseList) => {
  const balance = {};

  actualExpense.forEach(({ name, actualExpense }) => {
    balance[name] =
      (paidAmount.find((person) => person.name === name)?.paidAmount || 0) -
      actualExpense;
  });

  const payers = [];
  const payees = [];

  for (let person in balance) {
    if (balance[person] > 0) {
      payers.push({ name: person, amount: balance[person] });
    } else if (balance[person] < 0) {
      payees.push({ name: person, amount: -balance[person] });
    }
  }

  const transactions = [];
  let payerIndex = 0;
  let payeeIndex = 0;

  while (payerIndex < payers.length && payeeIndex < payees.length) {
    const payer = payers[payerIndex];
    const payee = payees[payeeIndex];
    const transferAmount = Math.min(payer.amount, payee.amount);

    const payerColor = expenseList[0].expenses.find(
      (person) => person.name === payer.name
    )?.color;
    const payeeColor = expenseList[0].expenses.find(
      (person) => person.name === payee.name
    )?.color;

    transactions.push({
      payer: {
        name: payer.name,
        avatarColor: payerColor,
      },
      payee: {
        name: payee.name,
        avatarColor: payeeColor,
      },
      amount: transferAmount,
    });

    payers[payerIndex].amount -= transferAmount;
    payees[payeeIndex].amount -= transferAmount;

    if (payers[payerIndex].amount === 0) {
      payerIndex++;
    }
    if (payees[payeeIndex].amount === 0) {
      payeeIndex++;
    }
  }

  return transactions;
};
