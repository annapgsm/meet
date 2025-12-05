import React, { useState } from "react";

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h2 className="event-summary">{event.summary}</h2>
      <p className="event-start-time">{event.created}</p>
      <p className="event-location">{event.location}</p>

      {showDetails && (
        <div className="details">
          <p className="description">{event.description}</p>
        </div>
      )}

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