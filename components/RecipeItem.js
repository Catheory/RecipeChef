import SingleRecipe from "./SingleRecipe";

export default function RecipeItem(props) {
  const { recipe, activeRecipeId, onRecipe, recipeDetail, youtubeVideo } =
    props;
  return (
    <>
      <div className="flex flex-col mx-10">
        <div className="img-hover-zoom">
          <img
            src={recipe.image}
            onClick={() => {
              onRecipe(recipe.id);
            }}
            className="recipePic"
          />
        </div>
        <h2>{recipe.title}</h2>
      </div>
      {recipe.id !== activeRecipeId ? (
        ""
      ) : (
        <SingleRecipe recipeDetail={recipeDetail} youtubeVideo={youtubeVideo} />
      )}
    </>
  );
}
