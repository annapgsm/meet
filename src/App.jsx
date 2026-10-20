import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import ThemeToggle from "./components/ThemeToggle";
import Icon from "./components/Icon";
import TimeFilter from "./components/TimeFilter";
import { matchesCategory } from "./utils/categoryFilters";
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
  const [categoryFilter, setCategoryFilter] = useState("");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [savedEvents, setSavedEvents] = useState(() => {
    try {
      const saved =
        localStorage.getItem("meet-saved-events");

      return saved
        ? JSON.parse(saved)
        : [];
    } catch {
      return [];
    }
  });

  const [showMyPlans, setShowMyPlans] = useState(false);

  const fetchData = async (numEvents, city, when, selectedDate, category) => {
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

      const matchesSelectedCategory =
        matchesCategory(event, category);
        
      return (
        matchesCity &&
        matchesSelectedDate &&
        matchesSelectedCategory
      );
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

    fetchData(currentNOE, currentCity, dateFilter, customDate, categoryFilter);
  }, [ currentCity, currentNOE, dateFilter, customDate, categoryFilter]);

  useEffect(() => {
    localStorage.setItem(
      "meet-saved-events",
      JSON.stringify(savedEvents)
    );
  }, [savedEvents]);

  const featuredEvent = events[0];
  const cityLabel =
    currentCity === "See all cities"
      ? "Germany"
      : currentCity.split(",")[0];

  const dateLabels = {
    any: "",
    tonight: " tonight",
    tomorrow: " tomorrow",
    weekend: " this weekend",
    next7: " in the next 7 days",
    custom: customDate
      ? ` on ${new Date(
          `${customDate}T12:00:00`
        ).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
        })}`
      : "",
  };

  const resultDescription =
    `${filteredEvents.length} ${
      filteredEvents.length === 1
        ? "event"
        : "events"
    }${dateLabels[dateFilter]}`;

  const toggleCategory = (category) => {
    setCategoryFilter((current) =>
      current === category
        ? ""
        : category
    );
  };

  const savedEventIds =
    savedEvents.map((event) => event.id);

  const displayedEvents =
    showMyPlans
      ? savedEvents
      : events;

  const toggleSavedEvent = (event) => {
    setSavedEvents((current) => {
      const alreadySaved =
        current.some(
          (savedEvent) =>
            savedEvent.id === event.id
        );

      if (alreadySaved) {
        return current.filter(
          (savedEvent) =>
            savedEvent.id !== event.id
        );
      }

      return [...current, event];
    });
  };

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
          <button
            className={`my-plans-trigger ${
              showMyPlans ? "active" : ""
            }`}
            onClick={() =>
              setShowMyPlans(
                (current) => !current
              )
            }
          >
            <Icon
              name="bookmark"
              size={16}
            />

            <span>My plans</span>

            <strong>
              {savedEvents.length}
            </strong>
          </button>

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

        {/*
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
        */}

        <section
          className="events-section shell"
          id="events"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                {showMyPlans
                  ? "SAVED EVENTS"
                  : "UPCOMING EVENTS"}
              </span>

              <h2>
                {showMyPlans
                  ? "Your plans."
                  : `${cityLabel} is calling.`}
              </h2>
            </div>

            <p>
              Not plans.{" "}
              <em>
                Stories waiting to happen.
              </em>
            </p>
          </div>

          <div className="results-meta">
            <div className="results-meta">
              {showMyPlans ? (
                <div className="plans-summary">
                  <strong>
                    {savedEvents.length}{" "}
                    {savedEvents.length === 1
                      ? "saved event"
                      : "saved events"}
                  </strong>

                  <button
                    className="clear-filter"
                    onClick={() => setShowMyPlans(false)}
                  >
                    Back to discovery
                  </button>
                </div>
              ) : (
                <>
                  <div className="results-summary">
                    <strong>
                      {resultDescription}
                    </strong>

                    {filteredEvents.length > 0 ? (
                      <span>
                        {events.length} currently shown
                      </span>
                    ) : null}
                  </div>

                  <div className="results-controls">
                    {currentCity !== "See all cities" ? (
                      <button
                        className="clear-filter"
                        onClick={() =>
                          setCurrentCity("See all cities")
                        }
                      >
                        Clear city
                      </button>
                    ) : null}

                    <NumberOfEvents
                      currentNOE={currentNOE}
                      setCurrentNOE={setCurrentNOE}
                      totalEvents={filteredEvents.length}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {!showMyPlans ? (

            <div
              className="quick-filters"
              aria-label="Quick event filters"
            >
              <span>
                What do you feel like?
              </span>

              <button
                className={
                  dateFilter === "tonight"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setDateFilter(
                    dateFilter === "tonight"
                      ? "any"
                      : "tonight"
                  )
                }
              >
                Tonight
              </button>

              <button
                className={
                  dateFilter === "weekend"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setDateFilter(
                    dateFilter === "weekend"
                      ? "any"
                      : "weekend"
                  )
                }
              >
                This weekend
              </button>

              {[
                "Music",
                "Comedy",
                "Culture",
                "Sports",
              ].map((category) => (
                <button
                  key={category}
                  className={
                    categoryFilter === category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    toggleCategory(category)
                  }
                >
                  {category}
                </button>
              ))}

              {(dateFilter !== "any" ||
                categoryFilter) && (
                <button
                  className="reset-filters"
                  onClick={() => {
                    setDateFilter("any");
                    setCustomDate("");
                    setCategoryFilter("");
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          ) : null}

          <EventList 
            events={displayedEvents}
            savedEventIds={savedEventIds}
            onToggleSave={toggleSavedEvent}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
