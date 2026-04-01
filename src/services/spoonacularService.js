const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json",
};

const searchRecipes = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}?query=${encodeURIComponent(query)}&number=10`,
      {
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export { searchRecipes };
