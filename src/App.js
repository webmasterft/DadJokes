import React, { Component } from "react";
import Loader from "./components/Loader";
import SearchForm from "./components/SearchForm";
import JokesList from "./components/JokesList";
import Messages from "./components/Messages";
import "bootswatch/dist/flatly/bootstrap.min.css";
import "./styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: "",
      totalJokes: null,
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
        console.log(json);
        this.setState({
          jokes: json.results,
          isFetching: false,
          totalJokes: json.total_jokes
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

  render() {
    return (
      <div>
        <div className="col-md-12">
          <h2 className="text-center">Dad Jokes</h2>
          <SearchForm
            onFormSubmit={this.onSearchSubmit}
            onSearchValueChange={this.onSearchChange}
            isSearching={this.state.isFetching}
            onSingleSearchClick={() => this.searchJokes(1)}
          />

          {this.state.isFetching ? (
            <Loader />
          ) : this.state.totalJokes > 1 && this.state.totalJokes !== null ? (
            <JokesList jokes={this.state.jokes} />
          ) : (
            <Messages
              type="danger"
              message="Oh snap! No jokes found! Try again!"
            />
          )}
        </div>
      </div>
    );
  }
  //return
}

export default App;
