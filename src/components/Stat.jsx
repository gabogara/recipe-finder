import { useMemo } from "react";

const StatCard = ({ label, value }) => (
  <div>
    <span>{value}</span>
    <span>{label}</span>
  </div>
);

const Stat = ({ recipes }) => {
  const stats = useMemo(() => {
    if (!recipes.length) return null;
    const avgTime =
      recipes
        .filter((r) => r.readyInMinutes)
        .reduce((s, r) => s + r.readyInMinutes, 0) /
      (recipes.filter((r) => r.readyInMinutes).length || 1);
    const vegCount = recipes.filter((r) =>
      r.diets?.includes("vegetarian")
    ).length;
    const cuisineMap = {};
    recipes.forEach((r) =>
      r.cuisines?.forEach((c) => (cuisineMap[c] = (cuisineMap[c] ?? 0) + 1))
    );
    const topCuisine =
      Object.entries(cuisineMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
    const avgHealth =
      recipes
        .filter((r) => r.healthScore)
        .reduce((s, r) => s + r.healthScore, 0) /
      (recipes.filter((r) => r.healthScore).length || 1);
    return {
      total: recipes.length,
      avgTime: Math.round(avgTime),
      vegCount,
      topCuisine,
      avgHealth: Math.round(avgHealth),
    };
  }, [recipes]);
  return (
    <div>
      {stats && (
        <section>
          <StatCard label="Recipes loaded" value={stats.total} />
          <StatCard label="Avg. cook time" value={`${stats.avgTime} min`} />
          <StatCard label="Vegetarian" value={stats.vegCount} />
          <StatCard label="Top cuisine" value={stats.topCuisine} />
          <StatCard label="Avg. health score" value={stats.avgHealth || "—"} />
        </section>
      )}
    </div>
  );
};

export default Stat;
