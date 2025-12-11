import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import ThemeToggle from "./components/ThemeToggle";
import { getEvents, extractLocations  } from './api';

import './App.css'

const App = () => {

  //Dark/ Light- Theme 

  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };


  // App state
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  
  
  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };


  return (
    <div className={`App ${theme}`}>
        <h1>City Events Explorer</h1>
        {/* Theme toggle placed top-level */}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
        <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE}  />
        <EventList events={events} />
    </div>
  );
}


export default App;