import React, { useEffect, useState, useMemo } from "react";
import "./App.css";

import * as spoonService from "./services/spoonacularService";
import RecipeCard from "./components/RecipeCard";
import Select from "./components/Select";
import { CUISINES, DISH_TYPES, DIETS } from "./data/data";
import Stat from "./components/Stat";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ cuisine: "", type: "", diet: "" });
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    fetchData("", { cuisine: "", type: "", diet: "" });
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(query, filters);
  };

  const handleFilterChange = (key, value) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    fetchData(query, next);
  };

  const displayed = useMemo(() => {
    if (!localSearch.trim()) return recipes;
    const lc = localSearch.toLowerCase();
    return recipes.filter((r) => r.title.toLowerCase().includes(lc));
  }, [recipes, localSearch]);

  return (
    <div>
      <header className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">Spoonacular · Recipe Finder</p>
          <h1 className="hero-title">
            Find your next <br />
            <em>favorite dish</em>
          </h1>
          <form className="search-form" onSubmit={handleSearch}>
            <label htmlFor="query-food">Type of food:</label>
            <input
              className="search-input"
              type="text"
              placeholder="pasta, tacos, curry..."
              id="query-food"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button className="search-btn" type="submit" disabled={loading}>
              {loading ? "..." : "Search"}
            </button>
          </form>
        </div>
      </header>

      <main className="main">
        <section className="filters-bar">
          <Select
            label="Cuisine"
            options={CUISINES}
            value={filters.cuisine}
            onChange={(v) => handleFilterChange("cuisine", v)}
          />
          <Select
            label="Dish type"
            options={DISH_TYPES}
            value={filters.type}
            onChange={(v) => handleFilterChange("type", v)}
          />
          <Select
            label="Diet"
            options={DIETS}
            value={filters.diet}
            onChange={(v) => handleFilterChange("diet", v)}
          />
          {(filters.cuisine || filters.type || filters.diet) && (
            <button
              className="clear-btn"
              type="button"
              onClick={() => {
                const empty = { cuisine: "", type: "", diet: "" };
                setFilters(empty);
                fetchData(query, empty);
              }}
            >
              ✕ Clear filters
            </button>
          )}
        </section>

        <Stat recipes={displayed} />

        {recipes.length > 0 && (
          <div className="local-search-wrap">
            <input
              className="local-search"
              type="text"
              placeholder="Filter results by name…"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <span className="result-count">{displayed.length} recipes</span>
          </div>
        )}
        {error && <p className="error-msg">{error}</p>}
        {loading && (
          <div className="loader-wrap">
            <span className="loader" />
            <p>Fetching delicious recipes…</p>
          </div>
        )}
        {!loading && displayed.length > 0 && (
          <div className="recipe-grid">
            {displayed.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}
        {!loading && !error && recipes.length > 0 && displayed.length === 0 && (
          <p className="empty-msg">No recipes match your local filter.</p>
        )}
        {!loading && !error && recipes.length === 0 && (
          <p className="empty-msg">No recipes found. Try a different search.</p>
        )}
      </main>
    </div>
  );
};

export default App;
