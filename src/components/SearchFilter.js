import React from "react";
import "../App.css";

const SearchFilter = ({ searchQuery, onSearch, onFilter }) => (
  <div className="search-filter">
    <input
      type="text"
      placeholder="Search cards..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
    />
    <button onClick={onFilter}>Filter</button>
  </div>
);

export default SearchFilter;