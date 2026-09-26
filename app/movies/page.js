"use client";

import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import FilterSidebar from "../../components/FilterSidebar";
import MovieGrid from "../../components/MovieGrid";
import { movies } from "../../lib/movies";

export default function MoviesPage() {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <main className={`app-shell ${theme}`}>
      <Navbar />

      <section className="catalog-section page-catalog">
        <div className="section-heading">
          <div>
            <span className="section-label">CINE-STREAM LIBRARY</span>
            <h1>All Movies</h1>
          </div>

          <span className="movie-count">
            {movies.length} titles
          </span>
        </div>

        <div className="catalog-layout">
          <FilterSidebar />

          <div className="catalog-results">
            <MovieGrid movies={movies} />
          </div>
        </div>
      </section>
    </main>
  );
}