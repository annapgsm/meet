import React, { useState } from "react";

function NumberOfEvents() {
  const [number, setNumber] = useState("32");

  return (
    <div id="number-of-events">
        <input
        type="number"
        aria-label="number of events" // optional but helpful
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        />
    </div>
  );
}

export default NumberOfEvents;
