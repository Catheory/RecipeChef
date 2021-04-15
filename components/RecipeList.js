import React from "react";
import RecipeItem from "./RecipeItem";

export default function RecipeList(props) {
  const recipes = props.recipes || "";
  return (
    <>
      {!recipes ? (
        <h1>no recipes</h1>
      ) : (
        <div className="flex flex-col my-4">
          <h1 className="">Recipes inspired by your ingredients!</h1>
          <div className="flex flex-row flex-wrap place-items-center">
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                <RecipeItem recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
