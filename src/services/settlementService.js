const BASE_URL = "/api/settlements";

export const settlementService = {
  getSettlements: async (linkId) => {
    const response = await fetch(`${BASE_URL}/${linkId}`);
    if (!response.ok) throw new Error("Failed to fetch settlements");
    return response.json();
  },

  updateSettlements: async (linkId, currentExpenseItem) => {
    const response = await fetch(`${BASE_URL}/${linkId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentExpenseItem }),
    });
    if (!response.ok) throw new Error("Failed to save settlements");
    return response.json();
  },

  updateSettlementStatus: async (linkId, settlementId) => {
    const response = await fetch(`${BASE_URL}/${linkId}/${settlementId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to update settlement status");
    return response.json();
  },
};
