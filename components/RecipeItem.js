import SingleRecipe from "./SingleRecipe";

export default function RecipeItem(props) {
  const { recipe, activeRecipeId, recipeDetail } = props;
  return (
    <>
      <div className="flex flex-col mx-10">
        <img
          src={recipe.image}
          onClick={() => {
            props.onRecipe(recipe.id);
          }}
          className="my-5"
        />
        <h2>{recipe.title}</h2>
      </div>
      {recipe.id !== activeRecipeId ? (
        ""
      ) : (
        <SingleRecipe recipeDetail={recipeDetail} />
      )}
    </>
  );
}
