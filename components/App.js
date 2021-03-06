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
      allRecipes: this.props.allRecipes,
      recipes: this.props.allRecipes.slice(0, 12),
      diets: [],
      scrolled: false,
      busy: false,
      expanded: false,
      "Gluten Free": false,
      Ketogenic: false,
      Vegetarian: false,
      Vegan: false,
    };
    this.reactTags = React.createRef();
    this.searchRef = React.createRef();
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
    window.onscroll = () =>
      this.setState({
        scrolled: window.scrollY > this.searchRef.current.offsetTop,
      });
  }

  async getNewRecipes(diets, ingredients) {
    const dietsStr =
      diets.reduce((accum, currentDiet) => accum + `${currentDiet},`, "") || "";
    const response = await axios.get(
      `api/recipesList?dietsStr=${dietsStr}&ingredients=${ingredients}`
    );
    const allRecipes = response.data.results;
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

      const response = await axios.get(`api/ingredient?query=${query}`);

      const newSuggestions = response.data.results.map((ingredient) => {
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
    const {
      tags,
      suggestions,
      allRecipes,
      recipes,
      diets,
      expanded,
      scrolled,
    } = this.state;

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
              ref={this.searchRef}
              className="searchBar-veggies bg-local bg-no-repeat flex flex-col justify-center"
              style={{
                backgroundImage: ["url(veggies.png)"],
              }}
            >
              <div className="searchBar-tags mx-auto">
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
                {allRecipes.length > 12 &&
                recipes.length < allRecipes.length ? (
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

            <div id="backToTop">
              <img
                src="up-arrow.png"
                style={{ display: `${scrolled ? "block" : "none"}` }}
                onClick={() =>
                  this.searchRef.current.scrollIntoView({ behavior: "smooth" })
                }
              />
            </div>
          </div>
        </div>
        <div
          className="footer-container"
          style={{
            backgroundImage: ["url(footer.jpg)"],
          }}
        >
          <div>
            <div className="footericons flex flex-row justify-center">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/cathysiruisun"
              >
                <img src="linkedin-logo.png" />
              </a>
              <a target="_blank" href="https://github.com/Catheory/RecipeChef">
                <img src="github.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
