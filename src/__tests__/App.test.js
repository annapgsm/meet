/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';


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