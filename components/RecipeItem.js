import React from "react";

export default function RecipeItem(props) {
  const recipe = props.recipe || "";
  return (
    <>
      {!recipe ? (
        `no recipe`
      ) : (
        <div className="flex flex-col mx-10">
          <img src={recipe.image} className="my-5" />
          <h2>{recipe.title}</h2>
        </div>
      )}
    </>
  );
}
