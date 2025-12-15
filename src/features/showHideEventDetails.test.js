import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { defineFeature, loadFeature } from "jest-cucumber";

import Event from "../components/Event";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/showHideEventDetails.feature");

defineFeature(feature, test => {
  let allEvents;
  let EventComponent;
  let user;

  beforeEach(async () => {
    user = userEvent.setup();
    allEvents = await getEvents();
  });

  // Scenario 1 – Collapsed by default
  test("An event element is collapsed by default", ({ given, when, then }) => {

    given("the event list is displayed", () => {
      EventComponent = render(<Event event={allEvents[0]} />);
    });

    when("an event item loads", () => {
      // nothing needed here — render already simulates loading
    });

    then("the event details should be hidden by default.", () => {
      const details = EventComponent.container.querySelector(".details");
      expect(details).toHaveClass("closed");
    });
  });

  // Scenario 2 – Expand details
  test("User can expand an event to see details", ({ given, when, then }) => {

    given("the event list is displayed and events are collapsed", () => {
      EventComponent = render(<Event event={allEvents[0]} />);
      const details = EventComponent.container.querySelector(".details");
      expect(details).toHaveClass("closed"); // safety check
    });

    when("the user clicks on an event", async () => {
      const button = screen.getByText("show details");
      await user.click(button);
    });

    then("the event should expand to show additional information.", () => {
      const details = EventComponent.container.querySelector(".details");
      expect(details).toHaveClass("open");

      // optional: ensure button changed text
      expect(screen.getByText("hide details")).toBeInTheDocument();
    });
  });

  // Scenario 3 – Collapse details
  test("User can collapse an event to hide details", ({ given, when, then }) => {

    given("the user has expanded an event", async () => {
      EventComponent = render(<Event event={allEvents[0]} />);
      const button = screen.getByText("show details");
      await user.click(button);
    });

    when("the user clicks on the expanded event again", async () => {
      const button = screen.getByText("hide details");
      await user.click(button);
    });

    then("the event details should collapse and hide again.", () => {
      const details = EventComponent.container.querySelector(".details");
      expect(details).toHaveClass("closed");

      // button should return to first label
      expect(screen.getByText("show details")).toBeInTheDocument();
    });
  });
});