import React from "react";

const SearchForm = props => (
  <form onSubmit={props.onFormSubmit} className="form my-2 my-lg-0">
    <div className="form-group">
      <input
        className="form-control"
        type="text"
        placeholder="Search..."
        onChange={e => props.onSearchValueChange(e.target.value)}
      />
    </div>
    <div className="form-group d-flex justify-content-center">
      <button
        className="btn btn-success mr-2"
        disabled={props.isSearching}
      >
        Search
      </button>
      <button
        className="btn btn-info"
        onClick={props.onSingleSearchClick}
        disabled={props.isSearching}
      >
        I'm felling funny
      </button>
    </div>
  </form>
);

export default SearchForm;
