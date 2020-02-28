import React from "react";

const SearchForm = props => (
  <form onSubmit={props.onFormSubmit}>
    <input
      type="text"
      placeholder="Search..."
      onChange={e => props.onSearchValueChange(e.target.value)}
    />
    <button disabled={props.isSearching}>Search</button>
    <button onClick={props.onSingleSearchClick} disabled={props.isSearching}>
      I'm felling funny
    </button>
  </form>
);

export default SearchForm;
