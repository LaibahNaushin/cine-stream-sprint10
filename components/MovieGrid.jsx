"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
  const { searchQuery, genre, minRating, sortBy } = useSelector(
    (state) => state.filters
  );

  const filteredMovies = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const result = movies.filter((movie) => {
      const matchesSearch =
        normalizedSearch === "" ||
        movie.title.toLowerCase().includes(normalizedSearch);

      const matchesGenre =
        genre === "All" || movie.genre === genre;

      const matchesRating = movie.rating >= minRating;

      return matchesSearch && matchesGenre && matchesRating;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "newest") {
        return b.year - a.year;
      }

      return b.rating - a.rating;
    });
  }, [movies, searchQuery, genre, minRating, sortBy]);

  if (filteredMovies.length === 0) {
    return (
      <div className="empty-state">
        <h3>No movies found</h3>
        <p>Try changing your search or filter settings.</p>
      </div>
    );
  }

  return (
    <section className="movie-grid">
      {filteredMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}