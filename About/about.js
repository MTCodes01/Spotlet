document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const body = document.body;
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const dropdown = document.querySelector(".dropdown");

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      darkModeToggle.textContent = "☀️";
    } else {
      body.classList.remove("dark-mode");
      darkModeToggle.textContent = "🌙";
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Default theme if not set
    applyTheme("dark");
  }

  darkModeToggle.addEventListener("click", () => {
    const currentTheme = body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Apply the new theme and save it to localStorage
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  hamburgerMenu.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });
});
