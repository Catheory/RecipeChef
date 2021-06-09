import React from "react";
import ReactTags from "react-tag-autocomplete";
import axios from "axios";
import RecipeList from "./RecipeList";

const dietCategories = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Vegan",
].sort();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [],
      allRecipes: [],
      recipes: [],
      diets: [],
      busy: false,
      expanded: false,
      "Gluten Free": false,
      Ketogenic: false,
      Vegetarian: false,
      Vegan: false,
    };
    this.reactTags = React.createRef();
    this.getNewRecipes = this.getNewRecipes.bind(this);
    this.showMoreRecipes = this.showMoreRecipes.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAddition = this.onAddition.bind(this);
    this.onInput = this.onInput.bind(this);
    this.showCheckBoxes = this.showCheckBoxes.bind(this);
    this.onChangeFilter = this.changeFilter.bind(this);
    this.checkCollapseFilter = this.checkCollapseFilter.bind(this);
  }

  componentDidMount() {
    const { diets, tags } = this.state;
    const ingredients = tags.reduce((accum, currentTag) => {
      return accum + `${currentTag.name},`;
    }, "");
    this.getNewRecipes(diets, ingredients);
  }

  async getNewRecipes(diets, ingredients) {
    const dietsStr =
      diets.reduce((accum, currentDiet) => accum + `${currentDiet},`, "") || "";
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.props.spoonacularKey}&diet=${dietsStr}&includeIngredients=${ingredients}&instructionsRequired=true&addRecipeInformation=true&ignorePantry=false&number=200`
    );
    const allRecipes = data.results;
    const newRecipes = allRecipes.slice(0, 12);
    this.setState({ allRecipes, recipes: newRecipes });
  }

  showMoreRecipes() {
    const { allRecipes, recipes } = this.state;
    const currentRecipesLen = recipes.length;
    const newRecipeLen = currentRecipesLen + 12;
    const newRecipes = allRecipes.slice(0, newRecipeLen);
    this.setState({ recipes: newRecipes });
  }

  async onDelete(i) {
    const { tags } = this.state;
    tags.splice(i, 1);
    const { diets } = this.state;
    const ingredients = tags.reduce((accum, currentTag) => {
      return accum + `${currentTag.name},`;
    }, "");

    this.getNewRecipes(diets, ingredients);

    this.setState({
      tags: tags,
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
    const { diets } = this.state;
    const ingredients = tags.reduce((accum, currentTag) => {
      return accum + `${currentTag.name},`;
    }, "");

    this.getNewRecipes(diets, ingredients);
    this.setState({
      tags: tags,
    });
  }

  showCheckBoxes() {
    const { expanded } = this.state;
    if (!expanded) {
      this.setState({ expanded: true });
    } else {
      this.setState({ expanded: false });
    }
  }

  changeFilter(diet) {
    const { tags } = this.state;
    const ingredients = tags.reduce((accum, currentTag) => {
      return accum + `${currentTag.name},`;
    }, "");
    if (!this.state[diet]) {
      let diets = [...this.state.diets, diet];
      this.getNewRecipes(diets, ingredients);
      this.setState({ diets, [diet]: true });
    } else {
      const indx = this.state.diets.indexOf(diet);
      let diets = [...this.state.diets];
      diets.splice(indx, 1);
      this.getNewRecipes(diets, ingredients);
      this.setState({ diets, [diet]: false });
    }
  }

  checkCollapseFilter(evt) {
    let targetEle = evt.target;

    function checkClass(it, className) {
      if (!it) return false;

      if (it.classList.contains(className)) {
        return true;
      }

      return checkClass(it.parentElement, className);
    }

    if (!checkClass(targetEle, "multiselect")) {
      this.setState({ expanded: false });
    }
  }

  render() {
    const { tags, suggestions, allRecipes, recipes, diets, expanded } =
      this.state;

    return (
      <div
        className="app bg-contain"
        style={{
          backgroundImage: ["url(ios-linen-orange.png)"],
        }}
        onClick={this.checkCollapseFilter}
      >
        <div className="app-top overflow-x-hidden ">
          <div
            className="searchBar"
            style={{
              backgroundImage: ["url(search-bg.jpg)"],
            }}
          >
            <div
              className="searchBar-veggies h-screen bg-local bg-center bg-contain bg-no-repeat "
              style={{
                backgroundImage: ["url(veggies.png)"],
              }}
            >
              <div className="w-96 bg-white mx-auto">
                <ReactTags
                  ref={this.reactTags}
                  tags={tags}
                  suggestions={suggestions}
                  onDelete={this.onDelete}
                  onAddition={this.onAddition}
                  onInput={this.onInput}
                  placeholderText="Add ingredients..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="app-bottom text-white">
          <div className="thinking-cook">
            <img src="thinking-cook.png" />
          </div>
          <div className="recipes">
            <div className="filter">
              <div className="chosendiets">
                {diets.map((diet) => (
                  <span key={diet} className="diet">
                    {diet}
                  </span>
                ))}
              </div>
              <div className="multiselect">
                <div className="selectBox" onClick={this.showCheckBoxes}>
                  <span>Select Diet Type</span>
                  <img src="caret-down.png" className="max-w-1/8 m-1" />
                </div>

                <div className="checkboxes-container ">
                  <div
                    id="checkboxes"
                    className={expanded ? "checkbox-100" : "checkbox-0"}
                  >
                    {dietCategories.map((category) => (
                      <div key={category} className="select">
                        <input
                          type="checkbox"
                          className="filterinput"
                          name={category}
                          checked={this.state[category]}
                          onChange={() => this.onChangeFilter(category)}
                        />
                        <label
                          htmlFor={category}
                          onClick={() => this.onChangeFilter(category)}
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="recipeList">
              <RecipeList
                recipes={recipes}
                spoonacularKey={this.props.spoonacularKey}
                youtubeKey={this.props.youtubeKey}
              />

              <div className="loadmore">
                {allRecipes.length > 12 ? (
                  <img
                    src="plus.png"
                    className="plus"
                    onClick={this.showMoreRecipes}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="footer"
          style={{
            backgroundImage: ["url(footer.jpg)"],
          }}
        >
          <div className="flex flex-row">
            <a href="https://www.linkedin.com/in/cathysiruisun">
              <img src="linkedin-logo.png" />
            </a>
            <span>Learn more about me</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
