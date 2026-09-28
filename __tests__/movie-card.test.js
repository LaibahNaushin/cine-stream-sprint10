import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { toggleFavorite } from "../redux/slices/favoritesSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const movie = {
  id: 1,
  title: "Inception",
  poster: "/inception.jpg",
  rating: 8.8,
  year: 2010,
  genre: "Sci-Fi",
  duration: "2h 28m",
  description: "A skilled thief enters the dreams of others.",
};

describe("MovieCard Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockImplementation((selector) =>
      selector({
        favorites: {
          movies: [],
        },
      })
    );
  });

  test("renders movie information correctly", () => {
    render(<MovieCard movie={movie} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Inception" })
    ).toBeInTheDocument();

    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("Sci-Fi")).toBeInTheDocument();
    expect(screen.getByText("2h 28m")).toBeInTheDocument();
    expect(screen.getByText("★ 8.8")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A skilled thief enters the dreams of others."
      )
    ).toBeInTheDocument();
  });

  test("renders movie poster correctly", () => {
    render(<MovieCard movie={movie} />);

    const poster = screen.getByRole("img", {
      name: "Inception",
    });

    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute("src", "/inception.jpg");
    expect(poster).toHaveAttribute("alt", "Inception");
  });

  test("shows Add to favorites button", () => {
    render(<MovieCard movie={movie} />);

    const button = screen.getByRole("button", {
      name: "Add Inception to favorites",
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("♡");
  });

  test("dispatches favorite action when clicked", async () => {
    const user = userEvent.setup();

    render(<MovieCard movie={movie} />);

    const button = screen.getByRole("button", {
      name: "Add Inception to favorites",
    });

    await user.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(toggleFavorite(movie));
  });

  test("shows Remove from favorites when already favorite", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        favorites: {
          movies: [movie],
        },
      })
    );

    render(<MovieCard movie={movie} />);

    const button = screen.getByRole("button", {
      name: "Remove Inception from favorites",
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("♥");
  });
});