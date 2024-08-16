document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const body = document.body;
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const dropdown = document.querySelector(".dropdown");
  const container = document.querySelector(".container");

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      darkModeToggle.textContent = "☀️";
      container.style.color = "rgba(0, 0, 0, 0.7)";
    } else {
      body.classList.remove("dark-mode");
      darkModeToggle.textContent = "🌙";
      container.style.color = "rgba(255, 255, 255, 0.7)";
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme("dark"); // Default to dark mode
  }

  darkModeToggle.addEventListener("click", () => {
    const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  hamburgerMenu.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  // Show loading text with adaptive color
  container.innerHTML = "<p>Loading hostels...</p>";

  fetch("../hostel_details.json")
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = ""; // Clear the loading message

      if (data.length === 0) {
        container.innerHTML = "<p>No hostels available</p>";
        return;
      }

      data.forEach((hostel) => {
        const hostelCard = `
            <div class="hostel_card" data-id="${hostel.id}">
              <div class="top" style="background-image: url('../Images/placeholder.png');">
                <div class="prize">₹${hostel.price} <span class="sub">/ month</span></div>
              </div>
              <div class="bottom">
                <div class="info">
                  <h2>${hostel.hostel_name}</h2>
                  <p class="sub">${hostel.distance} from College</p>
                </div>
                <div class="more_info">
                  <div class="gender">${hostel.gender}</div>
                  <a href="javascript:void(0);" class="more_details" data-id="${hostel.id}">
                    <p>See more details &rarr;</p>
                  </a>
                </div>
              </div>
            </div>`;
        container.innerHTML += hostelCard;
      });

      document.querySelectorAll(".hostel_card").forEach((card) => {
        card.addEventListener("click", function () {
          const hostelId = this.getAttribute("data-id");
          window.location.href = `../Details/details.html?id=${encodeURIComponent(hostelId)}`;
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching hostel data:", error);
      container.innerHTML = "<p>Failed to load hostels. Please try again later.</p>";
    });
});
