import React from "react";
import Icon from "./Icon";

function ThemeToggle({ theme, toggleTheme }) {
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <Icon name={theme === "light" ? "moon" : "sun"} />
    </button>
  );
}

export default ThemeToggle;