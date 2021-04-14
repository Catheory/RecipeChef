import React from "react";
import ReactTags from "react-tag-autocomplete";
import axios from "axios";

class TagBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Pears" },
      ],
      busy: false,
    };
    this.reactTags = React.createRef();
    this.onDelete = this.onDelete.bind(this);
    this.onAddition = this.onAddition.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  onDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
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

  onAddition(tag) {
    const tags = [...this.state.tags, tag];
    this.setState({ tags });
  }

  render() {
    return (
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
    );
  }
}

export default TagBar;
