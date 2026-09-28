import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

function MovieList() {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}

describe("Movie API", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders movies from mocked API response", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: 1,
          title: "Inception",
        },
        {
          id: 2,
          title: "Interstellar",
        },
      ],
    });

    render(<MovieList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Inception")).toBeInTheDocument();
      expect(screen.getByText("Interstellar")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/movies");
  });
});