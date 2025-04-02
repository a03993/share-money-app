export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export const COLOR_CLASS_MAP: Record<string, string> = {
  "#a7958b": "avatar-beige",
  "#bfad76": "avatar-gold",
  "#e7d3a7": "avatar-yellow",
  "#f0b694": "avatar-peach",
  "#c2c2bb": "avatar-gray",
};
