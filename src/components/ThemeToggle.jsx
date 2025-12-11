import React from "react";

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div id="theme-toggle">
      <button
        onClick={toggleTheme}
        aria-label="toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}

export default ThemeToggle;
