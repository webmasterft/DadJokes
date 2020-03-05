import React, { Component, Fragment } from "react";
import Loader from "./components/Loader";
import SearchForm from "./components/SearchForm";
import JokesList from "./components/JokesList";
import Messages from "./components/Messages";
import Pagination from "./components/Pagination";
import "bootswatch/dist/flatly/bootstrap.min.css";
import "./styles.css";

const initialState = {
  current_page: null,
  limit: 10,
  next_page: null,
  previous_page: null,
  search_term: "",
  isFetching: false,
  total_jokes: null,
  total_pages: null,
  jokes: []
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

  searchJokes(limit = 10, page = 1) {
    this.setState({
      isFetching: true
    });

    fetch(
      `https://icanhazdadjoke.com/search?term=${
        this.state.search_term
      }&limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        this.setState(
          Object.assign({}, json, { isFetching: false, jokes: json.results })
        );
      });
  }

  onSearchChange(value) {
    this.setState({
      search_term: value
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
            onSingleSearchClick={() => this.searchJokes(1, Math.floor(Math.random() * this.state.total_pages) + 1 )}
          />

          {this.state.isFetching ? <Loader /> : ""}

          {this.state.total_jokes === 0 && this.state.isFetching ? (
            <Messages
              type="danger"
              message="Oh snap! No jokes found! Try again!"
            />
          ) : (
            <Fragment>
              <JokesList jokes={this.state.jokes} />
              <Pagination
                limit={this.state.limit}
                previous_page={this.state.previous_page}
                current_page={this.state.current_page}
                total_pages={this.state.total_pages}
                prevPage={() =>
                  this.searchJokes(this.state.limit, this.state.previous_page)
                }
                nextPage={() =>
                  this.searchJokes(this.state.limit, this.state.next_page)
                }
                firstPage={() => this.searchJokes(this.state.limit, 1)}
                lastPage={() =>
                  this.searchJokes(this.state.limit, this.state.total_pages)
                }
              />
            </Fragment>
          )}
        </div>
      </div>
    );
  }
  //return
}

export default App;
