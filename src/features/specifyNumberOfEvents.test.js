import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defineFeature, loadFeature } from 'jest-cucumber';

import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test("When user hasn't specified a number, 32 events are shown by default", ({ given, when, then }) => {
    let appComponent;
    let eventListDOM;

    given("the user has not entered any number of events to display", () => {
      // No user input for number of events
    });

    when("the event list is rendered", () => {
      appComponent = render(<App />);
      eventListDOM = appComponent.container.querySelector('#event-list');
    });

    then("the app should show 32 upcoming events by default.", async () => {
      await waitFor(() => {
        const eventItems = within(eventListDOM).queryAllByRole('listitem');
        expect(eventItems.length).toBe(32);
      });
    });
  });

  test("User can change the number of events displayed", ({ given, when, then }) => {
    let appComponent;
    let eventListDOM;
    let numberOfEventsInput;

    given("the event list has been displayed", () => {
      appComponent = render(<App />);
      eventListDOM = appComponent.container.querySelector('#event-list');
      numberOfEventsInput = appComponent.container.querySelector('#number-of-events input');
    });

    when("the user specifies a number of events between 1 and all", async () => {
      const user = userEvent.setup();
      await user.clear(numberOfEventsInput);
      await user.type(numberOfEventsInput, '10');
    });

    then("the user should receive a list with that specified number of events.", async () => {
      await waitFor(() => {
        const eventItems = within(eventListDOM).queryAllByRole('listitem');
        expect(eventItems.length).toBe(10);
      });
    });
  });

});
