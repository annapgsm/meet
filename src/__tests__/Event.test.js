import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Event from '../components/Event';
import {mockData} from '../mock-data';
import { getEvents } from "../api";

// eslint-disable-next-line no-undef
describe("<Event /> component (Feature 2: Show/Hide Event Details)", () => {
    let EventComponent;
    let allEvents;

    beforeEach(async () => {
        allEvents = await getEvents();
        EventComponent = render (<Event event={allEvents[0]} />);
    });


    test("renders event title", () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test("renders event start time", () => {
      /* old: expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument(); */
      const startTimeElement = EventComponent.container.querySelector('.event-start-time');
      expect(startTimeElement).toBeInTheDocument();
    });

    test("renders event location", () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    test("renders 'show details' button", () => {
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });

    test("by default, event's details section should be hidden", () => {
    const details = EventComponent.container.querySelector('.details');
    /* expect(details).not.toBeInTheDocument(); */
    expect(details).toHaveClass('closed');
  });

  test("shows the details section when user clicks on the 'show details' button", async () => {
    const user = userEvent.setup();

    const showButton = EventComponent.queryByText('show details');
    await user.click(showButton);

    // now details should exist
    const details = EventComponent.container.querySelector('.details');
    expect(details).toBeInTheDocument();

    // the button should now say "hide details"
    expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
  });

  test("hides the details section when user clicks 'hide details' button", async () => {
    const user = userEvent.setup();

    // first expand
    const showButton = EventComponent.queryByText('show details');
    await user.click(showButton);

    // then collapse
    const hideButton = EventComponent.queryByText('hide details');
    await user.click(hideButton);

    const details = EventComponent.container.querySelector('.details');
    /* expect(details).not.toBeInTheDocument(); */
    expect(details).toHaveClass('closed');  // checks if details are hidden via class

    // button returns to "show details"
    expect(EventComponent.queryByText('show details')).toBeInTheDocument();
  });
});