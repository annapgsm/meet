import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import ThemeToggle from "./components/ThemeToggle";
import { getEvents, extractLocations  } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

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
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  
  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are currently offline. The displayed list may not be up to date.");
    }

    fetchData(currentNOE, currentCity);
  }, [currentCity, currentNOE]);


  const fetchData = async (numEvents, city) => {
    const allEvents = await getEvents();
    if (!allEvents) return; 

    const filteredEvents = city === "See all cities" 
      ? allEvents 
      : allEvents.filter(event => event.location === city);

    setEvents(filteredEvents.slice(0, numEvents));
    setAllLocations(extractLocations(allEvents));
  };


  return (
    <div className={`App ${theme}`}>
      <header className="app-header">
        <h1>City Events Explorer</h1>
        <div className="controls">
          <CitySearch 
            allLocations={allLocations} 
            setCurrentCity={setCurrentCity} 
            setInfoAlert={setInfoAlert} 
            setErrorAlert={setErrorAlert} 
          />

          <NumberOfEvents 
            currentNOE={currentNOE} 
            setCurrentNOE={setCurrentNOE} 
            setErrorAlert={setErrorAlert} 
          />

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
      </div>
      <section className="charts-section">
        <div className="charts-container">
          <EventGenresChart events={events} />
          <CityEventsChart allLocations={allLocations} events={events} />
        </div>
      </section>

      <section className="events-section">
        <EventList events={events} />
      </section>
    </div>
  );
}


export default App;