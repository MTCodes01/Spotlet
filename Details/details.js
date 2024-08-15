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
    applyTheme("dark");
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

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const hostelId = getQueryParam("id");

  if (!hostelId) {
    window.location.href = "../Home/home.html";
    return;
  }

  fetch("../hostel_details.json")
    .then((response) => response.json())
    .then((data) => {
      const hostel = data.find((h) => h.id == hostelId);

      if (!hostel) {
        window.location.href = "../Home/index.html";
        return;
      }

      document.querySelector("#hostelName").textContent = hostel.hostel_name;
      document.querySelector(
        "#hostelPrice"
      ).textContent = `₹${hostel.price} / month`;
      document.querySelector("#hostelDistance").textContent = hostel.distance;
      document.querySelector("#hostelGender").textContent = hostel.gender;

      const amenities = [
        { id: "wifi", checkId: "wifiCheck" },
        { id: "washing_machines", checkId: "washingMachinesCheck" },
        { id: "filtered_water", checkId: "filteredWaterCheck" },
        { id: "hot_water", checkId: "hotWaterCheck" },
        { id: "parking", checkId: "parkingCheck" },
        { id: "security", checkId: "securityCheck" },
        { id: "cctv", checkId: "cctvCheck" },
        { id: "iron_box", checkId: "ironBoxCheck" },
        { id: "common_bathroom", checkId: "commonBathroomCheck" },
      ];

      const shouldStop = amenities.some((amenity) => {
        if (hostel.common_details["NOTA"] === "Yes") {
          return true;
        } else {
          const isAvailable = hostel.common_details[amenity.id] === "Yes";
          const checkElement = document.getElementById(amenity.checkId);
          checkElement.classList.add(
            isAvailable ? "success-checkmark" : "crosssign"
          );
          return false;
        }
      });

      if (shouldStop) {
        const commonGrid = document.querySelector(
          ".common_details .amenities-grid"
        );
        commonGrid.innerHTML = '<div class="not_available">Not available</div>';
        commonGrid.style.position = "relative";
      }

      // Single Room Details
      const singleRoomAmenities = [
        // { id: 'available', checkId: 'singleRoomAvailableCheck', value: hostel.single_room.available },
        {
          id: "bed_type.single.available",
          checkId: "singleBedSingleCheck",
          value: hostel.single_room.bed_type.single.available,
        },
        {
          id: "bed_type.double.available",
          checkId: "singleBedDoubleCheck",
          value: hostel.single_room.bed_type.double.available,
        },
        {
          id: "ac",
          checkId: "singleRoomACCheck",
          value: hostel.single_room.options_available.ac,
        },
        {
          id: "furniture",
          checkId: "singleRoomFurnitureCheck",
          value: hostel.single_room.options_available.furniture,
        },
        {
          id: "bathroom_facilities.private_bathroom",
          checkId: "singlePrivateBathroomCheck",
          value: hostel.single_room.options_available.private_bathroom,
        },
      ];

      const singleShouldStop = singleRoomAmenities.some((amenity) => {
        if (hostel.single_room["available"] === "No") {
          return true;
        } else {
          document.querySelector(
            "#singleRoomPrice"
          ).textContent = `₹${hostel.single_room["price"]} / month`;
          const checkElement = document.getElementById(amenity.checkId);
          const isAvailable = amenity.value === "Yes";
          checkElement.classList.add(
            isAvailable ? "success-checkmark" : "crosssign"
          );
          return false;
        }
      });

      if (singleShouldStop) {
        document.querySelector("#singleRoomPrice").textContent = "";
        document.querySelector(".single_top").style.textAlign = "center";
        const singleGrid = document.querySelector(
          ".single_room .amenities-grid"
        );
        const singleTop = document.querySelector(".single_top");
        singleGrid.innerHTML = '<div class="not_available">Not available</div>';
        singleGrid.style.position = "relative";
      }

      // Shared Room Details
      const sharedRoomAmenities = [
        // { id: 'available', checkId: 'sharedRoomAvailableCheck', value: hostel.shared_room.available },
        {
          id: "bed_type.single.available",
          checkId: "sharedBedSingleCheck",
          value: hostel.shared_room.bed_type.single.available,
        },
        {
          id: "bed_type.double.available",
          checkId: "sharedBedDoubleCheck",
          value: hostel.shared_room.bed_type.double.available,
        },
        {
          id: "ac",
          checkId: "sharedRoomACCheck",
          value: hostel.shared_room.options_available.ac,
        },
        {
          id: "furniture",
          checkId: "sharedRoomFurnitureCheck",
          value: hostel.shared_room.options_available.furniture,
        },
        {
          id: "bathroom_facilities.private_bathroom",
          checkId: "sharedPrivateBathroomCheck",
          value: hostel.shared_room.options_available.private_bathroom,
        },
      ];

      const sharedShouldStop = sharedRoomAmenities.some((amenity) => {
        if (hostel.shared_room["available"] === "No") {
          return true;
        } else {
          document.querySelector(
            "#sharedRoomPrice"
          ).textContent = `₹${hostel.shared_room["price"]} / month`;
          const checkElement = document.getElementById(amenity.checkId);
          const isAvailable = amenity.value === "Yes";
          checkElement.classList.add(
            isAvailable ? "success-checkmark" : "crosssign"
          );
          return false;
        }
      });

      if (sharedShouldStop) {
        document.querySelector("#sharedRoomPrice").textContent = "";
        document.querySelector(".shared_top").style.textAlign = "center";
        const singleGrid = document.querySelector(
          ".shared_room .amenities-grid"
        );
        singleGrid.innerHTML = '<div class="not_available">Not available</div>';
        singleGrid.style.position = "relative";
      }

      // Populate image gallery
      const imageGallery = document.querySelector(".image-gallery");
      hostel.images.forEach((imageSrc) => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = hostel.hostel_name;
        imageGallery.appendChild(img);
      });
    })
    .catch((error) => console.error("Error fetching hostel details:", error));
});
