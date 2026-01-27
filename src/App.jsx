import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import ThemeToggle from "./components/ThemeToggle";
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';

const App = () => {
  // Theme
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // App state
  const [events, setEvents] = useState([]); // ✅ displayed (sliced) events for the list
  const [filteredEvents, setFilteredEvents] = useState([]); // ✅ full filtered events for charts
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = async (numEvents, city) => {
    const allEvents = await getEvents();
    if (!allEvents) return;

    const filtered = city === "See all cities"
      ? allEvents
      : allEvents.filter((event) => event.location === city);

    setFilteredEvents(filtered);                 // ✅ charts get ALL filtered
    setEvents(filtered.slice(0, numEvents));     // ✅ list gets only first N
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are currently offline. The displayed list may not be up to date.");
    }

    fetchData(currentNOE, currentCity);
  }, [currentCity, currentNOE]);

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
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>

      <section className="charts-section">
        <div className="charts-container">
          {/* ✅ Charts use ALL events for the selected city */}
          <EventGenresChart events={filteredEvents} />
          <CityEventsChart allLocations={allLocations} events={filteredEvents} />
        </div>
      </section>

      <section className="events-section">
        {/* ✅ List uses only the displayed number of events */}
        <EventList events={events} />
      </section>
    </div>
  );
};

export default App;
