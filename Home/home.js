document.addEventListener("DOMContentLoaded", function() {
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
        const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        // Apply the new theme and save it to localStorage
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });

    hamburgerMenu.addEventListener("click", () => {
        dropdown.classList.toggle("show");
    });

    fetch("../hostels.json")
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.container');
            container.innerHTML = ''; // Clear the container

            data.forEach(hostel => {
                const hostelCard = `
                <div class="hostel_card" data-id="${hostel.id}">
                    <div class="top">
                        <div class="prize">₹${hostel.price} <span class="sub">/ month</span></div>
                    </div>
                    <div class="bottom">
                        <div class="info">
                            <h2>${hostel.name}</h2>
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

            // Add event listeners to each card for redirection
            document.querySelectorAll('.more_details').forEach(card => {
                card.addEventListener('click', function() {
                    const hostelId = this.getAttribute('data-id');
                    window.location.href = `../Details/details.html?id=${encodeURIComponent(hostelId)}`;
                });
            });
        })
        .catch(error => console.error('Error fetching hostel data:', error));
});