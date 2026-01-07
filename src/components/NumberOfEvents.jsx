import React from "react";

function NumberOfEvents({ currentNOE, setCurrentNOE, setErrorAlert }) {

  const handleInputChanged = (e) => {
    const inputValue = e.target.value;

    // Allow empty string input — clear state and error
    if (inputValue === "") {
      setCurrentNOE("");
      setErrorAlert("");
      return;
    }

    const value = parseInt(inputValue, 10);

    if (isNaN(value)) {
      setErrorAlert("Please enter a valid number");
      return;
    }

    if (value < 1 || value > 32) {
      setErrorAlert("Number must be between 1 and 32");
      return;
    }

    setErrorAlert("");
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <input
        type="number"
        aria-label="number of events"
        value={currentNOE === "" ? "" : currentNOE}
        onChange={handleInputChanged}
        min={1}
        max={32}
      />
    </div>
  );
}

export default NumberOfEvents;
