"use client";

import { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../redux/store";
import { addFavorite } from "../redux/slices/favoritesSlice";
import {
  setSearchQuery,
  setGenre,
  setMinRating,
  setSortBy,
} from "../redux/slices/filterSlice";
import { setTheme } from "../redux/slices/themeSlice";

function PersistenceManager({ children }) {
  const dispatch = useDispatch();
  const hasLoaded = useRef(false);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem("cine-stream-state");

      if (savedState) {
        const parsedState = JSON.parse(savedState);

        const favorites = parsedState?.favorites?.movies || [];

        favorites.forEach((movie) => {
          dispatch(addFavorite(movie));
        });

        const filters = parsedState?.filters;

        if (filters) {
          dispatch(setSearchQuery(filters.searchQuery || ""));
          dispatch(setGenre(filters.genre || "All"));
          dispatch(setMinRating(filters.minRating || 0));
          dispatch(setSortBy(filters.sortBy || "popularity"));
        }

        const theme = parsedState?.theme?.mode;

        if (theme === "dark" || theme === "light") {
          dispatch(setTheme(theme));
        }
      }
    } catch (error) {
      console.error("Unable to restore Cine-Stream state:", error);
    }

    hasLoaded.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (!hasLoaded.current) {
      return;
    }

    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState();

        const stateToPersist = {
          favorites: state.favorites,
          filters: state.filters,
          theme: state.theme,
        };

        localStorage.setItem(
          "cine-stream-state",
          JSON.stringify(stateToPersist)
        );
      } catch (error) {
        console.error("Unable to save Cine-Stream state:", error);
      }
    });

    return unsubscribe;
  }, []);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistenceManager>{children}</PersistenceManager>
    </Provider>
  );
}