import React, { Component } from "react";
import Loader from "./components/Loader";
import SearchForm from "./components/SearchForm";
import "./styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: "",
      jokes: [],
      isFetching: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
  }

  searchJokes(limit = 20) {
    this.setState({
      isFetching: true
    });

    fetch(
      `https://icanhazdadjoke.com/search?term=${
        this.state.searchTerm
      }&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          jokes: json.results,
          isFetching: false
        });
      });
  }

  onSearchChange(value) {
    this.setState({
      searchTerm: value
    });
  }
  onSearchSubmit(e) {
    e.preventDefault();
    this.searchJokes();
  }

  renderJokes() {
    return (
      <ul>
        {this.state.jokes.map(item => (
          <li key={item.id}>{item.joke}</li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <div>
        <div className="container">
          <SearchForm
            onFormSubmit={this.onSearchSubmit}
            onSearchValueChange={this.onSearchChange}
            isSearching={this.state.isFetching}
            onSingleSearchClick={() => this.searchJokes(1)}
          />

          {this.state.isFetching ? <Loader /> : this.renderJokes()}
          
        </div>
      </div>
    );
  }
  //return
}

export default App;
