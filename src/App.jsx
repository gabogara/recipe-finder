import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import * as spoonService from "./services/spoonacularService";
import RecipeCard from "./components/RecipeCard";

const CUISINES = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];
const DISH_TYPES = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink",
];
const DIETS = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto-vegetarian",
  "ovo-vegetarian",
  "vegan",
  "pescetarian",
  "paleo",
  "primal",
  "low FODMAP",
  "whole30",
];

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ cuisine: "", type: "", diet: "" });
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    fetchData("", {});
  }, []);

  const fetchData = async (q, f) => {
    try {
      setLoading(true);
      setError("");

      const data = await spoonService.searchRecipes(q, f);
      setRecipes(data ?? []);
    } catch (err) {
      setError("Something went wrong while fetching recipes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  const displayed = useMemo(() => {
    if (!localSearch.trim()) return recipes;
    const lc = localSearch.toLowerCase();
    return recipes.filter((r) => r.title.toLowerCase().includes(lc));
  }, [recipes, localSearch]);

  return (
    <div>
      <header>
        <div>
          <p>Spoonacular · Recipe Explorer</p>
          <h1>Welcome to RecipeFinder</h1>
          <form>
            <label htmlFor="query-food">Type of food:</label>
            <input
              type="text"
              placeholder="pasta, tacos, curry..."
              id="query-food"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button type="submit" disabled={loading}>
              {loading ? "..." : "Search"}
            </button>
          </form>
        </div>
      </header>

      <main>
        {recipes.length > 0 && (
          <div>
            <input
              type="text"
              placeholder="Filter results by name…"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <span>{displayed.length} recipes</span>
          </div>
        )}

        {error && <p>{error}</p>}
        {loading && (
          <div>
            <span />
            <p>Fetching delicious recipes…</p>
          </div>
        )}

        {!loading && displayed.length > 0 && (
          <div>
            {displayed.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}

        {!loading && !error && recipes.length > 0 && displayed.length === 0 && (
          <p>No recipes match your local filter.</p>
        )}

        {!loading && !error && recipes.length === 0 && (
          <p>No recipes found. Try a different search.</p>
        )}
      </main>
    </div>
  );
};

export default App;
