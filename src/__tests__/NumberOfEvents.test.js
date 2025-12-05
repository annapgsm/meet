import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  beforeEach(() => {
    render(<NumberOfEvents />);
  });

  test("renders a spinbutton input", () => {
    const input = screen.getByRole("spinbutton", { name: /number of events/i });
    expect(input).toBeInTheDocument();
  });

  test("default value should be 32", () => {
    const input = screen.getByRole("spinbutton", { name: /number of events/i });
    expect(input).toHaveValue(32);  // note: value here is number, not string
  });

  test("value changes when the user types in it", async () => {
    const user = userEvent.setup();
    const input = screen.getByRole("spinbutton", { name: /number of events/i });

    await user.clear(input);
    await user.type(input, "10");

    expect(input).toHaveValue(10);
  });
});
