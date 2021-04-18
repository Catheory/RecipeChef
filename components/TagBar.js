import React from "react";
import ReactTags from "react-tag-autocomplete";
import axios from "axios";
import RecipeList from "./RecipeList";

class TagBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [],
      recipes: [],
      busy: false,
    };
    this.reactTags = React.createRef();
    this.onDelete = this.onDelete.bind(this);
    this.onAddition = this.onAddition.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  async onDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    const ingredients = tags.reduce((accum, currentTag) => {
      return accum + `${currentTag.name},`;
    }, "");
    const result = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${this.props.spoonacularKey}&ingredients=${ingredients}`
    );
    const newRecipes = result.data;
    this.setState({
      tags: tags,
      recipes: newRecipes,
    });
  }

  async onInput(query) {
    if (!this.state.busy) {
      this.setState({ busy: true });

      const result = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?apiKey=${this.props.spoonacularKey}&query=${query}`
      );

      const newSuggestions = result.data.results.map((ingredient) => {
        let newSuggest = {};
        newSuggest.id = ingredient.id;
        newSuggest.name = ingredient.name;
        return newSuggest;
      });
      this.setState({
        busy: false,
        suggestions: newSuggestions,
      });
    }
  }

  async onAddition(tag) {
    const tags = [...this.state.tags, tag];
    const ingredients = tags.reduce((accum, currentTag) => {
      return accum + `${currentTag.name},`;
    }, "");
    const result = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${this.props.spoonacularKey}&ingredients=${ingredients}`
    );
    const newRecipes = result.data;
    this.setState({
      tags: tags,
      recipes: newRecipes,
    });
  }

  render() {
    return (
      <div>
        <div className="w-1/2">
          <ReactTags
            ref={this.reactTags}
            tags={this.state.tags}
            suggestions={this.state.suggestions}
            onDelete={this.onDelete}
            onAddition={this.onAddition}
            onInput={this.onInput}
          />
        </div>
        <RecipeList
          recipes={this.state.recipes}
          spoonacularKey={this.props.spoonacularKey}
        />
      </div>
    );
  }
}

export default TagBar;
