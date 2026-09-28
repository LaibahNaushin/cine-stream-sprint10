import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";
import FilterSidebar from "../components/FilterSidebar";
import {
  setSearchQuery,
  setGenre,
  setMinRating,
  setSortBy,
  resetFilters,
} from "../redux/slices/filterSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("FilterSidebar Component", () => {
  const mockDispatch = jest.fn();

  const defaultState = {
    filters: {
      searchQuery: "",
      genre: "All",
      minRating: 0,
      sortBy: "popularity",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockImplementation((selector) =>
      selector(defaultState)
    );
  });

  test("renders filter sections correctly", () => {
    render(<FilterSidebar />);

    expect(
      screen.getByRole("heading", { name: "Filters" })
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByLabelText("Genre")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Minimum Rating")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Sort By")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Reset" }))
      .toBeInTheDocument();
  });

  test("renders all genre options", () => {
    render(<FilterSidebar />);

    const genreSelect = screen.getByLabelText("Genre");

    expect(genreSelect).toHaveValue("All");
    expect(screen.getByRole("option", { name: "Action" }))
      .toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Adventure" }))
      .toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Drama" }))
      .toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Sci-Fi" }))
      .toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Thriller" }))
      .toBeInTheDocument();
  });

  test("dispatches search query when user types", async () => {
    const user = userEvent.setup();

    render(<FilterSidebar />);

    const searchInput = screen.getByLabelText("Search");

    await user.type(searchInput, "Inception");

    expect(mockDispatch).toHaveBeenCalledWith(
      setSearchQuery("I")
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setSearchQuery("n")
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setSearchQuery("c")
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setSearchQuery("e")
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setSearchQuery("p")
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setSearchQuery("t")
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setSearchQuery("i")
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setSearchQuery("o")
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setSearchQuery("n")
    );
  });

  test("dispatches genre change", async () => {
    const user = userEvent.setup();

    render(<FilterSidebar />);

    const genreSelect = screen.getByLabelText("Genre");

    await user.selectOptions(genreSelect, "Action");

    expect(mockDispatch).toHaveBeenCalledWith(
      setGenre("Action")
    );
  });

  test("dispatches minimum rating change", async () => {
    const user = userEvent.setup();

    render(<FilterSidebar />);

    const ratingSelect = screen.getByLabelText("Minimum Rating");

    await user.selectOptions(ratingSelect, "8");

    expect(mockDispatch).toHaveBeenCalledWith(
      setMinRating(8)
    );
  });

  test("dispatches sort change", async () => {
    const user = userEvent.setup();

    render(<FilterSidebar />);

    const sortSelect = screen.getByLabelText("Sort By");

    await user.selectOptions(sortSelect, "rating");

    expect(mockDispatch).toHaveBeenCalledWith(
      setSortBy("rating")
    );
  });

  test("dispatches resetFilters when Reset is clicked", async () => {
    const user = userEvent.setup();

    render(<FilterSidebar />);

    const resetButton = screen.getByRole("button", {
      name: "Reset",
    });

    await user.click(resetButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      resetFilters()
    );
  });

  test("shows None when no filters are active", () => {
    render(<FilterSidebar />);

    expect(screen.getByText("None")).toBeInTheDocument();
  });

  test("shows Applied when filters are active", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        filters: {
          searchQuery: "Inception",
          genre: "All",
          minRating: 0,
          sortBy: "popularity",
        },
      })
    );

    render(<FilterSidebar />);

    expect(screen.getByText("Applied")).toBeInTheDocument();
  });
});