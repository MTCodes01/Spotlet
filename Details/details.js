document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const body = document.body;
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const dropdown = document.querySelector(".dropdown");

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
      document.querySelector("#hostelPrice").textContent = `₹${hostel.price}`;

      feeAdminDeposit = document.querySelector("#hostelDeposit");
      textFeeExtra = document.querySelector("#feeExtraText");
      extraFee = hostel.deposit;
      feeFood = hostel.food;

      if (feeFood) {
        document.querySelector(".food").style.display = "inline";
        foodFee = document.querySelector("#Food");
        foodFee.textContent = `₹${feeFood}`;
      }

      if (extraFee) {
        if (extraFee[0] == "A") {
          feeAdminDeposit.textContent = `₹${hostel.deposit.slice(1)}`;
          textFeeExtra.textContent = `Admission Fee`;
        } else {
          feeAdminDeposit.textContent = `₹${hostel.deposit}`;
          textFeeExtra.textContent = `Caution Deposit`;
        }
      } else {
        feeAdminDeposit.textContent = ``;
        textFeeExtra.textContent = `No extra Fee`;
      }

      document.querySelector("#hostelDistance").textContent = hostel.distance;
      document.querySelector("#hostelGender").textContent = hostel.gender;
      const contact = document.querySelector("#hostelContact .contact_no");
      contact.setAttribute("href", `tel:"+91 ${hostel.contact_no}"`);
      contact.textContent = `+91 ${hostel.contact_no}`;
      // document.querySelector("#hostelContact .whatsapp_no").textContent = hostel.whatsapp_no;
      
      document.querySelector("#maleCount").textContent = hostel.seats.boys;
      document.querySelector("#femaleCount").textContent = hostel.seats.girls;

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
        document.querySelector(".common_details").classList.add("NA");
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
        document.querySelector("#singleRoomPrice").style.display = "none";
        document.querySelector(".single_top").style.textAlign = "center";
        const singleGrid = document.querySelector(
          ".single_room .amenities-grid"
        );
        document.querySelector(".single_room").classList.add("NA");
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
        document.querySelector(".shared_room").classList.add("NA");
        singleGrid.innerHTML = '<div class="not_available">Not available</div>';
        singleGrid.style.position = "relative";
      }

      // Image gallery
      const imageGallery = document.querySelector(".image-gallery");
      const dotGallery = document.querySelector(".dots");
      const leftBtn = document.querySelector(".scroll-btn.left");
      const rightBtn = document.querySelector(".scroll-btn.right");

      leftBtn.addEventListener("click", () => {
        imageGallery.scrollBy({ left: -300, behavior: "smooth" });
      });

      rightBtn.addEventListener("click", () => {
        imageGallery.scrollBy({ left: 300, behavior: "smooth" });
      });

      imageGallery.textContent = "";
      hostel.images.forEach((imageSrc) => {
        if (imageSrc[0] != "V") {
          const img = document.createElement("img");
          const dot = document.createElement("div");
          dot.className = `dot`;
          img.src = `../Images/` + imageSrc;
          img.alt = `placeholder.png`;
          imageGallery.appendChild(img);
          dotGallery.appendChild(dot);
        } else {
          const vid = document.createElement("video");
          vid.controls = true
          vid.muted = true
          const dot = document.createElement("div");
          dot.className = `dot`;
          vid.src = `../Images/` + imageSrc.slice(1);
          vid.alt = `placeholder.png`;
          imageGallery.appendChild(vid);
          dotGallery.appendChild(dot);
        }
      });

      document
        .querySelector(".location")
        .addEventListener("click", function () {
          window.location.href = `${hostel["links"][0]}`;
        });

      document.querySelector(".brand").addEventListener("click", function () {
        window.location.href = `../Home/home.html`;
      });
    })
    .catch((error) => console.error("Error fetching hostel details:", error));
});

