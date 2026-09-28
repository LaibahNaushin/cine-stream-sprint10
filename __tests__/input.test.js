import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

function SearchInput() {
  const [value, setValue] = useState("");

  return (
    <div>
      <label htmlFor="movie-search">Search Movie</label>

      <input
        id="movie-search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Enter movie name"
      />

      <p>Search: {value}</p>
    </div>
  );
}

describe("Search Input Component", () => {
  test("renders input correctly", () => {
    render(<SearchInput />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter movie name")).toBeInTheDocument();
  });

  test("updates input value when user types", async () => {
    const user = userEvent.setup();

    render(<SearchInput />);

    const input = screen.getByRole("textbox");

    await user.type(input, "Inception");

    expect(input).toHaveValue("Inception");
    expect(screen.getByText("Search: Inception")).toBeInTheDocument();
  });
});