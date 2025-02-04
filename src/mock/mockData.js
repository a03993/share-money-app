export const expenseMockData = [
  {
    linkId: "1234567890",
    expenses: [
      {
        name: "The Chairs",
        color: "#E7D3A7",
        personalExpenses: [
          {
            item: "樹屋",
            amount: 1200,
            sharedBy: ["The Chairs", "KANA-BOON", "粗大Band", "老王樂隊"],
          },
          {
            item: "RollinOn",
            amount: 480,
            sharedBy: ["The Chairs", "KANA-BOON"],
          },
        ],
      },
      {
        name: "KANA-BOON",
        color: "#F0B694",
        personalExpenses: [
          {
            item: "シルエット",
            amount: 18,
            sharedBy: ["KANA-BOON", "溫室雜草"],
          },
        ],
      },
      {
        name: "粗大Band",
        color: "#BFAD76",
        personalExpenses: [
          {
            item: "留下來陪我",
            amount: 25,
            sharedBy: ["粗大Band", "DragonPony"],
          },
        ],
      },
      {
        name: "DragonPony",
        color: "#C2C2BB",
        personalExpenses: [
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
        personalExpenses: [
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
        personalExpenses: [
          {
            item: "在這個年代,找不到浪漫",
            amount: 2025,
            sharedBy: ["溫室雜草", "The Chairs", "老王樂隊", "DragonPony"],
          },
          { item: "春天有腳", amount: 30, sharedBy: ["老王樂隊", "粗大Band"] },
        ],
      },
    ],
  },
  {
    linkId: "0987654321",
    expenses: [
      {
        name: "Amazing show",
        color: "#F0B694",
        personalExpenses: [
          {
            item: "擋一根",
            amount: 140,
            sharedBy: ["Amazing show", "icyball"],
          },
          {
            item: "我要你愛",
            amount: 5102,
            sharedBy: ["Amazing show", "庸俗救星", "icyball"],
          },
        ],
      },
      {
        name: "庸俗救星",
        color: "#E7D3A7",
        personalExpenses: [
          {
            item: "安眠曲",
            amount: 18,
            sharedBy: ["庸俗救星", "Amazing show"],
          },
        ],
      },
      {
        name: "icyball",
        color: "#BFAD76",
        personalExpenses: [
          {
            item: "讓我餘生只為你唱情歌",
            amount: 60,
            sharedBy: ["icyball", "庸俗救星"],
          },
          {
            item: "能不能和我留在台北陪我幾天",
            amount: 101,
            sharedBy: ["icyball", "Amazing show"],
          },
        ],
      },
    ],
  },
];
