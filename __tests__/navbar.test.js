import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { toggleTheme } from "../redux/slices/themeSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe("Navbar Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockImplementation((selector) =>
      selector({
        theme: {
          mode: "dark",
        },
        favorites: {
          movies: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
          ],
        },
      })
    );
  });

  test("renders CineStream logo", () => {
    render(<Navbar />);

    expect(screen.getByText("CINE")).toBeInTheDocument();
    expect(screen.getByText("STREAM")).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Home" }))
      .toHaveAttribute("href", "/");

    expect(screen.getByRole("link", { name: "Movies" }))
      .toHaveAttribute("href", "/movies");

    expect(screen.getByRole("link", { name: /Favorites/ }))
      .toHaveAttribute("href", "/favorites");
  });

  test("shows correct favorite count", () => {
    render(<Navbar />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("shows Light option in dark theme", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("button", {
        name: "Toggle theme",
      })
    ).toHaveTextContent("☀ Light");
  });

  test("dispatches toggleTheme when theme button is clicked", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    const themeButton = screen.getByRole("button", {
      name: "Toggle theme",
    });

    await user.click(themeButton);

    expect(mockDispatch).toHaveBeenCalledWith(toggleTheme());
  });
});
test("shows Dark option in light theme", () => {
  useSelector.mockImplementation((selector) =>
    selector({
      theme: {
        mode: "light",
      },
      favorites: {
        movies: [],
      },
    })
  );

  render(<Navbar />);

  expect(
    screen.getByRole("button", {
      name: "Toggle theme",
    })
  ).toHaveTextContent("◐ Dark");
});