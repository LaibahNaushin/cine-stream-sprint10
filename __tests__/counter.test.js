import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

describe("Counter Interaction", () => {
  test("increments count when user clicks the button", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });

    await user.click(incrementButton);

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  test("increments count multiple times", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });

    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(screen.getByText("Count: 3")).toBeInTheDocument();
  });
});