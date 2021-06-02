import React from "react";
import axios from "axios";
import RecipeItem from "./RecipeItem";

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRecipeId: "",
      isActive: false,
      recipeDetail: {},
      youtubeVideo: {},
      youtubeKey: this.props.youtubeKey,
      spoonacularKey: this.props.spoonacularKey,
    };
    this.onRecipe = this.onRecipe.bind(this);
  }

  async onRecipe(id) {
    const { isActive, activeRecipeId, spoonacularKey, youtubeKey } = this.state;
    if (isActive && activeRecipeId === id) {
      this.setState({
        activeRecipeId: "",
        isAtive: false,
        recipeDetail: {},
        youtubeVideo: {},
      });
    } else {
      const result = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularKey}&includeNutrition=true`
      );
      const recipeDetail = result.data;

      const videoSearch = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${recipeDetail.title}&key=${youtubeKey}`
      );
      const firstVideo = videoSearch.data.items[0];

      this.setState({
        activeRecipeId: id,
        isActive: true,
        recipeDetail: recipeDetail,
        youtubeVideo: firstVideo,
      });
    }
  }

  render() {
    const { recipes } = this.props;

    return (
      <>
        {!recipes ? (
          <span>
            Oops, try putting in different ingredients to search recipes
            available
          </span>
        ) : (
          <div className="flex flex-col my-4">
            <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {recipes.map((recipe) => (
                <div key={recipe.id}>
                  <RecipeItem
                    recipe={recipe}
                    onRecipe={this.onRecipe}
                    activeRecipeId={this.state.activeRecipeId}
                    recipeDetail={this.state.recipeDetail}
                    youtubeVideo={this.state.youtubeVideo}
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
