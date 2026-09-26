import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  genre: "All",
  minRating: 0,
  sortBy: "popularity",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    setGenre: (state, action) => {
      state.genre = action.payload;
    },

    setMinRating: (state, action) => {
      state.minRating = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    resetFilters: (state) => {
      state.searchQuery = "";
      state.genre = "All";
      state.minRating = 0;
      state.sortBy = "popularity";
    },
  },
});

export const {
  setSearchQuery,
  setGenre,
  setMinRating,
  setSortBy,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;