import React, { Component } from "react";
import Loader from "./components/loader";
import "./styles.css";
import ".";

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: "",
      jokes: [],
      isFetching: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.SearchSubmit = this.onSearchSubmit.bind(this);
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

  onSearchChange(e) {
    this.setState({
      searchTerm: e.target.value
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
          <form onSubmit={this.onSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              onChange={e => this.onSearchChange}
            />
            <button>Search</button>
            <button
              onClick={() => this.searchJokes(1)}
              disabled={this.state.isFetching}
            >
              I'm felling funny
            </button>
          </form>

          {this.state.isFetching ? <Loader /> : this.renderJokes()}
        </div>
      </div>
    );
  }
  //return
}

export default App;
