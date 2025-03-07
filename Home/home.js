document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const body = document.body;
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const dropdown = document.querySelector(".dropdown");
  const container = document.querySelector(".container");

  function applyTheme(theme) {
    if (theme === "light") {
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
    applyTheme("light");
  }

  darkModeToggle.addEventListener("click", () => {
    const currentTheme = body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    // console.log(newTheme)

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
              <div class="top" style="background-image: url('../Images/${hostel["images"][0]}');">
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
          window.location.href = `../Details/details.html?id=${encodeURIComponent(
            hostelId
          )}`;
        });
      });

      document.querySelector(".brand").addEventListener("click", function () {
        window.location.href = `../Home/home.html`;
      });
    })
    .catch((error) => {
      console.error("Error fetching hostel data:", error);
      container.innerHTML =
        "<p>Failed to load hostels. Please try again later.</p>";
    });
});
