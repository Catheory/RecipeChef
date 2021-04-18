import React from "react";
import axios from "axios";
import RecipeItem from "./RecipeItem";

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRecipeId: "",
      recipeDetail: {},
    };
    this.onRecipe = this.onRecipe.bind(this);
  }

  async onRecipe(id) {
    debugger;
    const { spoonacularKey } = this.props;
    const result = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularKey}&includeNutrition=true`
    );
    const recipeDetail = result.data;
    this.setState({
      activeRecipeId: id,
      recipeDetail: recipeDetail,
    });
  }

  render() {
    const { recipes } = this.props;
    return (
      <>
        {!recipes ? (
          <h1>no recipes</h1>
        ) : (
          <div className="flex flex-col my-4">
            <h1 className="">Recipes inspired by your ingredients!</h1>
            <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {recipes.map((recipe) => (
                <div key={recipe.id}>
                  <RecipeItem
                    recipe={recipe}
                    onRecipe={this.onRecipe}
                    activeRecipeId={this.state.activeRecipeId}
                    recipeDetail={this.state.recipeDetail}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default RecipeList;
