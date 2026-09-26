"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.mode);
  const favoriteCount = useSelector(
    (state) => state.favorites.movies.length
  );

  return (
    <header className="navbar">
      <Link href="/" className="logo">
        CINE<span>STREAM</span>
      </Link>

      <nav className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
        <Link href="/favorites">
          Favorites
          <span className="favorite-count">{favoriteCount}</span>
        </Link>
      </nav>

      <button
        className="theme-button"
        onClick={() => dispatch(toggleTheme())}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀ Light" : "◐ Dark"}
      </button>
    </header>
  );
}