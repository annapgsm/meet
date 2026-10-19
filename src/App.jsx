import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import ThemeToggle from "./components/ThemeToggle";
import Icon from "./components/Icon";
import TimeFilter from "./components/TimeFilter";
import { matchesDate } from "./utils/dateFilters";
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
  const [dateFilter, setDateFilter] = useState("any");
  const [customDate, setCustomDate] = useState("");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = async (numEvents, city, when, selectedDate) => {
    const allEvents = await getEvents();
    if (!allEvents) return;

    const filtered = allEvents.filter((event) => {
      const matchesCity =
        city === "See all cities" ||
        (event.city || event.location) === city;

      const matchesSelectedDate =
        matchesDate(
          event,
          when,
          selectedDate
        );

      return matchesCity && matchesSelectedDate;
    });

    setFilteredEvents(filtered);               
    setEvents(filtered.slice(0, numEvents));     
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are currently offline. The displayed list may not be up to date.");
    }

    fetchData(currentNOE, currentCity, dateFilter, customDate);
  }, [ currentCity, currentNOE, dateFilter, customDate,]);

  const featuredEvent = events[0];

  return (

    <div className={`App app ${theme}`}>
      <nav className="nav shell" aria-label="Main navigation">
        <button
          className="brand"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <span>m</span>
          meet
        </button>

        <div className="nav-links">
          <button
            onClick={() =>
              document
                .getElementById("events")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Discover
          </button>

          <button
            onClick={() =>
              document
                .getElementById("insights")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            City pulse
          </button>
        </div>

        <div className="nav-actions">
          <ThemeToggle
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </div>
      </nav>

      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? (
          <WarningAlert text={warningAlert} />
        ) : null}
      </div>

      <main>
        <section className="hero shell">
          <div className="hero-kicker">
            <span>
              <Icon name="spark" size={14} />
            </span>
            Germany is happening
          </div>

          <h1 className="hero-title">
            Go out.
            <br />
            <em>Feel something.</em>
          </h1>

          <p className="hero-sub">
            Concerts, exhibitions, comedy and more.
            Discover what is happening in German cities.
          </p>

          <div className="hero-search-panel">
            <div className="hero-search-field">
              <Icon name="pin" />

              <div className="hero-search-control">
                <label>Where</label>

                <CitySearch
                  allLocations={allLocations}
                  setCurrentCity={setCurrentCity}
                  setInfoAlert={setInfoAlert}
                  setErrorAlert={setErrorAlert}
                />
              </div>
            </div>

            <TimeFilter
              value={dateFilter}
              customDate={customDate}
              onChange={setDateFilter}
              onCustomDateChange={setCustomDate}
            />

            <button
              className="search-action"
              onClick={() =>
                document
                  .getElementById("events")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See what's on
              <Icon name="arrow" />
            </button>
          </div>

          <div
            className={`hero-visual ${
              featuredEvent?.image ? "" : "hero-placeholder"
            }`}
          >
            {featuredEvent?.image ? (
              <img
                src={featuredEvent.image}
                alt=""
              />
            ) : null}

            <div className="hero-overlay">
              <span>
                {featuredEvent
                  ? "First up near you"
                  : "Live from Germany"}
              </span>

              <strong>
                {featuredEvent?.summary ||
                  "Your city, your plans"}
              </strong>

              <button
                onClick={() =>
                  document
                    .getElementById("events")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore events
                <Icon name="arrow" />
              </button>
            </div>
          </div>
        </section>

        <section
          className="charts-section"
          id="insights"
        >
          <div className="charts-container">
            <EventGenresChart events={filteredEvents} />

            <CityEventsChart
              allLocations={allLocations}
              events={filteredEvents}
            />
          </div>
        </section>

        <section
          className="events-section"
          id="events"
        >
          <div className="results-controls">
            <span>Results to show</span>

            <NumberOfEvents
              currentNOE={currentNOE}
              setCurrentNOE={setCurrentNOE}
              setErrorAlert={setErrorAlert}
            />
          </div>

          <EventList events={events} />
        </section>
      </main>
    </div>
  );
};

export default App;
