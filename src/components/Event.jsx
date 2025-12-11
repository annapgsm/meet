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

  return (
    <li className="event">
      <h2 className="event-summary">{event.summary}</h2>
      <p className="event-start-time">{formattedDate}</p>
      <p className="event-location">{event.location}</p>

      {/* Always render details, toggle class to show/hide visually */}
      <div className={`details ${showDetails ? 'open' : 'closed'}`}>
        <p className="description">{event.description}</p>
      </div>

      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "hide details" : "show details"}
      </button>
    </li>
  );
}

export default Event;