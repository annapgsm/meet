import React, { useEffect, useState } from "react";

import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CityEventsChart from "./components/CityEventsChart";
import WhenItsHappening from "./components/WhenItsHappening";
import ThemeToggle from "./components/ThemeToggle";
import Icon from "./components/Icon";
import TimeFilter from "./components/TimeFilter";

import { matchesCategory } from "./utils/categoryFilters";
import { matchesDate } from "./utils/dateFilters";
import { getEvents, extractLocations } from "./api";

import {
  InfoAlert,
  ErrorAlert,
  WarningAlert,
} from "./components/Alert";

import "./App.css";


const App = () => {
  // Theme
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "light"
        ? "dark"
        : "light"
    );
  };


  // Event and filter state
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [dateFilter, setDateFilter] = useState("any");
  const [customDate, setCustomDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Alerts
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  // Saved events persist in localStorage
  const [savedEvents, setSavedEvents] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "meet-saved-events"
          );

        return saved
          ? JSON.parse(saved)
          : [];
      } catch {
        return [];
      }
    });

  const [showMyPlans, setShowMyPlans] = useState(false);

  // Fetch Germany-wide events or events for one selected city
  const fetchData = async (
    numEvents,
    city,
    when,
    selectedDate,
    category
  ) => {
    // No city = Germany-wide request
    const cityQuery =
      city === "See all cities"
        ? ""
        : city;

    const fetchedEvents =
      await getEvents(cityQuery);

    if (!fetchedEvents) return;


    // Keep the autocomplete based on the Germany-wide results
    if (cityQuery === "") {
      setAllLocations(
        extractLocations(fetchedEvents)
      );
    }


    // Ticketmaster already filters the city now.
    // We only filter date and category in the frontend.
    const filtered =
      fetchedEvents.filter((event) => {
        const matchesSelectedDate =
          matchesDate(
            event,
            when,
            selectedDate
          );

        const matchesSelectedCategory =
          matchesCategory(
            event,
            category
          );

        return (
          matchesSelectedDate &&
          matchesSelectedCategory
        );
      });


    // Full list for result count + City Pulse
    setFilteredEvents(filtered);

    // Only display the selected number of cards
    setEvents(
      filtered.slice(0, numEvents)
    );
  };
  // Refetch when filters change
  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert(
        "You are currently offline. The displayed list may not be up to date."
      );
    }

    fetchData(
      currentNOE,
      currentCity,
      dateFilter,
      customDate,
      categoryFilter
    );
  }, [
    currentCity,
    currentNOE,
    dateFilter,
    customDate,
    categoryFilter,
  ]);


  // Save My Plans whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "meet-saved-events",
      JSON.stringify(savedEvents)
    );
  }, [savedEvents]);


  // Hero uses the first displayed event
  const featuredEvent = events[0];


  // Short city name for headings
  const cityLabel =
    currentCity === "See all cities"
      ? "Germany"
      : currentCity.split(",")[0];


  // Text shown beside result count
  const dateLabels = {
    any: "",
    tonight: " tonight",
    tomorrow: " tomorrow",
    weekend: " this weekend",
    next7: " in the next 7 days",

    custom: customDate
      ? ` on ${new Date(
          `${customDate}T12:00:00`
        ).toLocaleDateString(
          "en-GB",
          {
            day: "numeric",
            month: "long",
          }
        )}`
      : "",
  };


  const resultDescription =
    `${filteredEvents.length} ${
      filteredEvents.length === 1
        ? "event"
        : "events"
    }${dateLabels[dateFilter]}`;


  // Clicking an active category removes it
  const toggleCategory = (category) => {
    setCategoryFilter((current) =>
      current === category
        ? ""
        : category
    );
  };


  // IDs let each card know if it is saved
  const savedEventIds =
    savedEvents.map(
      (event) => event.id
    );


  // My Plans swaps discovery events for saved ones
  const displayedEvents =
    showMyPlans
      ? savedEvents
      : events;


  // Save or remove an event
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

      return [
        ...current,
        event,
      ];
    });
  };


  return (
    <div
      className={`App app ${theme}`}
      id="top"
    >
      {/* Navigation */}
      <nav
        className="nav shell"
        aria-label="Main navigation"
      >
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
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Discover
          </button>

          <button
            onClick={() =>
              document
                .getElementById("insights")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            City pulse
          </button>
        </div>

        <div className="nav-actions">
          <button
            className={`my-plans-trigger ${
              showMyPlans
                ? "active"
                : ""
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


      {/* App alerts */}
      <div className="alerts-container">
        {infoAlert.length ? (
          <InfoAlert
            text={infoAlert}
          />
        ) : null}

        {errorAlert.length ? (
          <ErrorAlert
            text={errorAlert}
          />
        ) : null}

        {warningAlert.length ? (
          <WarningAlert
            text={warningAlert}
          />
        ) : null}
      </div>


      <main>
        {/* Hero */}
        <section className="hero shell">
          <div className="hero-kicker">
            <span>
              <Icon
                name="spark"
                size={14}
              />
            </span>

            Germany is happening
          </div>

          <h1 className="hero-title">
            Go out.
            <br />
            <em>
              Feel something.
            </em>
          </h1>

          <p className="hero-sub">
            Concerts, exhibitions,
            comedy and more. Discover
            what is happening in German
            cities.
          </p>


          {/* Main discovery controls */}
          <div className="hero-search-panel">
            <div className="hero-search-field">
              <Icon name="pin" />

              <div className="hero-search-control">
                <label>
                  Where
                </label>

                <CitySearch
                  allLocations={allLocations}
                  currentCity={currentCity}
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
              onCustomDateChange={
                setCustomDate
              }
            />
          </div>


          {/* Featured event */}
          <div
            className={`hero-visual ${
              featuredEvent?.image
                ? ""
                : "hero-placeholder"
            }`}
          >
            {featuredEvent?.image ? (
              <img
                src={
                  featuredEvent.image
                }
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
                    .getElementById(
                      "events"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
              >
                Explore events
                <Icon name="arrow" />
              </button>
            </div>
          </div>
        </section>


        {/* Event discovery */}
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
                Stories waiting to
                happen.
              </em>
            </p>
          </div>


          {/* Results info changes in My Plans */}
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
                  type="button"
                  className="clear-filter"
                  onClick={() =>
                    setShowMyPlans(false)
                  }
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

                  {filteredEvents.length >
                  0 ? (
                    <span>
                      {events.length}{" "}
                      currently shown
                    </span>
                  ) : null}
                </div>

                <div className="results-controls">
                  {currentCity !==
                  "See all cities" ? (
                    <button
                      type="button"
                      className="clear-filter"
                      onClick={() =>
                        setCurrentCity(
                          "See all cities"
                        )
                      }
                    >
                      Clear city
                    </button>
                  ) : null}

                  <NumberOfEvents
                    currentNOE={
                      currentNOE
                    }
                    setCurrentNOE={
                      setCurrentNOE
                    }
                    totalEvents={
                      filteredEvents.length
                    }
                  />
                </div>
              </>
            )}
          </div>


          {/* Category filters */}
          {!showMyPlans ? (
            <div
              className="quick-filters"
              aria-label="Quick event filters"
            >
              <span>
                What do you feel like?
              </span>

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

              {/* Only resets the category selection */}
              {categoryFilter && (
                <button
                  className="reset-filters"
                  onClick={() =>
                    setCategoryFilter("")
                  }
                >
                  Reset
                </button>
              )}
            </div>
          ) : null}

          {/* Keep the list mounted for async loading and tests */}
          <EventList
            events={displayedEvents}
            savedEventIds={
              savedEventIds
            }
            onToggleSave={
              toggleSavedEvent
            }
          />


          {/* Empty list message */}
          {displayedEvents.length ===
          0 ? (
            <div className="empty-state">
              <Icon
                name="spark"
                size={28}
              />

              <h3>
                {showMyPlans
                  ? "No plans saved yet."
                  : "Nothing here right now."}
              </h3>

              <p>
                {showMyPlans
                  ? "Save an event you like and it’ll appear here."
                  : "Try another city, date or category."}
              </p>

              {showMyPlans ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowMyPlans(
                      false
                    )
                  }
                >
                  Back to discovery
                </button>
              ) : null}
            </div>
          ) : null}
        </section>


        {/* Analytics describe discovery results */}
        {!showMyPlans ? (
          <section
            className="city-pulse"
            id="insights"
          >
            <div className="shell">
              <div className="pulse-heading">
                <div>
                  <span className="pulse-eyebrow">
                    CITY PULSE
                  </span>

                  <h2>
                    See what's moving.
                  </h2>
                </div>

                <p>
                  A snapshot of the
                  events currently in
                  your results.
                </p>
              </div>

              <div className="pulse-overview">
                <strong>
                  {
                    filteredEvents.length
                  }
                </strong>

                <span>
                  events in your current
                  selection
                </span>
              </div>

              <div className="pulse-grid">
                <CityEventsChart
                  events={
                    filteredEvents
                  }
                />

                <WhenItsHappening
                  events={
                    filteredEvents
                  }
                />
              </div>
            </div>
          </section>
        ) : null}
      </main>


      {/* Simple Figma-style footer */}
      <footer className="site-footer">
        <div className="shell figma-footer">
          <div className="brand footer-brand">
            <span>m</span>
            meet
          </div>

          <p>
            Your next favorite memory
            is closer than you think.
          </p>

          <span className="footer-powered">
            Powered by Ticketmaster
            Discovery
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;