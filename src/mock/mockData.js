export const expenseData = [
  {
    name: "The Chairs",
    color: "#E7D3A7",
    expenses: [
      {
        item: "樹屋",
        amount: 1200,
        sharedBy: ["The Chairs", "KANA-BOON", "粗大Band", "老王樂隊"],
      },
      { item: "RollinOn", amount: 480, sharedBy: ["The Chairs", "KANA-BOON"] },
    ],
  },
  {
    name: "KANA-BOON",
    color: "#F0B694",
    expenses: [
      { item: "シルエット", amount: 18, sharedBy: ["KANA-BOON", "溫室雜草"] },
    ],
  },
  {
    name: "粗大Band",
    color: "#BFAD76",
    expenses: [
      { item: "留下來陪我", amount: 25, sharedBy: ["粗大Band", "DragonPony"] },
    ],
  },
  {
    name: "DragonPony",
    color: "#C2C2BB",
    expenses: [
      { item: "Deneb", amount: 66, sharedBy: ["DragonPony", "老王樂隊"] },
      { item: "POP UP", amount: 66, sharedBy: ["DragonPony", "溫室雜草"] },
      {
        item: "Morse Code",
        amount: 66,
        sharedBy: ["DragonPony", "The Chairs"],
      },
    ],
  },
  {
    name: "老王樂隊",
    color: "#F0B694",
    expenses: [
      {
        item: "我在愛情的盡頭看見了你和我",
        amount: 365,
        sharedBy: ["老王樂隊", "The Chairs"],
      },
    ],
  },
  {
    name: "溫室雜草",
    color: "#C2C2BB",
    expenses: [
      {
        item: "在這個年代,找不到浪漫",
        amount: 2025,
        sharedBy: ["溫室雜草", "The Chairs", "老王樂隊", "DragonPony"],
      },
      { item: "春天有腳", amount: 30, sharedBy: ["老王樂隊", "粗大Band"] },
    ],
  },
];

// 計算所有使用者的總花費金額
const calculateTotalAmount = (data) => {
  return data.reduce((sum, { expenses }) => {
    const personTotal = expenses.reduce(
      (expenseSum, { amount }) => expenseSum + amount,
      0
    );
    return sum + personTotal;
  }, 0);
};

// 計算所有使用者的個別實際花費
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

// 計算所有使用者的個別已付費花費
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

// 計算結果，正數為收款人，負數代表為付款人
const calculatePayments = (actualExpense, paidAmount) => {
  const balance = {};

  // 計算每個人應該支付或應該收到的金額
  actualExpense.forEach(({ name, actualExpense }) => {
    balance[name] =
      (paidAmount.find((person) => person.name === name)?.paidAmount || 0) -
      actualExpense;
  });

  // 將正數 (payer) 和負數 (payee) 分開
  const payers = [];
  const payees = [];

  for (let person in balance) {
    if (balance[person] > 0) {
      payers.push({ name: person, amount: balance[person] });
    } else if (balance[person] < 0) {
      payees.push({ name: person, amount: -balance[person] }); // 負數轉正數
    }
  }

  // 配對 payer 和 payee
  const transactions = [];
  let payerIndex = 0;
  let payeeIndex = 0;

  while (payerIndex < payers.length && payeeIndex < payees.length) {
    const payer = payers[payerIndex];
    const payee = payees[payeeIndex];
    const transferAmount = Math.min(payer.amount, payee.amount);

    // 生成交易資料
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

    // 更新支付者和接受者的餘額
    payers[payerIndex].amount -= transferAmount;
    payees[payeeIndex].amount -= transferAmount;

    // 移動到下一個 payer 或 payee
    if (payers[payerIndex].amount === 0) {
      payerIndex++;
    }
    if (payees[payeeIndex].amount === 0) {
      payeeIndex++;
    }
  }

  return transactions;
};

const actualExpense = calculateTotalExpensePerPerson(expenseData);
const paidAmount = calculateAmountPaidByEachPerson(expenseData);
export const totalAmount = calculateTotalAmount(expenseData);
export const paymentDetails = calculatePayments(actualExpense, paidAmount);
export const averageAmountPerPerson = parseFloat(
  (totalAmount / expenseData.length).toFixed(0)
);
