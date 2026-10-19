import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import ThemeToggle from "./components/ThemeToggle";
import Icon from "./components/Icon";
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
      : allEvents.filter(
        (event) => (event.city || event.location) === city
      );

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

    fetchData(currentNOE, currentCity);
  }, [currentCity, currentNOE]);

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

            <div className="hero-search-field">
              <Icon name="ticket" />

              <div className="hero-search-control">
                <label>Results to show</label>

                <NumberOfEvents
                  currentNOE={currentNOE}
                  setCurrentNOE={setCurrentNOE}
                  setErrorAlert={setErrorAlert}
                />
              </div>
            </div>

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
          <EventList events={events} />
        </section>
      </main>
    </div>
  );
};

export default App;
