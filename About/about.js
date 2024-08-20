document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const body = document.body;
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const dropdown = document.querySelector(".dropdown");
  const container = document.querySelector(".container");
  const text = baffle(".name");
  text.set({
    characters: "░▒░ ░██░> ████▓ >█> ░/█>█ ██░░ █<▒ ▓██░ ░/░▒",
    speed: 180,
  });

  text.start();
  text.reveal(8000);

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      darkModeToggle.textContent = "☀️";
    } else {
      body.classList.remove("dark-mode");
      darkModeToggle.textContent = "🌙";
    }
  }

  document.querySelector(".brand").addEventListener("click", function () {
    window.location.href = `../Home/home.html`;
  });

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme("dark"); // Default to dark mode
  }

  darkModeToggle.addEventListener("click", () => {
    const currentTheme = body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  hamburgerMenu.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });
});
