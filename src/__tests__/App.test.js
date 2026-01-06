/* eslint-disable no-undef */
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {getEvents } from '../api';


describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })
    
  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });
    
  /* verifies that the main application correctly renders the search component used for finding cities. */
  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  }); 

  test("renders NumberOfEvents component", () => {
    const AppComponent = render(<App />);
    const numberOfEvents = AppComponent.container.firstChild.querySelector("#number-of-events");
    expect(numberOfEvents).toBeInTheDocument();
  });

});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;


    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');


    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);


    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');  


    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );


    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
  });

  test('changes the number of events displayed when the user changes the number input', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // Find the NumberOfEvents component container by id or class
    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    // Find the input inside NumberOfEvents
    const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole('spinbutton'); 

    await user.type(NumberOfEventsInput, '{backspace}{backspace}');

    /* Clear the default value (e.g. '32') by simulating backspaces, then type '10'
    await user.type(NumberOfEventsInput, '{backspace}{backspace}10'); */
    await user.type(NumberOfEventsInput, '10');

    // Now wait for EventList to update
    const EventListDOM = AppDOM.querySelector('#event-list');

    await waitFor(() => {
      // Query all list items representing events
      const eventItems = within(EventListDOM).queryAllByRole('listitem');
      expect(eventItems.length).toBe(10);
    });
  });
});
