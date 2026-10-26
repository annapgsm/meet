import React, { useState } from "react";
import Icon from "./Icon";

const options = [
  { value: "any", label: "Any date" },
  { value: "tonight", label: "Tonight" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "weekend", label: "This weekend" },
  { value: "next7", label: "Next 7 days" },
  { value: "custom", label: "Pick a date…" },
];

function TimeFilter({
  value,
  customDate,
  onChange,
  onCustomDateChange,
}) {
  const [showOptions, setShowOptions] = useState(false);

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const selectedOption =
    options.find((option) => option.value === value) ||
    options[0];

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setShowOptions(false);
  };

  return (
    <div className="hero-search-field when-field">
      <Icon name="calendar" />

      <div className="hero-search-control">
        <label>When</label>

        <div className="when-dropdown">
          <button
            type="button"
            className="when-trigger"
            aria-haspopup="listbox"
            aria-expanded={showOptions}
            onClick={() =>
              setShowOptions((current) => !current)
            }
          >
            <span>{selectedOption.label}</span>
            <Icon name="chevron" size={15} />
          </button>

          {showOptions ? (
            <ul
              className="when-options"
              role="listbox"
              aria-label="When"
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={value === option.value}
                  onClick={() =>
                    handleOptionClick(option.value)
                  }
                >
                  {option.label}
                </li>
              ))}
            </ul>
          ) : null}

          {value === "custom" ? (
            <input
              className="custom-date-input"
              type="date"
              aria-label="Pick a date"
              min={minDate}
              value={customDate}
              onChange={(event) =>
                onCustomDateChange(event.target.value)
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TimeFilter;