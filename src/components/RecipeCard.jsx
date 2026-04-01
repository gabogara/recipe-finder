const RecipeCard = ({ recipe }) => {
  const {
    title,
    image,
    readyInMinutes,
    servings,
    diets = [],
    cuisines = [],
    sourceUrl,
  } = recipe;

  return (
    <article>
      <div>
        {image ? <img src={image} alt={title} loading="lazy" /> : <div>🍽️</div>}
        {cuisines.length > 0 && <span>{cuisines[0]}</span>}
      </div>

      <div>
        <h3>{title}</h3>

        <div>
          {readyInMinutes && (
            <span>
              <span>⏱</span> {readyInMinutes} min
            </span>
          )}
          {servings && (
            <span>
              <span>🍴</span> {servings} servings
            </span>
          )}
        </div>

        {diets.length > 0 && (
          <div>
            {diets.slice(0, 3).map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        )}

        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            View recipe →
          </a>
        )}
      </div>
    </article>
  );
};

export default RecipeCard;
