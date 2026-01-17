import React, { useState } from "react";

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  const formattedDate = new Date(event.created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const openCalendarAtEventTime = () => {
    const start = new Date(event.created);
    const date = start.toISOString().split("T")[0];

    return `https://calendar.google.com/calendar/u/0/r/day/${date}`;
  };


  const createGoogleCalendarLink = () => {
    const start = new Date(event.created);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hour

    const formatDate = (date) =>
      date.toISOString().replace(/-|:|\.\d+/g, "");

    const url = new URL("https://www.google.com/calendar/render");

    url.searchParams.append("action", "TEMPLATE");
    url.searchParams.append("text", event.summary);
    url.searchParams.append("dates", `${formatDate(start)}/${formatDate(end)}`);
    url.searchParams.append("details", event.description || "");
    url.searchParams.append("location", event.location || "");

    return url.toString();
  };


  return (
    <li className="event">
      <h2 className="event-summary">{event.summary}</h2>
      <p className="event-start-time">{formattedDate}</p>
      <p className="event-location">{event.location}</p>

      {/* Always render details, toggle class to show/hide visually */}
      <div className={`details ${showDetails ? 'open' : 'closed'}`}>
        <p className="description">{event.description}</p>
      </div>
      <div className="event-actions">
        <button
          className="event-btn detail-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "hide details" : "show details"}
        </button>
        <div className="calendar-actions"> 
          <a
            href={openCalendarAtEventTime()}
            target="_blank"
            rel="noopener noreferrer"
            className="event-btn calendar-btn"
          >
            Open in Google Calendar
          </a>
          <a
            href={createGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="event-btn calendar-btn"
          >
            Add to Google Calendar
          </a>
        </div>
      </div>
    </li>
  );
}

export default Event;