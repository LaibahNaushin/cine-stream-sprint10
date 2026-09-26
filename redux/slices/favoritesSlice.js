import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const movieExists = state.movies.some(
        (movie) => movie.id === action.payload.id
      );

      if (!movieExists) {
        state.movies.push(action.payload);
      }
    },

    removeFavorite: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },

    toggleFavorite: (state, action) => {
      const movieExists = state.movies.some(
        (movie) => movie.id === action.payload.id
      );

      if (movieExists) {
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload.id
        );
      } else {
        state.movies.push(action.payload);
      }
    },

    clearFavorites: (state) => {
      state.movies = [];
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;