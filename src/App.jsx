import "./App.css";
import * as spoonService from "./services/spoonacularService";

import React, { useEffect, useState } from "react";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

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

  return (
    <div>
      <h1>Welcome to RecipeFinder</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

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
