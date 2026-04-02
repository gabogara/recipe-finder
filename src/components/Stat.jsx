import { useMemo } from "react";

const StatCard = ({ label, value }) => (
  <div className="stat-card">
    <span className="stat-value">{value}</span>
    <span className="stat-label">{label}</span>
  </div>
);

const Stat = ({ recipes }) => {
  const stats = useMemo(() => {
    if (!recipes.length) return null;

    const withTime = recipes.filter((r) => r.readyInMinutes);
    const avgTime = withTime.length
      ? Math.round(
          withTime.reduce((s, r) => s + r.readyInMinutes, 0) / withTime.length
        )
      : null;

    const vegCount = recipes.filter(
      (r) => r.vegetarian || r.diets?.includes("vegetarian")
    ).length;

    const cuisineMap = {};
    recipes.forEach((r) =>
      r.cuisines?.forEach((c) => (cuisineMap[c] = (cuisineMap[c] ?? 0) + 1))
    );
    const topCuisine =
      Object.entries(cuisineMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    const withHealth = recipes.filter((r) => r.healthScore);
    const avgHealth = withHealth.length
      ? Math.round(
          withHealth.reduce((s, r) => s + r.healthScore, 0) / withHealth.length
        )
      : null;
    return {
      total: recipes.length,
      avgTime,
      vegCount,
      topCuisine,
      avgHealth,
    };
  }, [recipes]);

  if (!stats) return null;

  return (
    <section className="stats-grid">
      <StatCard label="Recipes loaded" value={stats.total} />
      <StatCard
        label="Avg. cook time"
        value={stats.avgTime != null ? `${stats.avgTime} min` : "—"}
      />
      <StatCard label="Vegetarian" value={stats.vegCount} />
      <StatCard label="Top cuisine" value={stats.topCuisine ?? "—"} />
      <StatCard label="Avg. health score" value={stats.avgHealth || "—"} />
    </section>
  );
};

export default Stat;
