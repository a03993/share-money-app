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

export const totalAmount = expenseData.reduce((sum, person) => {
  const personTotal = person.expenses.reduce(
    (expenseSum, expense) => expenseSum + expense.amount,
    0
  );
  return sum + personTotal;
}, 0);

export const paymentDetails = [
  {
    payer: {
      name: "The Chairs",
      avatarColor: "#E7D3A7",
    },
    payee: {
      name: "KANA-BOON",
      avatarColor: "#F0B694",
    },
    amount: 600,
  },
  {
    payer: {
      name: "DragonPony",
      avatarColor: "#C2C2BB",
    },
    payee: {
      name: "老王樂隊",
      avatarColor: "#F0B694",
    },
    amount: 66,
  },
];
