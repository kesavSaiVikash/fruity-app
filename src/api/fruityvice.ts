import { Fruit } from "../types";

const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const BASE_URL = "https://www.fruityvice.com/api/fruit/all";

export const fetchFruits = async (): Promise<Fruit[]> => {
  try {
    const response = await fetch(CORS_PROXY + encodeURIComponent(BASE_URL));

    if (!response.ok) {
      throw new Error(`Failed to fetch fruits: ${response.statusText}`);
    }

    const data: Fruit[] = await response.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return [];
  }
};
