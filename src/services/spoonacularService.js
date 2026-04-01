const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json",
};

const searchRecipes = async (query = "", filters = {}) => {
  try {
    const params = new URLSearchParams({
      query,
      number: 20,
      addRecipeInformation: true,
      fillIngredients: false,
    });

    if (filters.cuisine) params.append("cuisine", filters.cuisine);
    if (filters.type) params.append("type", filters.type);
    if (filters.diet) params.append("diet", filters.diet);

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
      headers,
    });
    
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
