import React, { useEffect, useState } from "react";
import "./App.css";
import * as spoonService from "./services/spoonacularService";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ cuisine: "", type: "", diet: "" });
  const [localSearch, setLocalSearch] = useState("");

  // useEffect(() => {
  //   fetchData("", {});
  // }, []);

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

  return (
    <div>
      <header>
        <div>
          <p>Spoonacular · Recipe Explorer</p>
          <h1>Welcome to RecipeFinder</h1>
          <form>
            <label htmlFor="query">Type of food:</label>
            <input
              type="text"
              placeholder="pasta, tacos, curry..."
              id="query"
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

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} width="150" />
        </div>
      ))}
    </div>
  );
};

export default App;
