import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

import AverageAmount from "./AverageAmount";
import MemberAvatars from "./MemberAvatars";
import PaymentTransferList from "./PaymentTransferList";
import SummarySection from "./SummarySection";

import { useState, useEffect } from "react";

const commonGridSx = {
  maxWidth: {
    xs: "80%",
    sm: "70%",
    lg: "60%",
  },
  mx: "auto",
};

const calculateAverageAmountPerPerson = (totalAmount, expenseData) => {
  return parseFloat((totalAmount / expenseData.length).toFixed(0));
};

const calculateTotalExpensePerPerson = (data) => {
  const totalExpenses = {};

  data.forEach(({ name, expenses }) => {
    const personTotal = expenses.reduce(
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

const calculateAmountPaidByEachPerson = (data) => {
  const amountPaid = {};

  data.forEach(({ expenses }) => {
    expenses.forEach(({ amount, sharedBy }) => {
      const splitAmount = amount / sharedBy.length;
      sharedBy.forEach((person) => {
        if (!amountPaid[person]) {
          amountPaid[person] = 0;
        }
        amountPaid[person] += splitAmount;
      });
    });
  });

  return Object.entries(amountPaid).map(([name, paid]) => ({
    name,
    paidAmount: parseFloat(paid.toFixed(0)),
  }));
};

const calculatePayments = (actualExpense, paidAmount, expenseData) => {
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

    transactions.push({
      payer: {
        name: payer.name,
        avatarColor: expenseData.find((person) => person.name === payer.name)
          .color,
      },
      payee: {
        name: payee.name,
        avatarColor: expenseData.find((person) => person.name === payee.name)
          .color,
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

export default function ResultPage({ expenseData, totalAmount }) {
  const [averageAmountPerPerson, setAverageAmountPerPerson] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    setAverageAmountPerPerson(
      calculateAverageAmountPerPerson(totalAmount, expenseData)
    );
  }, [totalAmount, expenseData]);

  useEffect(() => {
    const actualExpense = calculateTotalExpensePerPerson(expenseData);
    const paidAmount = calculateAmountPaidByEachPerson(expenseData);
    const newPaymentDetails = calculatePayments(
      actualExpense,
      paidAmount,
      expenseData
    );
    setPaymentDetails(newPaymentDetails);
  }, [expenseData]);

  return (
    <>
      {expenseData.length !== 0 ? (
        <>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
              maxWidth: {
                xs: "80%",
                sm: "70%",
                lg: "60%",
              },
              mx: "auto",
              mt: 10,
              mb: 10,
              justifyContent: "center",
            }}
          >
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
              <AverageAmount amount={averageAmountPerPerson} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <MemberAvatars members={expenseData} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
              <SummarySection
                page="result"
                expenseData={expenseData}
                totalAmount={totalAmount}
              />
            </Grid>
          </Grid>
          <PaymentTransferList paymentDetails={paymentDetails} />
        </>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            ...commonGridSx,
            mt: 20,
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            className="font-weight-thin font-color-dark-gray text-align-center"
          >
            Please go back to list page
            <br /> and add something to this list
          </Typography>
        </Grid>
      )}
    </>
  );
}
