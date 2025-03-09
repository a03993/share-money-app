const BASE_URL = "/api/expenses";

export const expenseService = {
  createExpenseLink: async (newExpenseData) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpenseData),
    });
    if (!response.ok) throw new Error("Failed to create expense link");
    return response.json();
  },

  getExpenses: async (linkId) => {
    const response = await fetch(`${BASE_URL}/${linkId}`);
    if (!response.ok) throw new Error("Failed to fetch expenses");
    return response.json();
  },

  createExpense: async (linkId, expenseData) => {
    const response = await fetch(`${BASE_URL}/${linkId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    });
    if (!response.ok) throw new Error("Failed to create expense");
    return response.json();
  },

  deleteExpense: async (linkId, expenseId) => {
    const response = await fetch(`${BASE_URL}/${linkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: expenseId }),
    });
    if (!response.ok) throw new Error("Failed to delete expense");
    return response.json();
  },

  createUsers: async (linkId, users) => {
    const response = await fetch(`${BASE_URL}/${linkId}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users }),
    });
    if (!response.ok) throw new Error("Failed to create users");
    return response.json();
  },
};
