export const expenseData = [
  {
    name: "The Chairs",
    color: "#E7D3A7",
    expenses: [
      { item: "樹屋", amount: 1200 },
      { item: "RollinOn", amount: 480 },
    ],
  },
  {
    name: "KANA-BOON",
    color: "#F0B694",
    expenses: [{ item: "シルエット", amount: 18 }],
  },
  {
    name: "粗大Band",
    color: "#BFAD76",
    expenses: [{ item: "留下來陪我", amount: 25 }],
  },
  {
    name: "DragonPony",
    color: "#C2C2BB",
    expenses: [
      { item: "Deneb", amount: 66 },
      { item: "POP UP", amount: 66 },
      { item: "Morse Code", amount: 66 },
    ],
  },
  {
    name: "老王樂隊",
    color: "#F0B694",
    expenses: [{ item: "我在愛情的盡頭看見了你和我", amount: 365 }],
  },
  {
    name: "溫室雜草",
    color: "#C2C2BB",
    expenses: [
      { item: "在這個年代,找不到浪漫", amount: 2025 },
      { item: "春天有腳", amount: 30 },
    ],
  },
];

export const totalAmount = expenseData.reduce((sum, person) => {
  const personTotal = person.expenses.reduce(
    (expenseSum, expense) => expenseSum + expense.amount,
    0
  );
  return sum + personTotal;
}, 0);
