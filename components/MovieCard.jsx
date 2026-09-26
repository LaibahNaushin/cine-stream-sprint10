"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/slices/favoritesSlice";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state) =>
    state.favorites.movies.some((item) => item.id === movie.id)
  );

  const handleFavorite = useCallback(() => {
    dispatch(toggleFavorite(movie));
  }, [dispatch, movie]);

  return (
    <article className="movie-card">
      <div className="movie-poster-wrapper">
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
        />

        <button
          className={`favorite-button ${
            isFavorite ? "is-favorite" : ""
          }`}
          onClick={handleFavorite}
          aria-label={
            isFavorite
              ? `Remove ${movie.title} from favorites`
              : `Add ${movie.title} to favorites`
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        <div className="movie-rating">
          ★ {movie.rating}
        </div>
      </div>

      <div className="movie-content">
        <div className="movie-meta">
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
          <span>{movie.duration}</span>
        </div>

        <h3>{movie.title}</h3>

        <p>{movie.description}</p>
      </div>
    </article>
  );
}