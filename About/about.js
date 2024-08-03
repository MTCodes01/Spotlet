const darkModeToggle = document.querySelector(".dark-mode-toggle");
const body = document.body;
const hamburgerMenu = document.querySelector(".hamburger-menu");
const dropdown = document.querySelector(".dropdown");

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️";
  } else {
    darkModeToggle.textContent = "🌙";
  }
});

hamburgerMenu.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});
