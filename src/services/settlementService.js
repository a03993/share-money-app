const BASE_URL = "/api";

export const settlementService = {
  getSettlements: async (linkId) => {
    const response = await fetch(`${BASE_URL}/${linkId}/settlements`);
    if (!response.ok) throw new Error("Failed to fetch settlements");
    return response.json();
  },

  updateSettlements: async (linkId, settlements) => {
    const response = await fetch(`${BASE_URL}/${linkId}/settlements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ settlements }),
    });
    if (!response.ok) throw new Error("Failed to save settlements");
    return response.json();
  },
};
