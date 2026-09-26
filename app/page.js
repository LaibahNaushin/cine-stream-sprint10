"use client";

import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import FilterSidebar from "../components/FilterSidebar";
import MovieGrid from "../components/MovieGrid";
import { movies } from "../lib/movies";

export default function Home() {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <main className={`app-shell ${theme}`}>
      <Navbar />

      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">CINE-STREAM · DATA STORM</span>

          <h1>
            Discover stories
            <br />
            worth watching.
          </h1>

          <p>
            Explore a curated collection of movies with powerful global
            filtering, favorites, and personalized viewing controls.
          </p>
        </div>
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <span className="section-label">MOVIE LIBRARY</span>
            <h2>Explore Movies</h2>
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