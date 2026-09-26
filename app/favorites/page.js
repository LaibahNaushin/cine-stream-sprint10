"use client";

import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";

export default function FavoritesPage() {
  const theme = useSelector((state) => state.theme.mode);
  const favorites = useSelector((state) => state.favorites.movies);

  return (
    <main className={`app-shell ${theme}`}>
      <Navbar />

      <section className="catalog-section page-catalog">
        <div className="section-heading">
          <div>
            <span className="section-label">YOUR COLLECTION</span>
            <h1>My Favorites</h1>
          </div>

          <span className="movie-count">
            {favorites.length} saved
          </span>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <h3>No favorites yet</h3>
            <p>
              Start exploring movies and add your favorite titles here.
            </p>
          </div>
        ) : (
          <section className="movie-grid">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </section>
        )}
      </section>
    </main>
  );
}