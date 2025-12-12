import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App"

describe("<NumberOfEvents /> component", () => {
  
  function Wrapper() {
    const [currentNOE, setCurrentNOE] = useState(32);
    return (
      <NumberOfEvents
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
      />
    );
  }

  beforeEach(() => {
    render(
      <Wrapper />
    );
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

describe("<NumberOfEvents /> integration", () => {
  test("NumberOfEvents is rendered when the App is mounted", () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');

    expect(NumberOfEventsDOM).toBeInTheDocument();
  });
});
