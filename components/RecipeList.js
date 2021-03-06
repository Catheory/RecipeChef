import React from "react";
import axios from "axios";
import RecipeItem from "./RecipeItem";

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRecipeId: "",
      isActive: false,
      isLoading: false,
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
        isActive: false,
        recipeDetail: {},
        youtubeVideo: {},
      });
    } else {
      this.setState({
        isActive: true,
        isLoading: true,
        activeRecipeId: id,
      });

      const response = await axios.get(`api/recipeDetail?id=${id}`);
      const recipeDetail = response.data;

      const videoSearch = await axios.get(`api/video?q=${recipeDetail.title}`);
      const firstVideo = videoSearch.data.items[0];

      this.setState({
        isLoading: false,
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
            <div className="md:grid grid-cols-3 xl:grid-cols-3 gap-4 2xl:grid-cols-4">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="recipeitem">
                  <RecipeItem
                    recipe={recipe}
                    isLoading={this.state.isLoading}
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
