import React from "react";

function NumberOfEvents({ currentNOE, setCurrentNOE, setErrorAlert }) {

  const handleInputChanged = (e) => {
    const value = parseInt(e.target.value,10);

    if (isNaN(value)) {
      setErrorAlert("Please enter a valid number");
    } if (value < 1 || value > 32){
      setErrorAlert("Number must be between 1 and 32");
      return;
    } else {
      setErrorAlert("");
      setCurrentNOE(value);
    }
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
