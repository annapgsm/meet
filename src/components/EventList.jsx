import React from "react";
import Event from "./Event";

const EventList = ({
  events,
  savedEventIds = [],
  onToggleSave = () => {},
}) => {
  return (
    <ul
      id="event-list"
      className="event-grid"
    >
      {events
        ? events.map((event) => (
            <Event
              key={event.id}
              event={event}
              isSaved={savedEventIds.includes(
                event.id
              )}
              onToggleSave={
                onToggleSave
              }
            />
          ))
        : null}
    </ul>
  );
};

export default EventList;