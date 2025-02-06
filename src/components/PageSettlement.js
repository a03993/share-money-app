import Grid from "@mui/material/Grid2";
import { Alert } from "@mui/material";

import PerPersonExpenseAmount from "./PerPersonExpenseAmount";
import MemberAvatars from "./MemberAvatars";
import PaymentStatusTransfer from "./PaymentStatusTransfer";
import ExpenseSummary from "./ExpenseSummary";

import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

const calculateTotalExpensePerPerson = (currentExpenseItem) => {
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

const calculateAmountPaidByEachPerson = (currentExpenseItem) => {
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

const calculatePayments = (actualExpense, paidAmount, expenseList) => {
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

export default function PageSettlement({
  expenseList,
  totalAmount,
  expenseItem,
  linkId,
  currentExpenseItem,
}) {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const actualExpense = calculateTotalExpensePerPerson(currentExpenseItem);
    const paidAmount = calculateAmountPaidByEachPerson(currentExpenseItem);
    const newPaymentDetails = calculatePayments(
      actualExpense,
      paidAmount,
      expenseList
    );
    setPaymentDetails(newPaymentDetails);
  }, [expenseList, currentExpenseItem]);

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          maxWidth: "700px",
          mx: "auto",
          mt: 8,
          mb: { xs: 4, sm: 8 },
          justifyContent: "center",
        }}
      >
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
          <PerPersonExpenseAmount
            totalAmount={totalAmount}
            expenseList={expenseList}
            linkId={linkId}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MemberAvatars members={expenseItem} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
          <ExpenseSummary
            page="result"
            totalAmount={totalAmount}
            expenseItem={expenseItem}
          />
        </Grid>
      </Grid>
      {paymentDetails.length > 0 ? (
        <PaymentStatusTransfer paymentDetails={paymentDetails} />
      ) : (
        <Alert
          severity="none"
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.neutral.main,
            mt: 3,
            width: { xs: "70%", sm: "50%" },
            mx: "auto",
          }}
        >
          <strong>NO SETTLEMENT FOUND!</strong>
          <br />
          Please add some expenses items in the Expenses page first.
        </Alert>
      )}
    </>
  );
}
