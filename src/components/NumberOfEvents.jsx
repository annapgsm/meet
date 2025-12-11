import React from "react";

function NumberOfEvents({ currentNOE, setCurrentNOE }) {
  const handleInputChanged = (e) => {
    const value = Number(e.target.value);
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <input
        type="number"
        aria-label="number of events"
        value={currentNOE}
        onChange={handleInputChanged}
        min={1}
        max={32}
      />
    </div>
  );
}

export default NumberOfEvents;
