import React, { Component } from "react";
import Loader from "./components/Loader";
import SearchForm from "./components/SearchForm";
import JokesList from "./components/JokesList";
import Messages from "./components/Messages";
import "bootswatch/dist/flatly/bootstrap.min.css";
import "./styles.css";


const initialState = {
  searchTerm: "",
  totalJokes: null,
  jokes: [],
  isFetching: false
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
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

  onReset(e) {
    e.preventDefault();
    this.setState(initialState);
    document.getElementById("searchForm").reset();
  }

  render() {
    return (
      <div>
        <div className="col-md-12">
          <h2 className="text-center">Dad Jokes</h2>
          <SearchForm
            onFormSubmit={this.onSearchSubmit}
            onSearchValueChange={this.onSearchChange}
            onReset={this.onReset}
            isSearching={this.state.isFetching}
            onSingleSearchClick={() => this.searchJokes(1)}
          />

          {this.state.isFetching ? <Loader /> : ""}

          {this.state.totalJokes === 0 ? (
            <Messages
              type="danger"
              message="Oh snap! No jokes found! Try again!"
            />
          ) : (
            <JokesList jokes={this.state.jokes} />
          )}
        </div>
      </div>
    );
  }
  //return
}

export default App;
