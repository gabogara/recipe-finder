import { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [flipped, setFlipped] = useState(false);
  const time = recipe.readyInMinutes;
  const servings = recipe.servings;
  const diets = recipe.diets?.slice(0, 2) ?? [];

  return (
    <div
      className={`recipe-card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      title="Click to flip"
    >
      <div className="card-inner">
        <div className="card-face card-front">
          {recipe.image ? (
            <img src={recipe.image} alt={recipe.title} loading="lazy" />
          ) : (
            <div className="no-image">🍽️</div>
          )}
          <div className="card-body">
            <h3 className="card-title">{recipe.title}</h3>
            <div className="card-meta">
              {time && <span>⏱ {time} min</span>}
              {servings && <span>🍴 {servings} srv</span>}
            </div>
            {diets.length > 0 && (
              <div className="diet-tags">
                {diets.map((d) => (
                  <span key={d} className="diet-tag">
                    {d}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card-face card-back">
          <h3 className="card-title back-title">{recipe.title}</h3>
          <ul className="detail-list">
            {recipe.cuisines?.length > 0 && (
              <li>
                <strong>Cuisine</strong> {recipe.cuisines.join(", ")}
              </li>
            )}
            {recipe.dishTypes?.length > 0 && (
              <li>
                <strong>Type</strong> {recipe.dishTypes.join(", ")}
              </li>
            )}
            {recipe.diets?.length > 0 && (
              <li>
                <strong>Diets</strong> {recipe.diets.join(", ")}
              </li>
            )}
            {recipe.readyInMinutes && (
              <li>
                <strong>Ready in</strong> {recipe.readyInMinutes} min
              </li>
            )}
            {recipe.servings && (
              <li>
                <strong>Servings</strong> {recipe.servings}
              </li>
            )}
            {recipe.healthScore != null && (
              <li>
                <strong>Health score</strong> {recipe.healthScore}
              </li>
            )}
          </ul>
          {recipe.sourceUrl && (
            <a
              className="source-link"
              href={recipe.sourceUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              View full recipe ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
