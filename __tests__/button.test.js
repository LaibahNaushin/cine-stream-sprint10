import { render, screen } from "@testing-library/react";

function TestButton({ label }) {
  return <button>{label}</button>;
}

describe("Button Component", () => {
  test("renders button without crashing", () => {
    render(<TestButton label="Watch Now" />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  test("renders the text passed through props", () => {
    render(<TestButton label="Watch Now" />);

    expect(screen.getByText("Watch Now")).toBeInTheDocument();
  });
});