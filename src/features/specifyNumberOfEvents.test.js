import React from "react";
import {
  render,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  defineFeature,
  loadFeature,
} from "jest-cucumber";

import App from "../App";

const feature = loadFeature(
  "./src/features/specifyNumberOfEvents.feature"
);

defineFeature(feature, (test) => {
  test(
    "32 events are shown by default",
    ({ given, when, then }) => {
      let appComponent;
      let eventListDOM;

      given(
        "the user has not changed the result limit",
        () => {}
      );

      when("the event list is rendered", () => {
        appComponent = render(<App />);

        eventListDOM =
          appComponent.container.querySelector(
            "#event-list"
          );
      });

      then(
        "the app should show 32 upcoming events by default.",
        async () => {
          await waitFor(() => {
            const eventItems = within(
              eventListDOM
            ).queryAllByRole("listitem");

            expect(eventItems.length).toBe(32);
          });
        }
      );
    }
  );

  test(
    "User can change the number of events displayed",
    ({ given, when, then }) => {
      let appComponent;
      let eventListDOM;
      let numberOfEventsDOM;

      given(
        "the event list has been displayed",
        () => {
          appComponent = render(<App />);

          eventListDOM =
            appComponent.container.querySelector(
              "#event-list"
            );

          numberOfEventsDOM =
            appComponent.container.querySelector(
              "#number-of-events"
            );
        }
      );

      when(
        "the user selects 16 events",
        async () => {
          const user = userEvent.setup();

          const show16Button = within(
            numberOfEventsDOM
          ).getByRole("button", {
            name: "16",
          });

          await user.click(show16Button);
        }
      );

      then(
        "the app should show 16 events.",
        async () => {
          await waitFor(() => {
            const eventItems = within(
              eventListDOM
            ).queryAllByRole("listitem");

            expect(eventItems.length).toBe(16);
          });
        }
      );
    }
  );
});