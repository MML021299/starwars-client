import React, { useState } from "react";
import "../App.css";
import FilterIcon from "../icons/FilterIcon";

const SearchFilter = ({ searchQuery, planets, onSearch, onFilter }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [gender, setGender] = useState("");
  const [homeworld, setHomeworld] = useState("");

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleFilter = () => {
    onFilter({ gender, homeworld, searchQuery });
    setShowDropdown(false);
  };
  
  return(
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search characters..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="filter-container">
        <button className="filter-button" onClick={toggleDropdown}>
          <FilterIcon className="filter-icon" />
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <p>Filter By:</p>
            <div className="filter-group">
              <label htmlFor="gender-select">Gender:</label>
              <select
                id="gender-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="homeworld-select">Homeworld:</label>
              <select
                id="homeworld-select"
                value={homeworld}
                onChange={(e) => setHomeworld(e.target.value)}
              >
                <option value="">All</option>
                {planets.map((planet, index) => (
                  <option key={index} value={planet.url}>
                    {planet.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="apply-button" onClick={handleFilter}>
              Apply Filter
            </button>
          </div>
        )}
      </div>
    </div>
  )
};

export default SearchFilter;