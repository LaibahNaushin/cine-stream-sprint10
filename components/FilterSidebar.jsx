"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setGenre,
  setMinRating,
  setSortBy,
  resetFilters,
} from "../redux/slices/filterSlice";

const genres = [
  "All",
  "Action",
  "Adventure",
  "Drama",
  "Sci-Fi",
  "Thriller",
];

const ratings = [
  { label: "All Ratings", value: 0 },
  { label: "7+ Rating", value: 7 },
  { label: "8+ Rating", value: 8 },
  { label: "9+ Rating", value: 9 },
];

export default function FilterSidebar() {
  const dispatch = useDispatch();

  const { searchQuery, genre, minRating, sortBy } = useSelector(
    (state) => state.filters
  );

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <div>
          <span className="filter-eyebrow">DISCOVER</span>
          <h2>Filters</h2>
        </div>

        <button
          type="button"
          className="reset-button"
          onClick={() => dispatch(resetFilters())}
        >
          Reset
        </button>
      </div>

      <div className="filter-section">
        <label htmlFor="movie-search">Search</label>

        <input
          id="movie-search"
          type="search"
          value={searchQuery}
          onChange={(event) =>
            dispatch(setSearchQuery(event.target.value))
          }
          placeholder="Search movies..."
        />
      </div>

      <div className="filter-section">
        <label htmlFor="genre-filter">Genre</label>

        <select
          id="genre-filter"
          value={genre}
          onChange={(event) => dispatch(setGenre(event.target.value))}
        >
          {genres.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label htmlFor="rating-filter">Minimum Rating</label>

        <select
          id="rating-filter"
          value={minRating}
          onChange={(event) =>
            dispatch(setMinRating(Number(event.target.value)))
          }
        >
          {ratings.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label htmlFor="sort-filter">Sort By</label>

        <select
          id="sort-filter"
          value={sortBy}
          onChange={(event) => dispatch(setSortBy(event.target.value))}
        >
          <option value="popularity">Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="filter-summary">
        <span>Active filters</span>

        <strong>
          {genre !== "All" ||
          minRating > 0 ||
          searchQuery.trim() !== ""
            ? "Applied"
            : "None"}
        </strong>
      </div>
    </aside>
  );
}