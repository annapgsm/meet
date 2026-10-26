import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents />", () => {
  function Wrapper() {
    const [
      currentNOE,
      setCurrentNOE,
    ] = useState(32);

    return (
      <NumberOfEvents
        currentNOE={currentNOE}
        setCurrentNOE={
          setCurrentNOE
        }
        totalEvents={100}
      />
    );
  }

  test("shows the result limit options", () => {
    render(<Wrapper />);

    expect(
      screen.getByRole("button", {
        name: "16",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "32",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "64",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /all/i,
      })
    ).toBeInTheDocument();
  });

  test("32 is selected by default", () => {
    render(<Wrapper />);

    expect(
      screen.getByRole("button", {
        name: "32",
      })
    ).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  test("changes the number shown", async () => {
    const user = userEvent.setup();

    render(<Wrapper />);

    await user.click(
      screen.getByRole("button", {
        name: "16",
      })
    );

    expect(
      screen.getByRole("button", {
        name: "16",
      })
    ).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});