import React from "react";

const options = [16, 32, 64];

function NumberOfEvents({
  currentNOE,
  setCurrentNOE,
  totalEvents,
}) {
  return (
    <div
      id="number-of-events"
      className="result-limit"
      aria-label="Number of events shown"
    >
      <span>Show</span>

      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={
            currentNOE === option
              ? "active"
              : ""
          }
          aria-pressed={
            currentNOE === option
          }
          onClick={() =>
            setCurrentNOE(option)
          }
        >
          {option}
        </button>
      ))}

      <button
        type="button"
        className={
          currentNOE >= totalEvents &&
          totalEvents > 64
            ? "active"
            : ""
        }
        aria-pressed={
          currentNOE >= totalEvents &&
          totalEvents > 64
        }
        disabled={totalEvents <= 64}
        onClick={() =>
          setCurrentNOE(totalEvents)
        }
      >
        All
      </button>
    </div>
  );
}

export default NumberOfEvents;