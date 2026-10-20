import React, { useState } from "react";
import Icon from "./Icon";

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  const start = new Date(event.created);
  const hasValidDate = !Number.isNaN(start.getTime());

  const day = hasValidDate
    ? start.toLocaleDateString("en-GB", {
        day: "2-digit",
      })
    : "-";

  const month = hasValidDate
    ? start.toLocaleDateString("en-GB", {
        month: "short",
      })
    : "";

  const formattedDate = hasValidDate
    ? start.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date to be announced";

  const createGoogleCalendarLink = () => {
    const end = new Date(
      start.getTime() + 60 * 60 * 1000
    );

    const formatDate = (date) =>
      date
        .toISOString()
        .replace(/-|:|\.\d+/g, "");

    const url = new URL(
      "https://www.google.com/calendar/render"
    );

    url.searchParams.append(
      "action",
      "TEMPLATE"
    );

    url.searchParams.append(
      "text",
      event.summary
    );

    url.searchParams.append(
      "dates",
      `${formatDate(start)}/${formatDate(end)}`
    );

    url.searchParams.append(
      "details",
      event.description || ""
    );

    url.searchParams.append(
      "location",
      event.location || ""
    );

    return url.toString();
  };

  return (
    <li
      className={`event event-card ${
        showDetails ? "details-open" : ""
      }`}
    >
      <div className="event-image-wrap">
        {event.image ? (
          <img
            className="event-image"
            src={event.image}
            alt=""
            loading="lazy"
          />
        ) : (
          <div className="event-image-fallback">
            <Icon
              name="spark"
              size={34}
            />
          </div>
        )}

        <span className="date-tile">
          <strong>{day}</strong>
          <span>{month}</span>
        </span>
      </div>

      <div className="event-copy">
        <div className="event-meta">
          <span>
            {event.category ||
              event.city ||
              "Germany"}
          </span>

          <span className="event-start-time">
            {formattedDate}
          </span>
        </div>

        <h3 className="event-summary">
          {event.summary}
        </h3>

        <p className="event-location">
          <Icon
            name="pin"
            size={15}
          />

          {event.location}
        </p>

        <button
          className="event-btn detail-btn text-link"
          onClick={() =>
            setShowDetails(
              (current) => !current
            )
          }
          aria-expanded={showDetails}
        >
          {showDetails
            ? "hide details"
            : "show details"}

          <Icon
            name="arrow"
            size={16}
          />
        </button>

        <div
          className={`details event-details ${
            showDetails
              ? "open"
              : "closed"
          }`}
          aria-hidden={!showDetails}
        >
          <p className="description">
            {event.description ||
              "Additional event details are available from the organizer."}
          </p>

          <div className="event-actions">
            {event.url ? (
              <a
                className="primary-action"
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View event

                <Icon
                  name="arrow"
                  size={16}
                />
              </a>
            ) : null}

            {hasValidDate ? (
              <a
                href={createGoogleCalendarLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  name="calendar"
                  size={15}
                />
                Add to calendar
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Event;